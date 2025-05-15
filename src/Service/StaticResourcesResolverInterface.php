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

/**
 * @internal
 */
interface StaticResourcesResolverInterface
{
    /**
     * @return string[]
     */
    public function getStudioCssFiles(): array;

    /**
     * @return string[]
     */
    public function getStudioJsFiles(): array;

    /**
     * @return string[]
     */
    public function getBundleCssFiles(): array;

    /**
     * @return string[]
     */
    public function getBundleJsFiles(): array;

    /**
     * @return string[]
     */
    public function getAdditionalCssFiles(): array;

    /**
     * @return string[]
     */
    public function getAdditionalJsFiles(): array;
}
