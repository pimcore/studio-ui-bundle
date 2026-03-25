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

namespace Pimcore\Bundle\StudioUiBundle\AppConfig;

/**
 * Implement this interface and tag your service with
 * `pimcore_studio_ui.app_config_provider` to contribute additional
 * key/value pairs to the `data-app-config` attribute rendered on the
 * Studio UI shell page.
 *
 * Returned arrays are shallow-merged, so each provider should use a
 * unique top-level key.
 */
interface AppConfigProviderInterface
{
    /**
     * Returns an associative array of config values to be merged into
     * the `data-app-config` JSON object.
     *
     * @return array<string, mixed>
     */
    public function getAppConfig(): array;
}
