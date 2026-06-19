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

/**
 * Describes the committed frontend build archive(s) and where their contents must be
 * reconstructed so they can be served at the URL baked into the build.
 *
 * `archiveGlob` matches one or more `build-<id>.zip` files; the newest one is used, so a
 * leftover older archive never wins.
 *
 * @internal
 */
final readonly class BuildArchive
{
    public function __construct(
        public string $archiveGlob,
        public string $targetDir,
    ) {
    }
}
