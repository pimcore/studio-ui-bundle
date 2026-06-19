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

use Symfony\Component\HttpKernel\CacheWarmer\CacheWarmerInterface;
use Throwable;

/**
 * Extracts every registered build archive during cache warmup. Cache warmup runs as part of
 * Pimcore's composer post-update scripts and every deploy, while vendor is still writable —
 * so this provisions the expanded build before the filesystem goes read-only at runtime.
 *
 * Generic by design: it iterates all tagged entry point providers and acts on the ones that
 * declare an archive, so additional bundles participate without any change here.
 *
 * @internal
 */
final readonly class StudioBuildCacheWarmer implements CacheWarmerInterface
{
    /**
     * @param iterable<object> $entryPointProviders
     */
    public function __construct(
        private iterable $entryPointProviders,
        private BuildArchiveExtractor $extractor,
    ) {
    }

    public function isOptional(): bool
    {
        // Not optional: extraction must run during warmup (the writable deploy phase) rather
        // than be deferred to the read-only-unsafe lazy fallback in production.
        return false;
    }

    public function warmUp(string $cacheDir, ?string $buildDir = null): array
    {
        foreach ($this->entryPointProviders as $provider) {
            if (!$provider instanceof BuildArchiveProviderInterface) {
                continue;
            }

            $archive = $provider->getBuildArchive();
            if ($archive === null) {
                continue;
            }

            try {
                $this->extractor->ensureExtracted($archive->archiveGlob, $archive->targetDir);
            } catch (Throwable) {
                // Extraction is best-effort during warmup; never break cache warmup over it.
            }
        }

        return [];
    }
}
