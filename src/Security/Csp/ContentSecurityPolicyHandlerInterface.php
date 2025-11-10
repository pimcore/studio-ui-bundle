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
 * Service for managing Content Security Policy headers and nonces.
 *
 * This interface provides methods to generate CSP headers, manage allowed URLs
 * for different CSP directives, and handle nonce generation for inline scripts.
 */
interface ContentSecurityPolicyHandlerInterface
{
    public const DEFAULT_OPT = 'default-src';

    public const IMG_OPT = 'img-src';

    public const SCRIPT_OPT = 'script-src';

    public const STYLE_OPT = 'style-src';

    public const CONNECT_OPT = 'connect-src';

    public const FONT_OPT = 'font-src';

    public const MEDIA_OPT = 'media-src';

    public const FRAME_OPT = 'frame-src';

    public const FRAME_ANCHESTORS = 'frame-ancestors';

    public const WORKER_OPT = 'worker-src';

    /**
     * Generates the complete CSP header string.
     *
     * @return string The CSP header value
     */
    public function getCspHeader(): string;

    /**
     * Adds allowed URLs to a specific CSP directive.
     *
     * @param string $key The CSP directive (e.g., 'script-src', 'style-src', 'connect-src')
     * @param array<string> $value Array of URLs to allow
     *
     * @return static Returns $this for method chaining
     */
    public function addAllowedUrls(string $key, array $value): static;

    /**
     * Sets a CSP header directive value.
     *
     * @param string $key The CSP directive (e.g., 'script-src', 'style-src', 'connect-src')
     * @param string $value The directive value
     *
     * @return static Returns $this for method chaining
     */
    public function setCspHeader(string $key, string $value): static;

    /**
     * Gets the nonce HTML attribute for inline scripts/styles.
     *
     * Returns ' nonce="..."' if CSP is enabled, or empty string if disabled.
     * This should be used in templates to add nonce attributes to script tags.
     *
     * @return string The nonce HTML attribute
     */
    public function getNonceHtmlAttribute(): string;
}
