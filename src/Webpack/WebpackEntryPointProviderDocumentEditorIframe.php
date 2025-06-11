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

/**
 * @internal
 */
final class WebpackEntryPointProviderDocumentEditorIframe implements WebpackEntryPointProviderInterface
{
    public function getEntryPointsJsonLocations(): array
    {
        return glob(__DIR__ . '/../../public/build/*/entrypoints.json');
    }

    public function getEntryPoints(): array
    {
        return ['exposeRemote', 'documentEditorIframe'];
    }

    public function getOptionalEntryPoints(): array
    {
        return [];
    }

}
