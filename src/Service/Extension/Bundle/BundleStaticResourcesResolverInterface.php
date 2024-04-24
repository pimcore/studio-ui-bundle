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
