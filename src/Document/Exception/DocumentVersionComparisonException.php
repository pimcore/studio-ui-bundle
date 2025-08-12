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

namespace Pimcore\Bundle\StudioUiBundle\Document\Exception;

use Exception;

/**
 * @internal
 */
final class DocumentVersionComparisonException extends Exception
{
    public static function htmlToImageConversionFailed(string $url, string $targetFile): self
    {
        return new self("Failed to convert HTML to image: {$url} -> {$targetFile}");
    }

    public static function imageComparisonFailed(string $fromFile, string $toFile): self
    {
        return new self("Failed to compare images: {$fromFile} vs {$toFile}");
    }

    public static function fileOperationFailed(string $operation, string $file): self
    {
        return new self("File operation '{$operation}' failed for file: {$file}");
    }
}
