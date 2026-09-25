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

namespace Pimcore\Bundle\StudioUiBundle\Tests\Unit\Webpack;

use Codeception\Test\Unit;
use Pimcore\Bundle\StudioUiBundle\Build\BuildArchive;
use Pimcore\Bundle\StudioUiBundle\Build\BuildArchiveProviderInterface;
use Pimcore\Bundle\StudioUiBundle\Exception\InvalidEntryPointsJsonException;
use Pimcore\Bundle\StudioUiBundle\Webpack\EntryPointCatalog;
use Pimcore\Bundle\StudioUiBundle\Webpack\WebpackEntryPointManager;
use Pimcore\Bundle\StudioUiBundle\Webpack\WebpackEntryPointProviderInterface;
use Psr\Log\AbstractLogger;
use Psr\Log\NullLogger;
use RuntimeException;
use Stringable;
use Symfony\Component\Config\ConfigCacheFactory;

class EntryPointCatalogTest extends Unit
{
    private const OLD_JS = '/build/aaaa/old.js';

    private const NEW_JS = '/build/aaaa/new.js';

    private string $workDir;

    private string $targetDir;

    private string $cacheDir;

    public function _before(): void
    {
        $this->workDir = sys_get_temp_dir() . '/studio-entry-point-catalog-' . uniqid('', true);
        $this->targetDir = $this->workDir . '/public/build';
        $this->cacheDir = $this->workDir . '/cache';

        mkdir($this->targetDir, 0775, true);
        mkdir($this->workDir . '/build-dist', 0775, true);
        mkdir($this->cacheDir, 0775, true);
    }

    public function _after(): void
    {
        $this->removeDirectory($this->workDir);
    }

    public function testArchiveProviderIsReadOncePerRequestAndThenServedFromTheManifest(): void
    {
        $this->writeBuild('aaaa', ['main' => ['js' => ['/build/aaaa/main.js']]]);
        $provider = $this->archiveProvider();

        $first = $this->catalog([$provider]);
        $first->getEntryPointsJsonLocations($provider);
        $json = $first->getEntryPointsJson($provider, $this->location('aaaa'));

        $second = $this->catalog([$provider]);
        $this->assertSame($json, $second->getEntryPointsJson($provider, $this->location('aaaa')));
        $this->assertSame(1, $provider->calls);
    }

    public function testDebugModeRebuildsWhenAnEntrypointsJsonChanges(): void
    {
        $this->writeBuild('aaaa', ['main' => ['js' => [self::OLD_JS]]]);
        $provider = $this->archiveProvider();
        $location = $this->location('aaaa');

        $this->catalog([$provider], true)->getEntryPointsJson($provider, $location);

        $this->writeBuild('aaaa', ['main' => ['js' => [self::NEW_JS]]]);
        touch($location, time() + 10);

        $json = $this->catalog([$provider], true)->getEntryPointsJson($provider, $location);
        $this->assertSame([self::NEW_JS], $json['entrypoints']['main']['js']);
        $this->assertSame(2, $provider->calls);
    }

    public function testDebugModeRebuildsWhenABuildDirectoryIsAdded(): void
    {
        $this->writeBuild('aaaa', []);
        $provider = $this->archiveProvider();

        $this->assertCount(1, $this->catalog([$provider], true)->getEntryPointsJsonLocations($provider));

        $this->writeBuild('bbbb', []);
        touch($this->targetDir, time() + 10);

        $this->assertCount(2, $this->catalog([$provider], true)->getEntryPointsJsonLocations($provider));
    }

    public function testProductionKeepsTheManifestUntilTheCacheIsRebuilt(): void
    {
        $this->writeBuild('aaaa', ['main' => ['js' => [self::OLD_JS]]]);
        $provider = $this->archiveProvider();
        $location = $this->location('aaaa');

        $this->catalog([$provider])->getEntryPointsJson($provider, $location);

        $this->writeBuild('aaaa', ['main' => ['js' => [self::NEW_JS]]]);
        touch($location, time() + 10);

        $json = $this->catalog([$provider])->getEntryPointsJson($provider, $location);
        $this->assertSame([self::OLD_JS], $json['entrypoints']['main']['js']);
    }

    public function testProductionRebuildsTheManifestWhenACachedBuildIsGone(): void
    {
        $this->writeBuild('aaaa', []);
        $provider = $this->archiveProvider();

        $this->assertSame([$this->location('aaaa')], $this->locationsInNewRequest($provider));

        // what an extraction does: the build dir is replaced by one named after the new build id
        $this->removeDirectory($this->targetDir . '/aaaa');
        $this->writeBuild('bbbb', []);

        $this->assertSame([$this->location('bbbb')], $this->locationsInNewRequest($provider));
        $this->assertSame([$this->location('bbbb')], $this->locationsInNewRequest($provider));
        $this->assertSame(2, $provider->calls);
    }

    public function testAProviderWithoutABuildIsNotCached(): void
    {
        $provider = $this->archiveProvider();

        $this->assertSame([], $this->locationsInNewRequest($provider));

        $this->writeBuild('aaaa', []);

        $this->assertSame([$this->location('aaaa')], $this->locationsInNewRequest($provider));
    }

    public function testOtherProvidersAreReadOncePerRequestButNeverCached(): void
    {
        $this->writeBuild('aaaa', []);
        $provider = $this->plainProvider([$this->location('aaaa')]);

        $catalog = $this->catalog([$provider]);
        $catalog->getEntryPointsJsonLocations($provider);
        $catalog->getEntryPointsJsonLocations($provider);
        $this->assertSame(1, $provider->calls);

        $catalog->reset();
        $catalog->getEntryPointsJsonLocations($provider);
        $this->assertSame(2, $provider->calls);

        $this->catalog([$provider])->getEntryPointsJsonLocations($provider);
        $this->assertSame(3, $provider->calls);
    }

    public function testMissingEntrypointsJsonFailsWithTheSameMessage(): void
    {
        $location = $this->location('missing');
        $provider = $this->plainProvider([$location]);

        $this->expectException(InvalidEntryPointsJsonException::class);
        $this->expectExceptionMessage('Entry points JSON file not found: ' . $location);

        $this->catalog([$provider])->getEntryPointsJson($provider, $location);
    }

    public function testInvalidEntrypointsJsonFailsWithTheSameMessage(): void
    {
        mkdir($this->targetDir . '/aaaa');
        file_put_contents($this->location('aaaa'), '{not json');
        $location = $this->location('aaaa');
        $provider = $this->archiveProvider();

        $this->expectException(InvalidEntryPointsJsonException::class);
        $this->expectExceptionMessage('Error parsing entry points JSON file ' . $location);

        $this->catalog([$provider])->getEntryPointsJson($provider, $location);
    }

    public function testExposesTheRemoteEntrySourceNextToEachEntrypointsJson(): void
    {
        $this->writeBuild('aaaa', [], 'window.remote = "https://cdn.example.com/remote.js";');
        $this->writeBuild('bbbb', []);
        $provider = $this->archiveProvider();
        $catalog = $this->catalog([$provider]);

        $this->assertSame(
            'window.remote = "https://cdn.example.com/remote.js";',
            $catalog->getExposeRemoteSource($provider, $this->location('aaaa'))
        );
        $this->assertNull($catalog->getExposeRemoteSource($provider, $this->location('bbbb')));
    }

    public function testAFailingProviderIsNotCachedAndFailsOnEveryAccess(): void
    {
        $this->writeBuild('aaaa', []);
        $failing = $this->archiveProvider(new RuntimeException('target not writable'));
        $healthy = $this->archiveProvider();

        // two requests: the healthy provider comes from the manifest, the failing one is asked again
        $this->assertFailingAndHealthyProviders($failing, $healthy);
        $this->assertFailingAndHealthyProviders($failing, $healthy);

        $this->assertSame(1, $healthy->calls);
    }

    public function testAnUnwritableCacheFallsBackToReadingPerRequest(): void
    {
        $this->writeBuild('aaaa', []);
        $provider = $this->archiveProvider();
        $blockingFile = $this->workDir . '/not-a-dir';
        file_put_contents($blockingFile, '');
        $logger = $this->recordingLogger();

        $catalog = new EntryPointCatalog(
            new WebpackEntryPointManager([$provider]),
            new ConfigCacheFactory(false),
            $blockingFile,
            'default',
            $logger
        );

        $this->assertCount(1, $catalog->getEntryPointsJsonLocations($provider));
        $this->assertCount(1, $logger->warnings);
    }

    public function testWarmUpWritesTheManifestIntoTheGivenCacheDir(): void
    {
        $this->writeBuild('aaaa', []);
        $warmupDir = $this->workDir . '/warmup';
        mkdir($warmupDir);

        $this->catalog([$this->archiveProvider()])->warmUp($warmupDir);

        $this->assertFileExists($warmupDir . '/pimcore_studio_ui/entry_points.default.json');
    }

    private function assertFailingAndHealthyProviders(
        BuildArchiveProviderInterface $failing,
        BuildArchiveProviderInterface $healthy
    ): void {
        $catalog = $this->catalog([$failing, $healthy]);
        $this->assertCount(1, $catalog->getEntryPointsJsonLocations($healthy));

        try {
            $catalog->getEntryPointsJsonLocations($failing);
            $this->fail('expected the provider error');
        } catch (RuntimeException $e) {
            $this->assertSame('target not writable', $e->getMessage());
        }
    }

    /**
     * @return string[]
     */
    private function locationsInNewRequest(WebpackEntryPointProviderInterface $provider): array
    {
        return $this->catalog([$provider])->getEntryPointsJsonLocations($provider);
    }

    private function location(string $build): string
    {
        return $this->targetDir . '/' . $build . '/entrypoints.json';
    }

    /**
     * @param WebpackEntryPointProviderInterface[] $providers
     */
    private function catalog(array $providers, bool $debug = false): EntryPointCatalog
    {
        return new EntryPointCatalog(
            new WebpackEntryPointManager($providers),
            new ConfigCacheFactory($debug),
            $this->cacheDir,
            'default',
            new NullLogger()
        );
    }

    private function archiveProvider(?RuntimeException $failure = null): BuildArchiveProviderInterface
    {
        return new class($this->workDir, $this->targetDir, $failure) implements BuildArchiveProviderInterface {
            public int $calls = 0;

            public function __construct(
                private readonly string $workDir,
                private readonly string $targetDir,
                private readonly ?RuntimeException $failure,
            ) {
            }

            public function getBuildArchive(): BuildArchive
            {
                return new BuildArchive($this->workDir . '/build-dist/build*.zip', $this->targetDir);
            }

            public function getEntryPointsJsonLocations(): array
            {
                $this->calls++;
                if ($this->failure !== null) {
                    throw $this->failure;
                }

                return glob($this->targetDir . '/*/entrypoints.json') ?: [];
            }

            public function getEntryPoints(): array
            {
                return ['main'];
            }

            public function getOptionalEntryPoints(): array
            {
                return [];
            }
        };
    }

    /**
     * @param string[] $locations
     */
    private function plainProvider(array $locations): WebpackEntryPointProviderInterface
    {
        return new class($locations) implements WebpackEntryPointProviderInterface {
            public int $calls = 0;

            public function __construct(private readonly array $locations)
            {
            }

            public function getEntryPointsJsonLocations(): array
            {
                $this->calls++;

                return $this->locations;
            }

            public function getEntryPoints(): array
            {
                return ['main'];
            }

            public function getOptionalEntryPoints(): array
            {
                return [];
            }
        };
    }

    private function recordingLogger(): AbstractLogger
    {
        return new class extends AbstractLogger {
            /** @var string[] */
            public array $warnings = [];

            public function log($level, string|Stringable $message, array $context = []): void
            {
                if ($level === 'warning') {
                    $this->warnings[] = (string) $message;
                }
            }
        };
    }

    private function writeBuild(string $id, array $entrypoints, ?string $exposeRemote = null): void
    {
        $dir = $this->targetDir . '/' . $id;
        if (!is_dir($dir)) {
            mkdir($dir, 0775, true);
        }
        file_put_contents(
            $dir . '/entrypoints.json',
            json_encode(['entrypoints' => $entrypoints], JSON_THROW_ON_ERROR)
        );
        if ($exposeRemote !== null) {
            file_put_contents($dir . '/exposeRemote.js', $exposeRemote);
        }
    }

    private function removeDirectory(string $dir): void
    {
        if (!is_dir($dir)) {
            return;
        }
        foreach (scandir($dir) ?: [] as $entry) {
            if ($entry === '.' || $entry === '..') {
                continue;
            }
            $path = $dir . '/' . $entry;
            is_dir($path) && !is_link($path) ? $this->removeDirectory($path) : unlink($path);
        }
        rmdir($dir);
    }
}
