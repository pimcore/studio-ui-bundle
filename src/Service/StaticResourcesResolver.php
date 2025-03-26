<?php
declare(strict_types=1);

/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 *  @license    http://www.pimcore.org/license     GPLv3 and PCL
 */

namespace Pimcore\Bundle\StudioUiBundle\Service;

use Exception;
use Pimcore\Bundle\StudioUiBundle\Exception\InvalidEntryPointsJsonException;
use Pimcore\Bundle\StudioUiBundle\Webpack\WebpackEntryPointManager;
use Pimcore\Bundle\StudioUiBundle\Webpack\WebpackEntryPointProvider;
use Pimcore\Bundle\StudioUiBundle\Webpack\WebpackEntryPointProviderInterface;

/**
 * @internal
 */
final readonly class StaticResourcesResolver implements StaticResourcesResolverInterface
{
    public function __construct(
        private WebpackEntryPointManager $webpackEntryPointManager,
        private WebpackEntryPointProvider $studioEntryPointProvider,
    ) {
    }

    /**
     * @throws InvalidEntryPointsJsonException
     */
    public function getStudioCssFiles(): array
    {
        return $this->getFilesFromEntryPointsJson('css', [$this->studioEntryPointProvider]);
    }

    /**
     * @throws InvalidEntryPointsJsonException
     */
    public function getStudioJsFiles(): array
    {
        return $this->getFilesFromEntryPointsJson('js', [$this->studioEntryPointProvider]);
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

    /**
     * @param WebpackEntryPointProviderInterface[]|null $providers
     *
     * @throws InvalidEntryPointsJsonException
     */
    private function getFilesFromEntryPointsJson(string $type, ?array $providers = null): array
    {
        $entryPointProviders = $providers ?? $this->webpackEntryPointManager->getProviders();

        $files = [];
        foreach ($entryPointProviders as $entryPointProvider) {
            $entryPointJsonContents = [];

            foreach ($entryPointProvider->getEntryPointsJsonLocations() as $entryPointsJsonLocation) {
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
}
