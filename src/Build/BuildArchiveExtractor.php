<?php
declare(strict_types=1);

/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

namespace Pimcore\Bundle\StudioUiBundle\Build;

use Psr\Log\LoggerInterface;
use ZipArchive;

/**
 * Reconstructs a committed frontend build archive (build-dist/build-<id>.zip) into its
 * expanded build directory (public/build) on demand.
 *
 * Single source of truth for the extraction decision: both the cache warmer (deploy time,
 * while vendor is writable) and the entry point provider fallback (local dev / git pull)
 * call {@see ensureExtracted()}. It is idempotent, cheap on the hot path (a single stat()),
 * read-only-filesystem safe, and never overwrites a manual `npm run dev-app` build.
 *
 * @internal
 */
final class BuildArchiveExtractor
{
    /**
     * Marker written by — and only by — this extractor into the target directory. A manual
     * `npm run dev-app` wipes the build directory and never recreates it, so its absence
     * (next to an existing build) is what identifies a developer's manual build.
     */
    private const MARKER = '.extracted.json';

    /**
     * The logger is optional so the trait's dev/`git pull` fallback can instantiate the
     * extractor directly (`new BuildArchiveExtractor()`); the cache warmer receives the
     * autowired service with a logger injected.
     */
    public function __construct(private readonly ?LoggerInterface $logger = null)
    {
    }

    public function ensureExtracted(string $archiveGlob, string $targetDir): void
    {
        // 1. No archive shipped -> rely on whatever build is present.
        $archivePath = $this->latestArchive($archiveGlob);
        if ($archivePath === null) {
            return;
        }

        $signature = $this->archiveSignature($archivePath);
        if ($signature === null) {
            return;
        }

        // 2. Already extracted from this exact archive -> nothing to do (hot path).
        if ($this->markerMatches($targetDir, $signature)) {
            return;
        }

        // 3. A build exists but was not produced by us (manual dev-app build) -> never clobber.
        if (!is_file($targetDir . '/' . self::MARKER) && $this->hasExpandedBuild($targetDir)) {
            return;
        }

        // 4. Empty, or extracted from a previous archive (new bundle state / composer update).
        $this->extract($archivePath, $targetDir, $signature);
    }

    /**
     * Resolve the newest archive matching the glob (so a leftover older archive never wins).
     */
    private function latestArchive(string $archiveGlob): ?string
    {
        $candidates = array_filter(glob($archiveGlob) ?: [], 'is_file');
        if ($candidates === []) {
            return null;
        }

        usort($candidates, static function (string $a, string $b): int {
            // newest mtime first; tie-break on name for stability
            return (filemtime($b) <=> filemtime($a)) ?: strcmp($b, $a);
        });

        return $candidates[0];
    }

    /**
     * @return array{mtime: int, size: int, name: string}|null
     */
    private function archiveSignature(string $archivePath): ?array
    {
        $stat = @stat($archivePath);
        if ($stat === false) {
            return null;
        }

        return ['mtime' => $stat['mtime'], 'size' => $stat['size'], 'name' => basename($archivePath)];
    }

    /**
     * @param array{mtime: int, size: int, name: string} $signature
     */
    private function markerMatches(string $targetDir, array $signature): bool
    {
        $markerFile = $targetDir . '/' . self::MARKER;
        if (!is_file($markerFile)) {
            return false;
        }

        $marker = json_decode((string) @file_get_contents($markerFile), true);

        return is_array($marker)
            && ($marker['mtime'] ?? null) === $signature['mtime']
            && ($marker['size'] ?? null) === $signature['size']
            && ($marker['name'] ?? null) === $signature['name'];
    }

    private function hasExpandedBuild(string $targetDir): bool
    {
        return $targetDir !== '' && glob($targetDir . '/*/entrypoints.json') !== [];
    }

    /**
     * @param array{mtime: int, size: int, name: string} $signature
     */
    private function extract(string $archivePath, string $targetDir, array $signature): void
    {
        $parent = dirname($targetDir);

        // Read-only filesystem (e.g. production runtime): the build was already provisioned
        // at deploy. We need the parent writable to create the temp dir and rename it in.
        // Reaching here means extraction is actually needed (the marker did not match), so an
        // unwritable target is worth surfacing — it can mean assets end up missing or stale.
        if (!is_dir($parent) || !is_writable($parent) || (is_dir($targetDir) && !is_writable($targetDir))) {
            $this->logger?->warning(
                'Studio frontend build archive "{archive}" needs extraction but "{target}" is not writable; '
                . 'serving the build already present, if any.',
                ['archive' => basename($archivePath), 'target' => $targetDir]
            );

            return;
        }

        $lock = $this->acquireLock($targetDir);
        if ($lock === null) {
            return;
        }

        try {
            // Another process may have extracted while we waited for the lock.
            if ($this->markerMatches($targetDir, $signature)) {
                return;
            }

            $tmpDir = $parent . '/.' . basename($targetDir) . '.tmp-' . getmypid() . '-' . uniqid();
            $this->removeDirectory($tmpDir);
            if (!@mkdir($tmpDir, 0775, true) && !is_dir($tmpDir)) {
                $this->logger?->warning(
                    'Could not create a temporary directory to extract the Studio frontend build into "{target}".',
                    ['target' => $targetDir]
                );

                return;
            }

            try {
                if (!$this->unzip($archivePath, $tmpDir)) {
                    $this->logger?->error(
                        'Failed to unpack Studio frontend build archive "{archive}".',
                        ['archive' => basename($archivePath)]
                    );

                    return;
                }

                file_put_contents(
                    $tmpDir . '/' . self::MARKER,
                    json_encode($signature, JSON_THROW_ON_ERROR)
                );

                if ($this->swapIntoPlace($tmpDir, $targetDir, $parent)) {
                    $this->logger?->info(
                        'Extracted Studio frontend build archive "{archive}" into "{target}".',
                        ['archive' => basename($archivePath), 'target' => $targetDir]
                    );
                } else {
                    $this->logger?->warning(
                        'Failed to move the extracted Studio frontend build into "{target}".',
                        ['target' => $targetDir]
                    );
                }
            } finally {
                $this->removeDirectory($tmpDir);
            }
        } finally {
            flock($lock, LOCK_UN);
            fclose($lock);
        }
    }

    private function unzip(string $archivePath, string $tmpDir): bool
    {
        $zip = new ZipArchive();
        if ($zip->open($archivePath) !== true) {
            return false;
        }

        try {
            return $zip->extractTo($tmpDir);
        } finally {
            $zip->close();
        }
    }

    /**
     * Replace $targetDir with the freshly extracted $tmpDir in one rename, so the new tree
     * and its marker appear together and any stale build dirs are gone in a single step.
     */
    private function swapIntoPlace(string $tmpDir, string $targetDir, string $parent): void
    {
        $backup = null;
        if (is_dir($targetDir)) {
            $backup = $parent . '/.' . basename($targetDir) . '.old-' . getmypid() . '-' . uniqid();
            if (!@rename($targetDir, $backup)) {
                $this->removeDirectory($targetDir);
                $backup = null;
            }
        }

        if (!@rename($tmpDir, $targetDir)) {
            // Restore the previous build if the swap failed.
            if ($backup !== null && !is_dir($targetDir)) {
                @rename($backup, $targetDir);
            }

            return;
        }

        if ($backup !== null) {
            $this->removeDirectory($backup);
        }
    }

    /**
     * @return resource|null
     */
    private function acquireLock(string $targetDir)
    {
        $lockFile = dirname($targetDir) . '/.studio-build-extract.lock';
        $handle = @fopen($lockFile, 'c');
        if ($handle === false) {
            return null;
        }

        if (!flock($handle, LOCK_EX)) {
            fclose($handle);

            return null;
        }

        return $handle;
    }

    private function removeDirectory(string $dir): void
    {
        if (!is_dir($dir)) {
            return;
        }

        $items = scandir($dir);
        if ($items === false) {
            return;
        }

        foreach ($items as $item) {
            if ($item === '.' || $item === '..') {
                continue;
            }

            $path = $dir . '/' . $item;
            if (is_dir($path) && !is_link($path)) {
                $this->removeDirectory($path);
            } else {
                @unlink($path);
            }
        }

        @rmdir($dir);
    }
}
