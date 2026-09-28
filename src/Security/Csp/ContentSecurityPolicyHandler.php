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

use Psr\Log\LoggerAwareInterface;
use Psr\Log\LoggerAwareTrait;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * Holds the configured policy only; each response is built on a clone, so nothing from one
 * request reaches the next in a long-running worker. The nonce lives on the main request.
 *
 * @internal
 */
final class ContentSecurityPolicyHandler implements ContentSecurityPolicyHandlerInterface, LoggerAwareInterface
{
    use LoggerAwareTrait;

    private const NONCE_ATTRIBUTE = '_pimcore_studio_csp_nonce';

    private const NONCE_PLACEHOLDER = '{nonce}';

    private ?string $nonce = null;

    private const SELF = "'self'";

    private array $allowedUrls = [
        self::CONNECT_OPT => [
            'https://license.pimcore.com/', // Statistics
            'https://nominatim.openstreetmap.org/', // CoreBundle geocoding_url_template
        ],
        self::SCRIPT_OPT => [
        ],
        self::FRAME_OPT => [
            'https://www.youtube-nocookie.com/', // Video preview thumbnail for YouTube
            'https://www.dailymotion.com/',      // Video preview thumbnail for Dailymotion
            'https://player.vimeo.com/',         // Video preview thumbnail for Vimeo
        ],
    ];

    public function __construct(
        private readonly bool $cspEnabled,
        private array $cspHeaderOptions = [],
        private readonly ?RequestStack $requestStack = null
    ) {
        $resolver = new OptionsResolver();
        $this->configureOptions($resolver);

        $this->cspHeaderOptions = $resolver->resolve($cspHeaderOptions);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            self::DEFAULT_OPT => self::SELF,
            self::IMG_OPT => '* data: blob:',
            self::MEDIA_OPT => self::SELF . ' data: blob:',
            self::SCRIPT_OPT => self::SELF . " 'nonce-" . self::NONCE_PLACEHOLDER . "' 'unsafe-eval'",
            self::STYLE_OPT => self::SELF . " 'unsafe-inline'",
            self::FRAME_OPT => self::SELF . ' data: blob:',
            self::FRAME_ANCHESTORS => self::SELF,
            self::CONNECT_OPT => self::SELF . ' blob:',
            self::FONT_OPT => self::SELF,
            self::WORKER_OPT => self::SELF . ' blob:',
        ]);
    }

    /**
     * An independent copy for one response; the policy state is arrays and scalars, so no clone shares it.
     */
    public function forResponse(): self
    {
        return clone $this;
    }

    public function getCspHeader(): string
    {
        $cspHeaderOptions = array_map(function ($k, $v) {
            return "$k $v " . $this->getAllowedUrls($k);
        }, array_keys($this->cspHeaderOptions), array_values($this->cspHeaderOptions));

        $header = implode(';', $cspHeaderOptions);

        return str_contains($header, self::NONCE_PLACEHOLDER)
            ? str_replace(self::NONCE_PLACEHOLDER, $this->getNonce(), $header)
            : $header;
    }

    private function getAllowedUrls(string $key, bool $flatten = true): array|string
    {
        if (!$flatten) {
            return $this->allowedUrls[$key] ?? [];
        }

        return isset($this->allowedUrls[$key]) && is_array($this->allowedUrls[$key]) ? implode(' ', $this->allowedUrls[$key]) : '';
    }

    /**
     * @return $this
     */
    public function addAllowedUrls(string $key, array $value): static
    {
        if (!isset($this->allowedUrls[$key])) {
            $this->allowedUrls[$key] = [];
        }

        foreach ($value as $val) {
            $this->allowedUrls[$key][] = $val;
        }

        return $this;
    }

    public function setCspHeader(string $key, string $value): static
    {
        $this->cspHeaderOptions[$key] = $value;

        return $this;
    }

    public function getNonceHtmlAttribute(): string
    {
        return $this->cspEnabled ? ' nonce="' . $this->getNonce() . '"' : '';
    }

    /**
     * One nonce per main request, shared by the templates and the header of that response.
     */
    private function getNonce(): string
    {
        $request = $this->requestStack?->getMainRequest();
        if ($request === null) {
            if ($this->nonce === null) {
                $this->nonce = generateRandomSymfonySecret();
            }

            return $this->nonce;
        }

        if (!$request->attributes->has(self::NONCE_ATTRIBUTE)) {
            $request->attributes->set(self::NONCE_ATTRIBUTE, generateRandomSymfonySecret());
        }

        return (string) $request->attributes->get(self::NONCE_ATTRIBUTE);
    }
}
