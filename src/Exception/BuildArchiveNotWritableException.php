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

namespace Pimcore\Bundle\StudioUiBundle\Exception;

use RuntimeException;

/**
 * Thrown when the frontend build archive needs to be extracted but the target directory is
 * not writable and no build is present to serve — i.e. a read-only deployment where cache
 * warmup did not run while the filesystem was writable. Rare, but surfaced explicitly
 * instead of a generic "entry point not found" error.
 *
 * @internal
 */
final class BuildArchiveNotWritableException extends RuntimeException
{
}
