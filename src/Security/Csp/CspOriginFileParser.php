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
 * @internal
 */
final readonly class CspOriginFileParser implements CspOriginFileParserInterface
{
    public function __construct(
        private CspOriginValidator $validator
    ) {
    }

    public function extractOriginsFromFiles(array $filePaths): array
    {
        $origins = [];

        foreach ($filePaths as $filePath) {
            $fileOrigins = $this->extractOriginsFromFile($filePath);
            $origins = array_merge($origins, $fileOrigins);
        }

        return array_unique($this->validator->validateOrigins($origins));
    }

    public function extractOriginsFromContent(string $content): array
    {
        $origins = [];

        $pattern = '/([a-z][a-z0-9+.-]*):\/\/([^\/\'"?#\s]+)/i';

        if (preg_match_all($pattern, $content, $matches, PREG_SET_ORDER)) {
            foreach ($matches as $match) {
                $protocol = $match[1];
                $host = $match[2];
                $origins[] = $protocol . '://' . $host;
            }
        }

        return array_unique($this->validator->validateOrigins($origins));
    }

    /**
     * @return string[]
     */
    private function extractOriginsFromFile(string $filePath): array
    {
        if (!file_exists($filePath) || !is_readable($filePath)) {
            return [];
        }

        $content = file_get_contents($filePath);
        if ($content === false) {
            return [];
        }

        return $this->extractOriginsFromContent($content);
    }
}
