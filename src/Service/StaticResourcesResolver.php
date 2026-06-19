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

            $locations = $this->selectActiveBuildLocations($entryPointProvider->getEntryPointsJsonLocations());
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
     * `.build-id`. Normally exactly one build is present. If several are (a dev anomaly),
     * serve the dirs of the build the extractor actually installed (per the
     * `extracted-archive.json` marker); otherwise fall back to a deterministic choice — never
     * file mtimes, which are not stable across checkouts/deploys. Falls back to all locations
     * when no build ids are present (legacy builds).
     *
     * @param string[] $locations
     *
     * @return string[]
     */
    private function selectActiveBuildLocations(array $locations): array
    {
        $byBuildId = [];
        foreach ($locations as $location) {
            $idFile = dirname($location) . '/.build-id';
            if (!is_file($idFile)) {
                continue;
            }

            $buildId = trim((string) @file_get_contents($idFile));
            if ($buildId !== '') {
                $byBuildId[$buildId][] = $location;
            }
        }

        if ($byBuildId === []) {
            return $locations;
        }
        if (count($byBuildId) === 1) {
            return reset($byBuildId);
        }

        $activeBuildId = $this->extractedBuildId($locations);
        if ($activeBuildId !== null && isset($byBuildId[$activeBuildId])) {
            return $byBuildId[$activeBuildId];
        }

        ksort($byBuildId);

        return $byBuildId[array_key_last($byBuildId)];
    }

    /**
     * Build id the extractor recorded as installed, read from public/build/extracted-archive.json
     * (`build-<id>.zip` -> `<id>`), or null for a manually built / legacy tree.
     *
     * @param string[] $locations
     */
    private function extractedBuildId(array $locations): ?string
    {
        if ($locations === []) {
            return null;
        }

        $marker = dirname($locations[0], 2) . '/extracted-archive.json';
        if (!is_file($marker)) {
            return null;
        }

        $data = json_decode((string) @file_get_contents($marker), true);
        $archive = is_array($data) ? ($data['archive'] ?? null) : null;

        return is_string($archive) && preg_match('/^build-(.+)\.zip$/', $archive, $matches) === 1
            ? $matches[1]
            : null;
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
