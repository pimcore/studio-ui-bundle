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

use Symfony\Component\HttpKernel\CacheWarmer\CacheWarmerInterface;

/**
 * Writes the entry point manifests at deploy time, so the first request does not have to.
 *
 * @internal
 */
final readonly class EntryPointCatalogCacheWarmer implements CacheWarmerInterface
{
    /**
     * @param iterable<EntryPointCatalog> $catalogs
     */
    public function __construct(private iterable $catalogs)
    {
    }

    public function isOptional(): bool
    {
        // a cache dir that is read-only at runtime can only get the manifest here
        return false;
    }

    public function warmUp(string $cacheDir, ?string $buildDir = null): array
    {
        foreach ($this->catalogs as $catalog) {
            $catalog->warmUp($cacheDir);
        }

        return [];
    }
}
