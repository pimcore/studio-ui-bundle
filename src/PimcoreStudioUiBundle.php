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

use function dirname;
use Pimcore\Extension\Bundle\AbstractPimcoreBundle;

class PimcoreStudioUiBundle extends AbstractPimcoreBundle
{
    public function getPath(): string
    {
        return dirname(__DIR__);
    }
}
