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
use Pimcore\Bundle\StudioUiBundle\Exception\InvalidEntrypointsJsonException;
use Pimcore\Bundle\StudioUiBundle\Extension\Bundle\PimcoreBundleStudioUiInterface;
use Pimcore\Bundle\StudioUiBundle\Extension\Bundle\PimcoreBundleStudioUiOptionalEntrypointsInterface;
use Pimcore\Bundle\StudioUiBundle\PimcoreStudioUiBundle;
use Pimcore\Extension\Bundle\PimcoreBundleManager;

/**
 * @internal
 */
final class StaticResourcesResolver implements StaticResourcesResolverInterface
{
    public function __construct(
        private readonly PimcoreBundleManager $bundleManager,
    ) {
    }

    /**
     * @throws InvalidEntrypointsJsonException
     */
    public function getStudioCssFiles(): array
    {
        return $this->getFilesFromEntryPointsJson('css', [$this->getStudioUiBundle()]);
    }

    /**
     * @throws InvalidEntrypointsJsonException
     */
    public function getStudioJsFiles(): array
    {
        return $this->getFilesFromEntryPointsJson('js', [$this->getStudioUiBundle()]);
    }

    /**
     * @throws InvalidEntrypointsJsonException
     */
    public function getBundleCssFiles(): array
    {
        return $this->getFilesFromEntryPointsJson('css');
    }

    /**
     * @throws InvalidEntrypointsJsonException
     */
    public function getBundleJsFiles(): array
    {
        return $this->getFilesFromEntryPointsJson('js');
    }

    /**
     * @throws InvalidEntrypointsJsonException
     */
    private function getFilesFromEntryPointsJson(string $type, ?array $bundles = null): array
    {
        $bundles = is_array($bundles) ? $bundles : $this->getStudioUiBundles();

        $files = [];
        foreach ($bundles as $bundle) {
            $entryPointJsonContents = [];

            foreach ($bundle->getWebpackEntryPointsJsonLocations() as $entryPointsJsonLocation) {
                $entryPointJsonContents[] = $this->getEntryPointsJsonContent($entryPointsJsonLocation);
            }

            foreach ($this->getEntryPoints($bundle) as $entryPointName) {

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

                if (!$entryPointFound && !$this->isEntryPointOptional($bundle, $entryPointName)) {
                    throw new InvalidEntrypointsJsonException(
                        sprintf(
                            'Entry point "%s" not found in any of the entry points JSON files: %s',
                            $entryPointName,
                            implode(', ', $bundle->getWebpackEntryPointsJsonLocations())
                        )
                    );
                }
            }
        }

        return $files;
    }

    private function getEntryPoints(PimcoreBundleStudioUiInterface $bundle): array
    {
        $entryPoints = $bundle->getWebpackEntryPoints();

        if ($bundle instanceof PimcoreBundleStudioUiOptionalEntrypointsInterface) {
            $entryPoints = array_merge($entryPoints, $bundle->getWebpackOptionalEntrypoints());
        }

        return array_unique($entryPoints);
    }

    private function isEntryPointOptional(PimcoreBundleStudioUiInterface $bundle, string $entryPointName): bool
    {
        return $bundle instanceof PimcoreBundleStudioUiOptionalEntrypointsInterface
            && in_array($entryPointName, $bundle->getWebpackOptionalEntrypoints(), true);
    }

    /**
     * @throws InvalidEntrypointsJsonException
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
                throw new InvalidEntrypointsJsonException(
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

        throw new InvalidEntrypointsJsonException(
            sprintf(
                'Entry points JSON file not found: %s',
                $entryPointsJsonLocation
            )
        );
    }

    /**
     * @return PimcoreBundleStudioUiInterface[]
     */
    private function getStudioUiBundles(): array
    {
        $bundles = [];

        foreach ($this->bundleManager->getActiveBundles() as $bundle) {
            if ($bundle instanceof PimcoreStudioUiBundle) {
                continue;
            }
            if ($bundle instanceof PimcoreBundleStudioUiInterface) {
                $bundles[] = $bundle;
            }
        }

        return $bundles;
    }

    private function getStudioUiBundle(): PimcoreStudioUiBundle
    {
        /** @var PimcoreStudioUiBundle $bundle */
        $bundle = $this->bundleManager->getActiveBundle(PimcoreStudioUiBundle::class);

        return $bundle;
    }
}
