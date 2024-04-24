<?php
declare(strict_types=1);

namespace Pimcore\Bundle\StudioUiBundle\Extension\Bundle;

interface PimcoreBundleStudioUiInterface
{
    public function getEntryPointsJsonLocation(): string;
}