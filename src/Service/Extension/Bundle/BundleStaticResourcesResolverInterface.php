<?php
declare(strict_types=1);

namespace Pimcore\Bundle\StudioUiBundle\Service\Extension\Bundle;

/**
 * @internal
 */
interface BundleStaticResourcesResolverInterface
{
    /**
     * @return string[]
     */
    public function getBundleCssFiles(): array;

    /**
     * @return string[]
     */
    public function getBundleJsFiles(): array;
}