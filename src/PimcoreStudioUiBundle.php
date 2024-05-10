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

namespace Pimcore\Bundle\StudioUiBundle;

use function dirname;
use Pimcore\Bundle\StudioUiBundle\Extension\Bundle\PimcoreBundleStudioUiInterface;
use Pimcore\Extension\Bundle\AbstractPimcoreBundle;

class PimcoreStudioUiBundle extends AbstractPimcoreBundle implements PimcoreBundleStudioUiInterface
{
    public function getPath(): string
    {
        return dirname(__DIR__);
    }

    public function getWebpackEntryPointsJsonLocations(): array
    {
        return [
            $this->getPath() . '/public/build/entrypoints.json',
            $this->getPath() . '/public/vendor/entrypoints.json',
            $this->getPath() . '/public/core-dll/entrypoints.json',
        ];
    }

    public function getWebpackEntryPoints(): array
    {
        return ['vendor', 'core-dll', 'main'];
    }
}
