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

namespace Pimcore\Bundle\StudioUiBundle\EventSubscriber\Security;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;

/**
 * Forbids framing of the OAuth consent screen.
 *
 * The consent approval is a POST without a CSRF token: its safety rests on the request being
 * same-origin. A framed consent screen with an overlay over the Allow button therefore produces
 * a genuine approval, and the unguessable authorization id is no protection - an attacker mints
 * their own pending authorization through the public authorize endpoint and so knows the URL to
 * frame.
 *
 * The bundle's CSP already sends frame-ancestors, but only while csp_header.enabled is true and
 * only for paths outside csp_header.exclude_paths. This guard is deliberately independent of
 * both, because the consent screen must never be framed regardless of how CSP is configured.
 *
 * @internal
 */
final class OAuthConsentFrameGuardSubscriber implements EventSubscriberInterface
{
    private const CONSENT_SUB_PATH = '/oauth/consent';

    private const CSP_HEADER = 'Content-Security-Policy';

    /**
     * Late enough to follow every listener that writes a CSP header, early enough to stay ahead
     * of the session listener (-1000).
     */
    private const PRIORITY = -256;

    /**
     * Frame-ancestors rather than X-Frame-Options is what a modern browser honours when both are
     * present, so the CSP directive is what actually enforces this; X-Frame-Options covers the
     * rest.
     */
    private const FRAME_ANCESTORS_NONE = "frame-ancestors 'none'";

    private readonly string $consentPath;

    public function __construct(string $studioUrlPath)
    {
        $this->consentPath = rtrim($studioUrlPath, '/') . self::CONSENT_SUB_PATH;
    }

    public static function getSubscribedEvents(): array
    {
        // Runs after every listener that writes Content-Security-Policy - CspHeaderSubscriber at
        // priority 0, and Symfony's web profiler at -128, which re-serialises the whole header to
        // add its nonces and would otherwise drop the policy added here - so this is the last
        // word on how the consent screen may be framed.
        return [
            KernelEvents::RESPONSE => ['onKernelResponse', self::PRIORITY],
        ];
    }

    public function onKernelResponse(ResponseEvent $event): void
    {
        if (!$event->isMainRequest()) {
            return;
        }

        if (rtrim($event->getRequest()->getPathInfo(), '/') !== $this->consentPath) {
            return;
        }

        $this->denyFraming($event->getResponse());
    }

    private function denyFraming(Response $response): void
    {
        $response->headers->set('X-Frame-Options', 'DENY');

        // Appended as a second policy instead of replacing the existing one. Multiple CSP headers
        // are each enforced, so the effective permission is their intersection: this can only
        // tighten the frame-ancestors the CSP handler emits, never widen it, and it needs no
        // knowledge of that policy's contents.
        $response->headers->set(self::CSP_HEADER, self::FRAME_ANCESTORS_NONE, false);
    }
}
