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

namespace Pimcore\Bundle\StudioUiBundle\Webpack;

interface WebpackEntryPointProviderInterface
{
    public function getEntryPointsJsonLocations(): array;

    public function getEntryPoints(): array;

    /**
     * Can be used to define entry points that are allowed to be empty.
     * This is useful for bundles that have optional entryp oints which are created e.g. for the dev environment only.
     */
    public function getOptionalEntryPoints(): array;
}
