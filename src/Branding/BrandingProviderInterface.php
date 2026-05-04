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

namespace Pimcore\Bundle\StudioUiBundle\Branding;

interface BrandingProviderInterface
{
    /**
     * Returns branding data for use in server-side rendering (e.g. the preloader).
     * Values are null when branding is not configured or cannot be resolved.
     *
     * @return array{brandColor: string|null, backgroundShade: string|null, logoUrl: string|null}
     */
    public function getBranding(): array;
}
