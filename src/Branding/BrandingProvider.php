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

use Pimcore\Bundle\StudioBackendBundle\Setting\Admin\Service\SettingsServiceInterface;
use Pimcore\Bundle\StudioBackendBundle\Setting\Admin\Service\ThumbnailServiceInterface;
use Throwable;

final readonly class BrandingProvider implements BrandingProviderInterface
{
    public function __construct(
        private SettingsServiceInterface $settingsService,
        private ThumbnailServiceInterface $thumbnailService,
    ) {
    }

    public function getBranding(): array
    {
        try {
            $branding = $this->settingsService->getAdminSettings()->getBranding();
            $brandColor = $branding->getBrandColor();
            $backgroundShade = $branding->getBackgroundShade();
            $logoUrl = $this->thumbnailService->getThumbnails()->getCustomLogo();

            return [
                'brandColor' => $brandColor !== '' ? $brandColor : null,
                'backgroundShade' => $backgroundShade !== '' ? $backgroundShade : null,
                'logoUrl' => $logoUrl,
            ];
        } catch (Throwable) {
            return [
                'brandColor' => null,
                'backgroundShade' => null,
                'logoUrl' => null,
            ];
        }
    }
}
