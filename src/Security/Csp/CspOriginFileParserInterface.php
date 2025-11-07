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

namespace Pimcore\Bundle\StudioUiBundle\Security\Csp;

/**
 * Service for parsing files and extracting CSP origins from their content.
 * Useful for parsing webpack build files, remote entries, or any other files
 * that contain URLs that need to be allowed in CSP directives.
 */
interface CspOriginFileParserInterface
{
    /**
     * Extract origins from a list of file paths.
     *
     * @param string[] $filePaths Absolute paths to files to scan
     *
     * @return string[] Array of unique origins found (e.g., ['http://localhost:3030', 'https://cdn.example.com'])
     */
    public function extractOriginsFromFiles(array $filePaths): array;

    /**
     * Extract origins from text content.
     *
     * @param string $content Content to scan for URLs
     *
     * @return string[] Array of unique origins found
     */
    public function extractOriginsFromContent(string $content): array;
}
