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

namespace Pimcore\Bundle\StudioUiBundle\Webpack;

use JsonException;
use Pimcore\Bundle\StudioUiBundle\Build\BuildArchiveProviderInterface;
use Pimcore\Bundle\StudioUiBundle\Exception\InvalidEntryPointsJsonException;
use Psr\Log\LoggerInterface;
use ReflectionClass;
use Symfony\Component\Config\ConfigCacheFactoryInterface;
use Symfony\Component\Config\ConfigCacheInterface;
use Symfony\Component\Config\Resource\FileExistenceResource;
use Symfony\Component\Config\Resource\FileResource;
use Symfony\Component\Config\Resource\ResourceInterface;
use Symfony\Contracts\Service\ResetInterface;
use Throwable;

/**
 * The entrypoints.json files of every provider, read once per request instead of once per consumer.
 *
 * Providers that ship an archive are served from a manifest in the cache dir; in debug mode
 * it is rebuilt when the archive, the build dir or a build file changes. Other providers are
 * read live, because their locations may be dynamic.
 *
 * @internal
 */
final class EntryPointCatalog implements ResetInterface
{
    private const string EXPOSE_REMOTE_FILE = 'exposeRemote.js';

    /**
     * @var array<string, array<string, array{json?: array<mixed>, error?: string, exposeRemote: ?string}>>|null
     */
    private ?array $manifest = null;

    /**
     * @var array<int, array<string, array{json?: array<mixed>, error?: string, exposeRemote: ?string}>>
     */
    private array $resolved = [];

    public function __construct(
        private readonly WebpackEntryPointManager $entryPointManager,
        private readonly ConfigCacheFactoryInterface $configCacheFactory,
        private readonly string $cacheDir,
        private readonly string $name,
        private readonly LoggerInterface $logger,
    ) {
    }

    /**
     * @return WebpackEntryPointProviderInterface[]
     */
    public function getProviders(): array
    {
        return $this->entryPointManager->getProviders();
    }

    /**
     * @return string[]
     */
    public function getEntryPointsJsonLocations(WebpackEntryPointProviderInterface $provider): array
    {
        return array_keys($this->resolve($provider));
    }

    /**
     * @throws InvalidEntryPointsJsonException
     */
    public function getEntryPointsJson(WebpackEntryPointProviderInterface $provider, string $location): array
    {
        $file = $this->resolve($provider)[$location] ?? null;
        if ($file === null) {
            throw new InvalidEntryPointsJsonException(sprintf('Entry points JSON file not found: %s', $location));
        }
        if (isset($file['error'])) {
            throw new InvalidEntryPointsJsonException($file['error']);
        }

        return $file['json'] ?? [];
    }

    /**
     * Contents of the exposeRemote.js next to the given entrypoints.json, if there is one.
     */
    public function getExposeRemoteSource(WebpackEntryPointProviderInterface $provider, string $location): ?string
    {
        return $this->resolve($provider)[$location]['exposeRemote'] ?? null;
    }

    public function warmUp(string $cacheDir): void
    {
        $this->loadManifest($this->manifestFile($cacheDir));
    }

    public function reset(): void
    {
        $this->manifest = null;
        $this->resolved = [];
    }

    /**
     * @return array<string, array{json?: array<mixed>, error?: string, exposeRemote: ?string}>
     */
    private function resolve(WebpackEntryPointProviderInterface $provider): array
    {
        $id = spl_object_id($provider);
        if (isset($this->resolved[$id])) {
            return $this->resolved[$id];
        }

        $key = $this->manifestKey($provider);
        if ($key !== null) {
            $this->manifest ??= $this->loadManifest($this->manifestFile($this->cacheDir));
            if (isset($this->manifest[$key])) {
                return $this->resolved[$id] = $this->manifest[$key];
            }
        }

        return $this->resolved[$id] = $this->read($provider);
    }

    /**
     * @return array<string, array<string, array{json?: array<mixed>, error?: string, exposeRemote: ?string}>>
     */
    private function loadManifest(string $cacheFile): array
    {
        try {
            $cache = $this->configCacheFactory->cache($cacheFile, function (ConfigCacheInterface $cache): void {
                $manifest = [];
                $resources = [];
                foreach ($this->getProviders() as $provider) {
                    $key = $this->manifestKey($provider);
                    if ($key === null || !$provider instanceof BuildArchiveProviderInterface) {
                        continue;
                    }

                    try {
                        $manifest[$key] = $this->read($provider);
                    } catch (Throwable) {
                        // not cached: the provider keeps failing on access, as before
                        continue;
                    }

                    array_push($resources, ...$this->resourcesOf($provider, $manifest[$key]));
                }

                $cache->write('<?php return ' . var_export($manifest, true) . ';' . PHP_EOL, $resources);
            });

            return require $cache->getPath();
        } catch (Throwable $e) {
            $this->logger->warning('Studio entry point manifest unavailable, reading builds per request: {reason}', [
                'reason' => $e->getMessage(),
            ]);

            return [];
        }
    }

    private function manifestFile(string $cacheDir): string
    {
        return $cacheDir . '/pimcore_studio_ui/entry_points.' . $this->name . '.php';
    }

    private function manifestKey(WebpackEntryPointProviderInterface $provider): ?string
    {
        if (!$provider instanceof BuildArchiveProviderInterface || $provider->getBuildArchive() === null) {
            return null;
        }

        $position = array_search($provider, $this->getProviders(), true);

        return $position . ':' . $provider::class;
    }

    /**
     * @param array<string, array{json?: array<mixed>, error?: string, exposeRemote: ?string}> $files
     *
     * @return ResourceInterface[]
     */
    private function resourcesOf(BuildArchiveProviderInterface $provider, array $files): array
    {
        $archive = $provider->getBuildArchive();
        $paths = $archive === null ? [] : [dirname($archive->archiveGlob), $archive->targetDir];

        $classFile = (new ReflectionClass($provider))->getFileName();
        if ($classFile !== false) {
            $paths[] = $classFile;
        }

        foreach (array_keys($files) as $location) {
            $paths[] = $location;
            $paths[] = dirname($location) . '/' . self::EXPOSE_REMOTE_FILE;
        }

        // a directory's mtime changes when entries are added or removed
        return array_map(
            static fn (string $path) => file_exists($path) ? new FileResource($path) : new FileExistenceResource($path),
            $paths
        );
    }

    /**
     * @return array<string, array{json?: array<mixed>, error?: string, exposeRemote: ?string}>
     */
    private function read(WebpackEntryPointProviderInterface $provider): array
    {
        $files = [];
        foreach ($provider->getEntryPointsJsonLocations() as $location) {
            $files[$location] = $this->readLocation($location);
        }

        return $files;
    }

    /**
     * @return array{json?: array<mixed>, error?: string, exposeRemote: ?string}
     */
    private function readLocation(string $location): array
    {
        $exposeRemoteFile = dirname($location) . '/' . self::EXPOSE_REMOTE_FILE;
        $exposeRemote = is_file($exposeRemoteFile) ? (@file_get_contents($exposeRemoteFile) ?: null) : null;

        if (!file_exists($location)) {
            return [
                'error' => sprintf('Entry points JSON file not found: %s', $location),
                'exposeRemote' => $exposeRemote,
            ];
        }

        try {
            $json = json_decode((string) @file_get_contents($location), true, 512, JSON_THROW_ON_ERROR);
        } catch (JsonException $e) {
            return [
                'error' => sprintf('Error parsing entry points JSON file %s: %s', $location, $e->getMessage()),
                'exposeRemote' => $exposeRemote,
            ];
        }

        return ['json' => is_array($json) ? $json : [], 'exposeRemote' => $exposeRemote];
    }
}
