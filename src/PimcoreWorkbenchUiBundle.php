<?php

declare(strict_types=1);

namespace Pimcore\Bundle\WorkbenchUiBundle;

use Pimcore\Extension\Bundle\AbstractPimcoreBundle;

class PimcoreWorkbenchUiBundle extends AbstractPimcoreBundle
{
    public function getPath(): string
    {
        return \dirname(__DIR__);
    }
}
