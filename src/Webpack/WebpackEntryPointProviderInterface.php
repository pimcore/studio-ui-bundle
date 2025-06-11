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

namespace Pimcore\Bundle\StudioUiBundle\Webpack;

interface WebpackEntryPointProviderInterface
{
    public function getEntryPointsJsonLocations(): array;

    public function getEntryPoints(): array;

    /**
     * Can be used to define entry points that are allowed to be empty.
     * This is useful for bundles that have optional entry points which are created e.g. for the dev environment only.
     */
    public function getOptionalEntryPoints(): array;
}
