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
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;

/**
 * Response headers the OAuth consent screen needs regardless of how the application is
 * configured: it must not be framed, and its address must not travel to another origin.
 *
 * Framing. The consent approval is a POST without a CSRF token: its safety rests on the request
 * being same-origin. A framed consent screen with an overlay over the Allow button therefore
 * produces a genuine approval, and the unguessable authorization id is no protection - an
 * attacker mints their own pending authorization through the public authorize endpoint and so
 * knows the URL to frame.
 *
 * Referrer. The consent address carries the authorization id, and this screen is where a logged
 * out user signs in, including through an external identity provider - a navigation to another
 * origin made from this page. `same-origin` keeps the full address on requests to this
 * application, which is what the OpenID Connect login reads to return the user here, and sends
 * nothing at all to anyone else. Browsers default to `strict-origin-when-cross-origin`, which
 * already withholds the path and query from another origin; stating the policy means not
 * depending on that default, and covers browsers that still default to sending it in full.
 *
 * The bundle's CSP already sends frame-ancestors, but only while csp_header.enabled is true and
 * only for paths outside csp_header.exclude_paths. This guard is deliberately independent of
 * both, because the consent screen must never be framed regardless of how CSP is configured.
 *
 * @internal
 */
final class OAuthConsentSecurityHeadersSubscriber implements EventSubscriberInterface
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

    private const REFERRER_POLICY_HEADER = 'Referrer-Policy';

    /**
     * Not `no-referrer`: the OpenID Connect login returns the user to the page they came from,
     * and reads that from the Referer of a same-origin request. Withholding it there would land
     * a user who signed in through their provider on the start page instead of back here.
     */
    private const REFERRER_POLICY_SAME_ORIGIN = 'same-origin';

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

        if (!$this->isConsentRequest($event->getRequest())) {
            return;
        }

        $this->applyHeaders($event->getResponse());
    }

    /**
     * Request::getPathInfo() is still percent-encoded, while the router matches on the decoded
     * path (CompiledUrlMatcherTrait::doMatch() calls rawurldecode() on it). Comparing the raw
     * path would let "/oauth/%63onsent" reach the consent controller with this guard skipped.
     *
     * Decoded exactly once, like the router: decoding repeatedly would match paths the router
     * never routes here, and would let "%2563onsent" pass a guard the router does not apply.
     */
    private function isConsentRequest(Request $request): bool
    {
        $path = rawurldecode($request->getPathInfo());

        return rtrim($path, '/') === $this->consentPath;
    }

    private function applyHeaders(Response $response): void
    {
        $response->headers->set('X-Frame-Options', 'DENY');

        // Replaces rather than appends: unlike CSP, a second Referrer-Policy header does not
        // intersect with the first - a browser takes the last value it can parse - so appending
        // would make the effective policy depend on listener order.
        $response->headers->set(self::REFERRER_POLICY_HEADER, self::REFERRER_POLICY_SAME_ORIGIN);

        // Appended as a second policy instead of replacing the existing one. Multiple CSP headers
        // are each enforced, so the effective permission is their intersection: this can only
        // tighten the frame-ancestors the CSP handler emits, never widen it, and it needs no
        // knowledge of that policy's contents.
        $response->headers->set(self::CSP_HEADER, self::FRAME_ANCESTORS_NONE, false);
    }
}
