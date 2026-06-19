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
 * Reusable implementation for entry point providers whose frontend ships as a committed
 * archive. Implements {@see BuildArchiveProviderInterface::getBuildArchive()} and the
 * {@see \Pimcore\Bundle\StudioUiBundle\Webpack\WebpackEntryPointProviderInterface::getEntryPointsJsonLocations()}
 * glob, extracting the archive on demand first (a no-op in read-only production).
 *
 * The using class only has to supply its own paths via {@see buildArchive()}.
 *
 * @internal
 */
trait BuildArchiveExtractionTrait
{
    abstract protected function buildArchive(): BuildArchive;

    public function getBuildArchive(): ?BuildArchive
    {
        return $this->buildArchive();
    }

    public function getEntryPointsJsonLocations(): array
    {
        $archive = $this->buildArchive();

        (new BuildArchiveExtractor())->ensureExtracted($archive->archiveGlob, $archive->targetDir);

        return glob($archive->targetDir . '/*/entrypoints.json') ?: [];
    }
}
