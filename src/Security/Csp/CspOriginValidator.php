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
 * Validates and sanitizes CSP origins to prevent header injection attacks.
 * 
 * @internal
 */
final class CspOriginValidator
{
    /**
     * Validates and sanitizes an array of origins.
     * Removes any origins that could be used for CSP header injection.
     * 
     * @param string[] $origins
     * @return string[] Valid origins only
     */
    public function validateOrigins(array $origins): array
    {
        $validOrigins = [];
        
        foreach ($origins as $origin) {
            if ($this->isValidOrigin($origin)) {
                $validOrigins[] = $origin;
            }
        }
        
        return $validOrigins;
    }

    /**
     * Validates a single origin to ensure it's safe for CSP headers.
     * 
     * Checks for:
     * - No newlines (prevents header injection)
     * - No quotes (prevents breaking CSP syntax)
     * - No semicolons (prevents adding extra directives)
     * - Valid protocol and host format
     * - No whitespace
     * 
     * @param string $origin
     * @return bool
     */
    private function isValidOrigin(string $origin): bool
    {
        // Trim whitespace
        $origin = trim($origin);
        
        // Empty string is not valid
        if ($origin === '') {
            return false;
        }
        
        // Check for dangerous characters that could be used for header injection
        if (str_contains($origin, "\n") || 
            str_contains($origin, "\r") || 
            str_contains($origin, "'") || 
            str_contains($origin, '"') || 
            str_contains($origin, ';') ||
            str_contains($origin, ' ')) {
            return false;
        }
        
        // Validate format: protocol://host (with optional port)
        // Protocol: alphanumeric, +, -, .
        // Host: alphanumeric, -, . and optional :port
        $pattern = '/^[a-z][a-z0-9+.-]*:\/\/[a-z0-9.-]+(:[0-9]+)?$/i';
        
        return preg_match($pattern, $origin) === 1;
    }
}
