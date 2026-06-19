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

namespace Pimcore\Bundle\StudioUiBundle\Build;

use Pimcore\Bundle\StudioUiBundle\Webpack\WebpackEntryPointProviderInterface;

/**
 * Opt-in contract for entry point providers that ship their compiled frontend as a
 * committed archive instead of an expanded build directory. The cache warmer discovers
 * these providers and extracts their archives while the filesystem is still writable.
 */
interface BuildArchiveProviderInterface extends WebpackEntryPointProviderInterface
{
    public function getBuildArchive(): ?BuildArchive;
}
