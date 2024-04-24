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

namespace Pimcore\Bundle\StudioUiBundle;

use Pimcore\Bundle\StudioUiBundle\Extension\Bundle\PimcoreBundleStudioUiInterface;
use function dirname;
use Pimcore\Extension\Bundle\AbstractPimcoreBundle;

class PimcoreStudioUiBundle extends AbstractPimcoreBundle implements PimcoreBundleStudioUiInterface
{
    public function getPath(): string
    {
        return dirname(__DIR__);
    }

    public function getWebpackEntryPointsJsonLocation(): string
    {
        return $this->getPath() . '/public/build/entrypoints.json';
    }

    public function getWebpackEntryPoint(): string
    {
        return 'main';
    }
}
