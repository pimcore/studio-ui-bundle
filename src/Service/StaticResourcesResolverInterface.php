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

/**
 * @internal
 */
interface StaticResourcesResolverInterface
{
    /**
     * @return string[]
     */
    public function getCssFiles(): array;

    /**
     * @return string[]
     */
    public function getJsFiles(): array;
}
