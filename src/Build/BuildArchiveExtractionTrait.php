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

use Symfony\Contracts\Service\Attribute\Required;

/**
 * Reusable implementation for entry point providers whose frontend ships as a committed
 * archive. Implements {@see BuildArchiveProviderInterface::getBuildArchive()} and the
 * {@see \Pimcore\Bundle\StudioUiBundle\Webpack\WebpackEntryPointProviderInterface::getEntryPointsJsonLocations()}
 * glob, extracting the archive on demand first (a no-op in read-only production).
 *
 * The using class only has to supply its own paths via {@see buildArchive()}. The extractor
 * is injected via #[Required] setter autowiring, so the using provider must be an autowired
 * service (the studio providers are).
 *
 * @internal
 */
trait BuildArchiveExtractionTrait
{
    private BuildArchiveExtractor $buildArchiveExtractor;

    #[Required]
    public function setBuildArchiveExtractor(BuildArchiveExtractor $buildArchiveExtractor): void
    {
        $this->buildArchiveExtractor = $buildArchiveExtractor;
    }

    abstract protected function buildArchive(): BuildArchive;

    public function getBuildArchive(): ?BuildArchive
    {
        return $this->buildArchive();
    }

    /**
     * @throws \Pimcore\Bundle\StudioUiBundle\Exception\BuildArchiveNotWritableException
     *     if the build must be extracted but the target is read-only and no build is present
     */
    public function getEntryPointsJsonLocations(): array
    {
        $archive = $this->buildArchive();

        $this->buildArchiveExtractor->ensureExtracted($archive->archiveGlob, $archive->targetDir);

        return $this->buildArchiveExtractor->entryPointLocations($archive->targetDir);
    }
}
