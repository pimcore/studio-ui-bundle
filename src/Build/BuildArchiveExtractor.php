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

use Pimcore\Bundle\StudioUiBundle\Exception\BuildArchiveNotWritableException;
use Psr\Log\LoggerInterface;
use ZipArchive;

/**
 * Reconstructs a committed frontend build archive (build-dist/build-<id>.zip) into its
 * expanded build directory (public/build) on demand.
 *
 * Single source of truth for the extraction decision: both the cache warmer (deploy time,
 * while vendor is writable) and the entry point provider fallback (local dev / git pull)
 * call {@see ensureExtracted()}. It is idempotent and never overwrites a manual
 * `npm run dev-app` build. On a read-only filesystem it keeps serving an already-present
 * build, or throws {@see BuildArchiveNotWritableException} when there is none to serve.
 *
 * The freshness decision is based on whether the expanded build is actually present and on
 * the archive filename (the id is a content hash, so name match == content match) — never
 * on file mtimes, which are not stable across checkouts/deploys.
 *
 * @internal
 */
final readonly class BuildArchiveExtractor
{
    /**
     * State file recording which archive the expanded build was extracted from. Written by
     * — and only by — this extractor, so its absence next to an existing build identifies a
     * manual (`npm run dev-app`) build. It lives inside the build dir and is replaced
     * atomically with the build, so it cannot become orphaned by a normal rebuild.
     */
    private const MARKER = 'extracted-archive.json';

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
        $archivePath = $this->selectArchive($archiveGlob);
        if ($archivePath === null) {
            return;
        }

        $archiveName = basename($archivePath);

        if ($this->hasExpandedBuild($targetDir)) {
            $marker = $this->readMarker($targetDir);
            if ($marker === null) {
                return; // a manually built frontend (no marker) -> never clobber it
            }
            if ($marker === $archiveName) {
                return;
            }
            // marker names a different archive: stale extracted build, fall through to refresh
        }

        // No build present (fresh, or only a leftover marker), or a stale one -> (re)extract.
        $this->extract($archivePath, $targetDir, $archiveName);
    }

    /**
     * Entry point JSON locations of the build currently active in $targetDir.
     *
     * A build emits multiple dirs (SDK + app) sharing one `.build-id`; normally exactly one
     * build is present. If several are (a dev anomaly), the build the extractor recorded as
     * installed (extracted-archive.json) wins, otherwise a deterministic choice — never file
     * mtimes, which are not stable across checkouts/deploys.
     *
     * Exactly one build's locations are ever returned. Serving two builds at once would load
     * two copies of the app and register every DI service twice ("Ambiguous match found for
     * serviceIdentifier"), so builds are always grouped and one is chosen — even when the
     * `.build-id` marker files are missing, in which case the "<id>-app" / "<id>-sdk"
     * directory name is used so an app and its sdk still pair up and two builds stay apart.
     *
     * @return string[]
     */
    public function entryPointLocations(string $targetDir): array
    {
        $locations = glob($targetDir . '/*/entrypoints.json') ?: [];
        if ($locations === []) {
            return [];
        }

        $byBuildId = [];
        foreach ($locations as $location) {
            $idFile = dirname($location) . '/.build-id';
            $buildId = is_file($idFile) ? trim((string) @file_get_contents($idFile)) : '';
            if ($buildId !== '') {
                $byBuildId[$buildId][] = $location;
            }
        }

        if ($byBuildId === []) {
            foreach ($locations as $location) {
                $byBuildId[$this->buildIdFromDirName($location)][] = $location;
            }
        }

        if (count($byBuildId) === 1) {
            return reset($byBuildId);
        }

        $activeBuildId = $this->markerBuildId($targetDir);
        if ($activeBuildId !== null && isset($byBuildId[$activeBuildId])) {
            return $byBuildId[$activeBuildId];
        }

        ksort($byBuildId);

        return $byBuildId[array_key_last($byBuildId)];
    }

    /**
     * The build a directory belongs to, derived from its "<id>-app" / "<id>-sdk" name by
     * stripping the suffix. Keeps an app and its sdk together — and two different builds apart —
     * when no `.build-id` marker file is available. Legacy single-dir builds using neither
     * suffix keep their full name as the key.
     */
    private function buildIdFromDirName(string $location): string
    {
        return (string) preg_replace('/-(?:app|sdk)$/', '', basename(dirname($location)));
    }

    /**
     * The committed archive should be unique. If several match (a packaging or merge
     * problem), pick deterministically by name and warn — content-hash names carry no
     * chronology, so there is no reliable "newest" to choose anyway.
     */
    private function selectArchive(string $archiveGlob): ?string
    {
        $candidates = array_values(array_filter(glob($archiveGlob) ?: [], 'is_file'));
        if ($candidates === []) {
            return null;
        }
        if (count($candidates) === 1) {
            return $candidates[0];
        }

        sort($candidates);
        $chosen = $candidates[count($candidates) - 1];
        $this->logger?->warning(
            'Multiple Studio frontend build archives match "{glob}" ({count}); using "{chosen}". '
            . 'Exactly one should be committed — check for a packaging or merge problem.',
            ['glob' => $archiveGlob, 'count' => count($candidates), 'chosen' => basename($chosen)]
        );

        return $chosen;
    }

    private function hasExpandedBuild(string $targetDir): bool
    {
        return $targetDir !== '' && glob($targetDir . '/*/entrypoints.json') !== [];
    }

    private function readMarker(string $targetDir): ?string
    {
        $markerFile = $targetDir . '/' . self::MARKER;
        if (!is_file($markerFile)) {
            return null;
        }

        $data = json_decode((string) @file_get_contents($markerFile), true);

        return is_array($data) && isset($data['archive']) && is_string($data['archive'])
            ? $data['archive']
            : null;
    }

    private function markerBuildId(string $targetDir): ?string
    {
        $archive = $this->readMarker($targetDir);

        return $archive !== null && preg_match('/^build-(.+)\.zip$/', $archive, $matches) === 1
            ? $matches[1]
            : null;
    }

    private function extract(string $archivePath, string $targetDir, string $archiveName): void
    {
        $parent = dirname($targetDir);

        // Extraction is needed but the target is read-only (e.g. a deploy that went read-only
        // before warming the cache). If a build is already present we keep serving it; if not,
        // there is nothing to serve, so make the cause explicit instead of a vague error later.
        if (!is_dir($parent) || !is_writable($parent) || (is_dir($targetDir) && !is_writable($targetDir))) {
            if (!$this->hasExpandedBuild($targetDir)) {
                throw new BuildArchiveNotWritableException(sprintf(
                    'Cannot extract the Studio frontend build archive "%s": "%s" is not writable and no build is '
                    . 'present. Run "bin/console cache:warmup" while the filesystem is writable (e.g. during deploy).',
                    $archiveName,
                    $targetDir
                ));
            }

            $this->logger?->warning(
                'Studio frontend build archive "{archive}" needs refreshing but "{target}" is not writable; '
                . 'serving the build already present.',
                ['archive' => $archiveName, 'target' => $targetDir]
            );

            return;
        }

        $lock = $this->acquireLock($targetDir);
        if ($lock === null) {
            return;
        }

        try {
            // Another process may have extracted while we waited for the lock.
            if ($this->hasExpandedBuild($targetDir) && $this->readMarker($targetDir) === $archiveName) {
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
                        ['archive' => $archiveName]
                    );

                    return;
                }

                file_put_contents(
                    $tmpDir . '/' . self::MARKER,
                    json_encode(['archive' => $archiveName], JSON_THROW_ON_ERROR)
                );

                if ($this->swapIntoPlace($tmpDir, $targetDir, $parent)) {
                    $this->logger?->info(
                        'Extracted Studio frontend build archive "{archive}" into "{target}".',
                        ['archive' => $archiveName, 'target' => $targetDir]
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
    private function swapIntoPlace(string $tmpDir, string $targetDir, string $parent): bool
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

            return false;
        }

        if ($backup !== null) {
            $this->removeDirectory($backup);
        }

        return true;
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
