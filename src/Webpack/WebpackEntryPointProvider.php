<?php
declare(strict_types=1);

namespace Pimcore\Bundle\StudioUiBundle\Webpack;

use Symfony\Component\DependencyInjection\Attribute\AsTaggedItem;

/**
 * @internal
 */
final class WebpackEntryPointProvider implements WebpackEntryPointProviderInterface
{
    public function getEntryPointsJsonLocations(): array
    {
        return glob(__DIR__ . '/../../public/build/*/entrypoints.json');
    }

    public function getEntryPoints(): array
    {
        return ['vendor', 'core-dll', 'main'];
    }

    public function getOptionalEntryPoints(): array
    {
        return ['vendor', 'core-dll'];
    }

}