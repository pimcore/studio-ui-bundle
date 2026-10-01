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
 * Returned by {@see BuildArchiveProviderInterface::getBuildArchive()}; together with that
 * interface and {@see BuildArchiveExtractionTrait} it is the public contract for bundles that
 * ship their Studio frontend as a committed archive.
 *
 * `archiveGlob` matches the committed `build-<id>.zip`; normally exactly one exists. If
 * several happen to match, the extractor picks one deterministically (the id is a content
 * hash, not a date, so there is no "newest" to choose).
 *
 * `targetDir` is the directory the archive is expanded into. It must be the directory that
 * is publicly served at the asset prefix compiled into the build (e.g. `public/build`, served
 * via `assets:install` as `/bundles/<bundle>/build`). The archive contains one directory per
 * build target, each with its own `entrypoints.json`; a bundle with a single build target
 * typically names it after the build id (e.g. `<build-id>/`), while a bundle with several
 * targets sharing one id (e.g. an SDK and an app build) suffixes each one instead
 * (e.g. `<build-id>-app/`, `<build-id>-sdk/`) — the exact names are whatever the build output
 * used, unchanged by packaging.
 */
final readonly class BuildArchive
{
    public function __construct(
        public string $archiveGlob,
        public string $targetDir,
    ) {
    }
}
