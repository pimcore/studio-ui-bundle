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

namespace Pimcore\Bundle\StudioUiBundle\Request;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestMatcherInterface;

final readonly class StudioRequestMatcher implements RequestMatcherInterface
{
    public function __construct(
        private string $studioUrlPath
    ) {
    }

    public function matches(Request $request): bool
    {
        return str_starts_with($request->getPathInfo(), $this->studioUrlPath);
    }
}
