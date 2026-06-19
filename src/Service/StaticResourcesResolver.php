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

namespace Pimcore\Bundle\StudioUiBundle\Service;

use Exception;
use Pimcore\Bundle\StudioUiBundle\Exception\InvalidEntryPointsJsonException;
use Pimcore\Bundle\StudioUiBundle\Webpack\WebpackEntryPointManager;
use Pimcore\Bundle\StudioUiBundle\Webpack\WebpackEntryPointProvider;
use Pimcore\Bundle\StudioUiBundle\Webpack\WebpackEntryPointProviderDocumentEditorIframe;
use Pimcore\Bundle\StudioUiBundle\Webpack\WebpackEntryPointProviderInterface;
use Pimcore\ValueObject\Collection\ArrayOfStrings;

/**
 * @internal
 */
final readonly class StaticResourcesResolver implements StaticResourcesResolverInterface
{
    private ArrayOfStrings $additionalCssFiles;

    private ArrayOfStrings $additionalJsFiles;

    public function __construct(
        private WebpackEntryPointManager $webpackEntryPointManager,
        array $additionalCssFiles = [],
        array $additionalJsFiles = []
    ) {
        $this->additionalCssFiles = new ArrayOfStrings($additionalCssFiles);
        $this->additionalJsFiles = new ArrayOfStrings($additionalJsFiles);
    }

    /**
     * @throws InvalidEntryPointsJsonException
     */
    public function getStudioCssFiles(): array
    {
        return $this->getFilesFromEntryPointsJson('css', true);
    }

    /**
     * @throws InvalidEntryPointsJsonException
     */
    public function getStudioJsFiles(): array
    {
        return $this->getFilesFromEntryPointsJson('js', true);
    }

    /**
     * @throws InvalidEntryPointsJsonException
     */
    public function getBundleCssFiles(): array
    {
        return $this->getFilesFromEntryPointsJson('css');
    }

    /**
     * @throws InvalidEntryPointsJsonException
     */
    public function getBundleJsFiles(): array
    {
        return $this->getFilesFromEntryPointsJson('js');
    }

    public function getAdditionalCssFiles(): array
    {
        return $this->additionalCssFiles->getValue();
    }

    public function getAdditionalJsFiles(): array
    {
        return $this->additionalJsFiles->getValue();
    }

    /**
     * @throws InvalidEntryPointsJsonException
     */
    private function getFilesFromEntryPointsJson(string $type, bool $fromStudioCore = false): array
    {
        $entryPointProviders = array_filter(
            $this->webpackEntryPointManager->getProviders(),
            fn ($provider) => $fromStudioCore === $this->isStudioCoreProvider($provider)
        );

        $files = [];
        foreach ($entryPointProviders as $entryPointProvider) {
            $entryPointJsonContents = [];

            $locations = $this->selectLatestBuildLocations($entryPointProvider->getEntryPointsJsonLocations());
            foreach ($locations as $entryPointsJsonLocation) {
                $entryPointJsonContents[] = $this->getEntryPointsJsonContent($entryPointsJsonLocation);
            }

            foreach ($this->getEntryPoints($entryPointProvider) as $entryPointName) {

                $entryPointFound = false;
                foreach ($entryPointJsonContents as $entryPointJson) {
                    if (isset($entryPointJson['entrypoints'][$entryPointName])) {
                        $entryPointFound = true;
                        $entryPoint = $entryPointJson['entrypoints'][$entryPointName];

                        if (is_array($entryPoint[$type] ?? null)) {
                            foreach ($entryPoint[$type] as $file) {
                                $files[] = $file;
                            }
                        }
                    }
                }

                if (!$entryPointFound && !$this->isEntryPointOptional($entryPointProvider, $entryPointName)) {
                    throw new InvalidEntryPointsJsonException(
                        sprintf(
                            'Entry point "%s" for entry point provider "%s" not found in any of the entry points JSON files: %s',
                            $entryPointName,
                            get_class($entryPointProvider),
                            implode(', ', $entryPointProvider->getEntryPointsJsonLocations())
                        )
                    );
                }
            }
        }

        return $files;
    }

    /**
     * A single build emits multiple dirs (e.g. the SDK and app builds), all sharing one
     * `.build-id`. If several builds are present (multiple `.build-id` groups), keep only
     * the dirs of the most recently built group, so stale builds are never served. Falls
     * back to all locations when no build ids are present (legacy builds).
     *
     * @param string[] $locations
     *
     * @return string[]
     */
    private function selectLatestBuildLocations(array $locations): array
    {
        $withId = [];
        foreach ($locations as $location) {
            $idFile = dirname($location) . '/.build-id';
            if (!is_file($idFile)) {
                continue;
            }

            $buildId = trim((string) @file_get_contents($idFile));
            if ($buildId !== '') {
                $withId[] = [
                    'location' => $location,
                    'buildId' => $buildId,
                    'mtime' => @filemtime(dirname($location)) ?: 0,
                ];
            }
        }

        if ($withId === []) {
            return $locations;
        }

        $groupMtime = [];
        foreach ($withId as $entry) {
            $groupMtime[$entry['buildId']] = max($groupMtime[$entry['buildId']] ?? 0, $entry['mtime']);
        }
        arsort($groupMtime);
        $latestBuildId = array_key_first($groupMtime);

        return array_values(
            array_map(
                static fn (array $entry): string => $entry['location'],
                array_filter($withId, static fn (array $entry): bool => $entry['buildId'] === $latestBuildId)
            )
        );
    }

    private function getEntryPoints(WebpackEntryPointProviderInterface $entryPointProvider): array
    {
        return array_unique(
            array_merge(
                $entryPointProvider->getEntryPoints(),
                $entryPointProvider->getOptionalEntryPoints()
            )
        );
    }

    private function isEntryPointOptional(WebpackEntryPointProviderInterface $entryPointProvider, string $entryPointName): bool
    {
        return  in_array($entryPointName, $entryPointProvider->getOptionalEntryPoints(), true);
    }

    /**
     * @throws InvalidEntryPointsJsonException
     */
    private function getEntryPointsJsonContent(string $entryPointsJsonLocation): array
    {
        if (file_exists($entryPointsJsonLocation)) {

            try {
                return json_decode(
                    file_get_contents($entryPointsJsonLocation),
                    true,
                    512,
                    JSON_THROW_ON_ERROR
                );

            } catch (Exception $e) {
                throw new InvalidEntryPointsJsonException(
                    sprintf(
                        'Error parsing entry points JSON file %s: %s',
                        $entryPointsJsonLocation,
                        $e->getMessage()
                    ),
                    0,
                    $e
                );
            }

        }

        throw new InvalidEntryPointsJsonException(
            sprintf(
                'Entry points JSON file not found: %s',
                $entryPointsJsonLocation
            )
        );
    }

    private function isStudioCoreProvider(WebpackEntryPointProviderInterface $entryPointProvider): bool
    {
        return $entryPointProvider instanceof WebpackEntryPointProvider
            || $entryPointProvider instanceof WebpackEntryPointProviderDocumentEditorIframe;
    }
}
