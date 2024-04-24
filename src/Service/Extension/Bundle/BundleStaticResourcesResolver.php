<?php
declare(strict_types=1);

namespace Pimcore\Bundle\StudioUiBundle\Service\Extension\Bundle;

use Exception;
use Pimcore\Bundle\StudioUiBundle\Exception\InvalidEntrypointsJsonException;
use Pimcore\Bundle\StudioUiBundle\Extension\Bundle\PimcoreBundleStudioUiInterface;
use Pimcore\Extension\Bundle\PimcoreBundleManager;

/**
 * @internal
 */
final readonly class BundleStaticResourcesResolver implements BundleStaticResourcesResolverInterface
{
    public function __construct(
        private PimcoreBundleManager $bundleManager,
    )
    {
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
    private function getFilesFromEntryPointsJson(string $type): array
    {
        $files = [];
        foreach ($this->getStudioUiBundles() as $bundle) {
            $entryPointsJsonLocation = $bundle->getEntryPointsJsonLocation();

            if (file_exists($entryPointsJsonLocation)) {

                try {
                    $entryPoints = json_decode(
                        file_get_contents($entryPointsJsonLocation),
                        true,
                        512,
                        JSON_THROW_ON_ERROR
                    );

                    foreach ($entryPoints['entrypoints'] as $entryPoint) {
                        if (isset($entryPoint[$type])) {
                            foreach ($entryPoint[$type] as $file) {
                                $files[] = $file;
                            }
                        }
                    }
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

            } else {
                throw new InvalidEntrypointsJsonException(
                    sprintf(
                        'Entry points JSON file not found in bundle %s: %s',
                        $bundle::class,
                        $entryPointsJsonLocation
                    )
                );
            }
        }

        return $files;
    }

    /**
     * @return PimcoreBundleStudioUiInterface[]
     */
    private function getStudioUiBundles(): array
    {
        $bundles = [];

        foreach ($this->bundleManager->getActiveBundles() as $bundle) {
            if($bundle instanceof PimcoreBundleStudioUiInterface) {
                $bundles[] = $bundle;
            }
        }

        return $bundles;
    }
}