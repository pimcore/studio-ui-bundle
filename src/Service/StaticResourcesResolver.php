<?php
declare(strict_types=1);

/**
 * Pimcore
 *
 * This source file is available under following license:
 * - Pimcore Commercial License (PCL)
 *
 *  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 *  @license    http://www.pimcore.org/license     PCL
 */

namespace Pimcore\Bundle\StudioUiBundle\Service;

use Exception;
use Pimcore\Bundle\StudioUiBundle\Exception\InvalidEntrypointsJsonException;
use Pimcore\Bundle\StudioUiBundle\Extension\Bundle\PimcoreBundleStudioUiInterface;
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
    public function getCssFiles(): array
    {
        return $this->getFilesFromEntryPointsJson('css');
    }

    /**
     * @throws InvalidEntrypointsJsonException
     */
    public function getJsFiles(): array
    {
        return $this->getFilesFromEntryPointsJson('js');
    }

    /**
     * @throws InvalidEntrypointsJsonException
     */
    private function getFilesFromEntryPointsJson(string $type): array
    {
        $files = [];
        foreach ($this->getStudioUiBundles() as $bundle) {
            $entryPoints = [];

            foreach ($bundle->getWebpackEntryPointsJsonLocations() as $entryPointsJsonLocation) {
                $entryPoints[] = $this->getEntryPointsJsonContent($entryPointsJsonLocation);
            }

            foreach ($bundle->getWebpackEntryPoints() as $entryPointName) {
                $entryPoint = null;

                foreach ($entryPoints as $entryPointJson) {
                    if (isset($entryPointJson['entrypoints'][$entryPointName])) {
                        $entryPoint = $entryPointJson['entrypoints'][$entryPointName];
                        break;
                    }
                }

                if ($entryPoint === null) {
                    throw new InvalidEntrypointsJsonException(
                        sprintf(
                            'Entry point "%s" in file "%s" not found',
                            $entryPointName,
                            $bundle->getWebpackEntryPointsJsonLocations()
                        )
                    );
                }

                if (is_array($entryPoint[$type] ?? null)) {
                    foreach ($entryPoint[$type] as $file) {
                        $files[$bundle::class][] = $file;
                    }
                }
            }
        }

        return $files;
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

            } catch(Exception $e) {
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
            if($bundle instanceof PimcoreBundleStudioUiInterface) {
                if ($bundle instanceof PimcoreStudioUiBundle) {
                    // put studio UI bundle at the beginning
                    array_unshift($bundles, $bundle);
                } else {
                    $bundles[] = $bundle;
                }
            }
        }

        return $bundles;
    }
}
