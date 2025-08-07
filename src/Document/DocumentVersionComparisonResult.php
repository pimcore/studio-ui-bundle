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

namespace Pimcore\Bundle\StudioUiBundle\Document;

/**
 * @internal
 */
final readonly class DocumentVersionComparisonResult
{
    public function __construct(
        public ?string $image = null,
        public ?string $image1 = null,
        public ?string $image2 = null,
    ) {
    }

    public function hasSingleImage(): bool
    {
        return $this->image !== null;
    }

    public function hasSeparateImages(): bool
    {
        return $this->image1 !== null && $this->image2 !== null;
    }
}
