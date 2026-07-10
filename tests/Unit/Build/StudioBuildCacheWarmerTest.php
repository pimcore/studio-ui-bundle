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

namespace Pimcore\Bundle\StudioUiBundle\Tests\Unit\Build;

use Codeception\Test\Unit;
use Pimcore\Bundle\StudioUiBundle\Build\BuildArchive;
use Pimcore\Bundle\StudioUiBundle\Build\BuildArchiveExtractor;
use Pimcore\Bundle\StudioUiBundle\Build\BuildArchiveProviderInterface;
use Pimcore\Bundle\StudioUiBundle\Build\StudioBuildCacheWarmer;
use ZipArchive;

class StudioBuildCacheWarmerTest extends Unit
{
    private string $workDir;

    private string $archiveDir;

    private string $targetDir;

    public function _before(): void
    {
        $this->workDir = sys_get_temp_dir() . '/studio-warmer-test-' . uniqid('', true);
        $this->archiveDir = $this->workDir . '/archives';
        $this->targetDir = $this->workDir . '/public/build';

        mkdir($this->archiveDir, 0775, true);
        mkdir($this->workDir . '/public', 0775, true);
    }

    public function _after(): void
    {
        $this->removeDirectory($this->workDir);
    }

    public function testIsNotOptional(): void
    {
        // Extraction must run during warmup (writable deploy phase), not be deferred.
        $this->assertFalse($this->warmer([])->isOptional());
    }

    public function testExtractsArchiveProvidersDuringWarmup(): void
    {
        $this->createArchive('aaaa1111');

        $this->warmer([$this->archiveProvider()])->warmUp($this->workDir);

        $this->assertFileExists($this->targetDir . '/aaaa1111-app/entrypoints.json');
    }

    public function testSkipsNonArchiveAndNullProvidersWithoutError(): void
    {
        $this->createArchive('aaaa1111');

        $providers = [
            new \stdClass(),            // not a BuildArchiveProviderInterface
            $this->archiveProvider(null), // archive provider that declares no archive
            $this->archiveProvider(),     // the only one that should extract
        ];

        $result = $this->warmer($providers)->warmUp($this->workDir);

        $this->assertSame([], $result);
        $this->assertFileExists($this->targetDir . '/aaaa1111-app/entrypoints.json');
    }

    public function testSwallowsExtractionErrors(): void
    {
        $this->createArchive('aaaa1111');
        // Target parent does not exist -> the extractor throws; warmUp must not propagate it.
        $brokenTarget = $this->workDir . '/missing/public/build';

        $result = $this->warmer([$this->archiveProvider(new BuildArchive($this->glob(), $brokenTarget))])
            ->warmUp($this->workDir);

        $this->assertSame([], $result);
        $this->assertDirectoryDoesNotExist($brokenTarget);
    }

    private function warmer(array $providers): StudioBuildCacheWarmer
    {
        return new StudioBuildCacheWarmer($providers, new BuildArchiveExtractor());
    }

    /**
     * A minimal provider whose only relevant behaviour is the archive it declares. Pass an
     * explicit BuildArchive, null (declares none), or omit for the default temp-dir archive.
     */
    private function archiveProvider(BuildArchive|null|false $archive = false): BuildArchiveProviderInterface
    {
        $resolved = $archive === false ? new BuildArchive($this->glob(), $this->targetDir) : $archive;

        return new class($resolved) implements BuildArchiveProviderInterface {
            public function __construct(private readonly ?BuildArchive $archive)
            {
            }

            public function getBuildArchive(): ?BuildArchive
            {
                return $this->archive;
            }

            public function getEntryPointsJsonLocations(): array
            {
                return [];
            }

            public function getEntryPoints(): array
            {
                return [];
            }

            public function getOptionalEntryPoints(): array
            {
                return [];
            }
        };
    }

    private function glob(): string
    {
        return $this->archiveDir . '/build*.zip';
    }

    private function createArchive(string $id): void
    {
        $zip = new ZipArchive();
        $zip->open($this->archiveDir . "/build-$id.zip", ZipArchive::CREATE | ZipArchive::OVERWRITE);
        foreach (['app', 'sdk'] as $kind) {
            $zip->addFromString("$id-$kind/entrypoints.json", '{"entrypoints":{}}');
            $zip->addFromString("$id-$kind/.build-id", $id);
        }
        $zip->close();
    }

    private function removeDirectory(string $dir): void
    {
        if (!is_dir($dir)) {
            return;
        }

        foreach (scandir($dir) ?: [] as $item) {
            if ($item === '.' || $item === '..') {
                continue;
            }
            $path = $dir . '/' . $item;
            is_dir($path) && !is_link($path) ? $this->removeDirectory($path) : @unlink($path);
        }

        @rmdir($dir);
    }
}
