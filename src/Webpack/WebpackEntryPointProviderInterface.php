<?php
declare(strict_types=1);

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