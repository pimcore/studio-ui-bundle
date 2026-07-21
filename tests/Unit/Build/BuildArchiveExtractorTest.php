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
use Pimcore\Bundle\StudioUiBundle\Build\BuildArchiveExtractor;
use Pimcore\Bundle\StudioUiBundle\Exception\BuildArchiveNotWritableException;
use ZipArchive;

/**
 * Unit coverage for the archive extraction decision logic in {@see BuildArchiveExtractor}.
 */
class BuildArchiveExtractorTest extends Unit
{
    private const MARKER = 'extracted-archive.json';

    private string $workDir;

    private string $archiveDir;

    private string $targetDir;

    public function _before(): void
    {
        $this->workDir = sys_get_temp_dir() . '/studio-build-test-' . uniqid('', true);
        $this->archiveDir = $this->workDir . '/archives';
        // public/ is the (writable) parent; build/ is reconstructed inside it by the extractor.
        $this->targetDir = $this->workDir . '/public/build';

        mkdir($this->archiveDir, 0775, true);
        mkdir($this->workDir . '/public', 0775, true);
    }

    public function _after(): void
    {
        $this->removeDirectory($this->workDir);
    }

    public function testFreshExtractReconstructsBuildAndMarker(): void
    {
        $this->createArchive('aaaa1111');

        $this->extractor()->ensureExtracted($this->glob(), $this->targetDir);

        $this->assertFileExists($this->targetDir . '/aaaa1111-app/entrypoints.json');
        $this->assertFileExists($this->targetDir . '/aaaa1111-sdk/entrypoints.json');
        $this->assertSame('build-aaaa1111.zip', $this->markerArchive());
    }

    public function testUpToDateExtractionIsNoOp(): void
    {
        $this->createArchive('aaaa1111');
        $extractor = $this->extractor();
        $extractor->ensureExtracted($this->glob(), $this->targetDir);

        // A re-extract would swap the whole directory away; the sentinel must survive.
        $sentinel = $this->targetDir . '/SENTINEL';
        file_put_contents($sentinel, 'keep');

        $extractor->ensureExtracted($this->glob(), $this->targetDir);

        $this->assertFileExists($sentinel);
    }

    public function testManualBuildIsNeverClobbered(): void
    {
        $this->createArchive('zzzz9999');
        // A manual `npm run dev-app` build: an expanded build with no extractor marker.
        $this->writeBuildDir('manual-app', null);

        $this->extractor()->ensureExtracted($this->glob(), $this->targetDir);

        $this->assertFileExists($this->targetDir . '/manual-app/entrypoints.json');
        $this->assertDirectoryDoesNotExist($this->targetDir . '/zzzz9999-app');
        $this->assertFileDoesNotExist($this->targetDir . '/' . self::MARKER);
    }

    public function testStaleExtractionIsRefreshed(): void
    {
        $this->createArchive('newid111');
        // A build previously extracted from a different archive.
        $this->writeBuildDir('oldid000-app', 'oldid000');
        $this->writeMarker('build-oldid000.zip');

        $this->extractor()->ensureExtracted($this->glob(), $this->targetDir);

        $this->assertFileExists($this->targetDir . '/newid111-app/entrypoints.json');
        $this->assertDirectoryDoesNotExist($this->targetDir . '/oldid000-app');
        $this->assertSame('build-newid111.zip', $this->markerArchive());
    }

    public function testThrowsWhenTargetNotWritableAndNoBuildPresent(): void
    {
        $this->createArchive('aaaa1111');
        // Point at a target whose parent does not exist: a non-writable target with nothing
        // to serve. (We avoid chmod-based read-only here because CI may run as root, for
        // which is_writable() ignores permission bits.)
        $readOnlyTarget = $this->workDir . '/missing/public/build';

        $this->expectException(BuildArchiveNotWritableException::class);

        $this->extractor()->ensureExtracted($this->glob(), $readOnlyTarget);
    }

    public function testMultipleArchivesAreSelectedDeterministically(): void
    {
        // Content-hash names carry no chronology, so selection is by deterministic sort
        // (last), not "newest": build-bbbb wins over build-aaaa.
        $this->createArchive('aaaa');
        $this->createArchive('bbbb');

        $this->extractor()->ensureExtracted($this->glob(), $this->targetDir);

        $this->assertFileExists($this->targetDir . '/bbbb-app/entrypoints.json');
        $this->assertDirectoryDoesNotExist($this->targetDir . '/aaaa-app');
        $this->assertSame('build-bbbb.zip', $this->markerArchive());
    }

    public function testNoArchiveIsNoOp(): void
    {
        // Empty archive dir: nothing to extract, no error, target stays empty.
        $this->extractor()->ensureExtracted($this->glob(), $this->targetDir);

        $this->assertDirectoryDoesNotExist($this->targetDir);
    }

    public function testEntryPointLocationsReturnsTheSingleBuildGroup(): void
    {
        $this->createArchive('aaaa1111');
        $extractor = $this->extractor();
        $extractor->ensureExtracted($this->glob(), $this->targetDir);

        $locations = $extractor->entryPointLocations($this->targetDir);

        $this->assertCount(2, $locations); // app + sdk of the one build
        foreach ($locations as $location) {
            $this->assertStringContainsString('aaaa1111-', $location);
        }
    }

    public function testEntryPointLocationsPrefersTheBuildNamedByTheMarker(): void
    {
        // Two build groups present (a dev anomaly); the marker decides which one is active.
        $this->writeBuildDir('id1aaaa-app', 'id1aaaa');
        $this->writeBuildDir('id2bbbb-app', 'id2bbbb');
        $this->writeMarker('build-id1aaaa.zip');

        $locations = $this->extractor()->entryPointLocations($this->targetDir);

        $this->assertCount(1, $locations);
        $this->assertStringContainsString('id1aaaa-', $locations[0]);
    }

    public function testEntryPointLocationsFallsBackToDeterministicChoiceWithoutMarker(): void
    {
        // Same anomaly, but no marker: fall back to a deterministic choice (last by sort),
        // never file mtimes. id2bbbb sorts after id1aaaa.
        $this->writeBuildDir('id1aaaa-app', 'id1aaaa');
        $this->writeBuildDir('id2bbbb-app', 'id2bbbb');

        $locations = $this->extractor()->entryPointLocations($this->targetDir);

        $this->assertCount(1, $locations);
        $this->assertStringContainsString('id2bbbb-', $locations[0]);
    }

    public function testEntryPointLocationsCollapsesToOneBuildWhenBuildIdFilesAreMissing(): void
    {
        // Two full builds (each an app + sdk pair) are present, but none carries a .build-id
        // file — e.g. a dev-server build (writes entrypoints.json but no .build-id) accumulated
        // across source edits. The serving path must still pick exactly one build: returning
        // both would load two copies of the app and register every DI service twice ("Ambiguous
        // match found for serviceIdentifier"). The dirs group by their "<id>-app" / "<id>-sdk"
        // name so an app and its sdk still pair up.
        $this->writeBuildDir('id1aaaa-app', null);
        $this->writeBuildDir('id1aaaa-sdk', null);
        $this->writeBuildDir('id2bbbb-app', null);
        $this->writeBuildDir('id2bbbb-sdk', null);

        $locations = $this->extractor()->entryPointLocations($this->targetDir);

        // Exactly the app + sdk of a single build, never a mix of two builds.
        $this->assertCount(2, $locations);
        $prefixes = array_unique(array_map(
            static fn (string $location): string => explode('-', basename(dirname($location)))[0],
            $locations
        ));
        $this->assertCount(1, $prefixes);
    }

    public function testEntryPointLocationsPrefersTheBuildIdTaggedBuildOverUntaggedStrays(): void
    {
        // The current build carries a .build-id; an interrupted/older build left behind next to
        // it does not. The tagged build must win and the strays must be ignored (not
        // double-loaded) — even though "zzstray0" sorts after "current1", so the choice is
        // driven by the .build-id marker, not by name order.
        $this->writeBuildDir('current1-app', 'current1');
        $this->writeBuildDir('current1-sdk', 'current1');
        $this->writeBuildDir('zzstray0-app', null);
        $this->writeBuildDir('zzstray0-sdk', null);

        $locations = $this->extractor()->entryPointLocations($this->targetDir);

        $this->assertCount(2, $locations);
        foreach ($locations as $location) {
            $this->assertStringContainsString('current1-', $location);
        }
    }

    public function testEntryPointLocationsPrefersACompletePairOverAnOrphanAppDirectory(): void
    {
        // A complete build plus a leftover orphan -app (an interrupted/renamed build), none
        // tagged. The orphan sorts last, but returning it would drop the sdk (exposeRemote /
        // window.StudioUIBundleRemoteUrl) and break the app, so the complete pair must win.
        $this->writeBuildDir('aaaapair-app', null);
        $this->writeBuildDir('aaaapair-sdk', null);
        $this->writeBuildDir('zzorphan-app', null);

        $locations = $this->extractor()->entryPointLocations($this->targetDir);

        $this->assertCount(2, $locations);
        foreach ($locations as $location) {
            $this->assertStringContainsString('aaaapair-', $location);
        }
    }

    public function testEntryPointLocationsPrefersACompletePairOverAnOrphanSdkDirectory(): void
    {
        // Same as above, but the orphan is an -sdk. Returning it would omit the required main
        // entry point, so the complete pair must win.
        $this->writeBuildDir('aaaapair-app', null);
        $this->writeBuildDir('aaaapair-sdk', null);
        $this->writeBuildDir('zzorphan-sdk', null);

        $locations = $this->extractor()->entryPointLocations($this->targetDir);

        $this->assertCount(2, $locations);
        foreach ($locations as $location) {
            $this->assertStringContainsString('aaaapair-', $location);
        }
    }

    public function testEntryPointLocationsPrefersACompleteUntaggedBuildOverAnOrphanTaggedDirectory(): void
    {
        // Completeness beats the .build-id tag: an orphan can never serve the UI, so a complete
        // untagged pair wins over a tagged-but-orphaned directory.
        $this->writeBuildDir('xxorphan-app', 'xxorphan');
        $this->writeBuildDir('yycomplete-app', null);
        $this->writeBuildDir('yycomplete-sdk', null);

        $locations = $this->extractor()->entryPointLocations($this->targetDir);

        $this->assertCount(2, $locations);
        foreach ($locations as $location) {
            $this->assertStringContainsString('yycomplete-', $location);
        }
    }

    private function extractor(): BuildArchiveExtractor
    {
        return new BuildArchiveExtractor();
    }

    private function glob(): string
    {
        return $this->archiveDir . '/build*.zip';
    }

    /**
     * Builds a committed archive build-<id>.zip whose contents mirror public/build: an app
     * and an sdk dir, each carrying entrypoints.json and the shared .build-id.
     */
    private function createArchive(string $id): string
    {
        $path = $this->archiveDir . "/build-$id.zip";

        $zip = new ZipArchive();
        $zip->open($path, ZipArchive::CREATE | ZipArchive::OVERWRITE);
        foreach (['app', 'sdk'] as $kind) {
            $zip->addFromString("$id-$kind/entrypoints.json", '{"entrypoints":{}}');
            $zip->addFromString("$id-$kind/.build-id", $id);
        }
        $zip->close();

        return $path;
    }

    private function writeBuildDir(string $dirName, ?string $buildId): void
    {
        $dir = $this->targetDir . '/' . $dirName;
        mkdir($dir, 0775, true);
        file_put_contents($dir . '/entrypoints.json', '{"entrypoints":{}}');
        if ($buildId !== null) {
            file_put_contents($dir . '/.build-id', $buildId);
        }
    }

    private function writeMarker(string $archiveName): void
    {
        if (!is_dir($this->targetDir)) {
            mkdir($this->targetDir, 0775, true);
        }
        file_put_contents(
            $this->targetDir . '/' . self::MARKER,
            json_encode(['archive' => $archiveName], JSON_THROW_ON_ERROR)
        );
    }

    private function markerArchive(): ?string
    {
        $markerFile = $this->targetDir . '/' . self::MARKER;
        if (!is_file($markerFile)) {
            return null;
        }

        $data = json_decode((string) file_get_contents($markerFile), true);

        return is_array($data) && isset($data['archive']) ? (string) $data['archive'] : null;
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
