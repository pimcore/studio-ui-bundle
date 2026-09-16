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

namespace Pimcore\Bundle\StudioUiBundle\Tests\Unit\EventSubscriber\Security;

use Codeception\Test\Unit;
use Pimcore\Bundle\StudioUiBundle\EventSubscriber\Security\OAuthConsentSecurityHeadersSubscriber;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ResponseEvent;
use Symfony\Component\HttpKernel\HttpKernelInterface;
use Symfony\Component\HttpKernel\KernelEvents;

class OAuthConsentSecurityHeadersSubscriberTest extends Unit
{
    private const STUDIO_URL_PATH = '/pimcore-studio';

    private const CONSENT_PATH = '/pimcore-studio/oauth/consent';

    private const CSP_HEADER = 'Content-Security-Policy';

    private const FRAME_ANCESTORS_NONE = "frame-ancestors 'none'";

    private const REFERRER_POLICY_HEADER = 'Referrer-Policy';

    public function testRunsAfterEveryCspWritingListener(): void
    {
        // CspHeaderSubscriber (priority 0) and Symfony's web profiler (-128) both replace the CSP
        // header, so this guard has to run after them or its policy would be dropped.
        $events = OAuthConsentSecurityHeadersSubscriber::getSubscribedEvents();

        [$method, $priority] = $events[KernelEvents::RESPONSE];

        $this->assertSame('onKernelResponse', $method);
        $this->assertLessThan(-128, $priority);
    }

    public function testDeniesFramingWhenCspIsDisabled(): void
    {
        // The point of the guard: no CSP header on the response at all, because csp_header is
        // disabled or the path is excluded.
        $response = $this->handle(self::CONSENT_PATH);

        $this->assertSame('DENY', $response->headers->get('X-Frame-Options'));
        $this->assertSame([self::FRAME_ANCESTORS_NONE], $response->headers->all(self::CSP_HEADER));
    }

    /**
     * The consent address carries the authorization id, and this is the screen a logged out user
     * signs in on, including through an external identity provider - a navigation to another
     * origin. `same-origin` is what keeps that address out of the request to the provider.
     *
     * Not `no-referrer`: the OpenID Connect login returns the user here by reading the Referer of
     * a same-origin request, which `same-origin` still sends in full.
     */
    public function testKeepsTheConsentAddressFromReachingAnotherOrigin(): void
    {
        $response = $this->handle(self::CONSENT_PATH);

        $this->assertSame('same-origin', $response->headers->get(self::REFERRER_POLICY_HEADER));
    }

    /**
     * A browser takes the last Referrer-Policy header it can parse rather than intersecting them,
     * so appending would leave the effective policy dependent on listener order.
     */
    public function testReplacesAReferrerPolicyAlreadyOnTheResponse(): void
    {
        $existing = new Response();
        $existing->headers->set(self::REFERRER_POLICY_HEADER, 'unsafe-url');

        $response = $this->handle(self::CONSENT_PATH, $existing);

        $this->assertSame(['same-origin'], $response->headers->all(self::REFERRER_POLICY_HEADER));
    }

    public function testTightensAnExistingCspPolicyInsteadOfReplacingIt(): void
    {
        $existing = "default-src 'self';frame-ancestors 'self'";

        // Simulates CspHeaderSubscriber having already run.
        $cspResponse = new Response();
        $cspResponse->headers->set(self::CSP_HEADER, $existing);

        $response = $this->handle(self::CONSENT_PATH, $cspResponse);

        // Both policies are sent; a browser enforces every one of them, so the intersection
        // denies framing while the handler's own policy stays untouched.
        $this->assertSame([$existing, self::FRAME_ANCESTORS_NONE], $response->headers->all(self::CSP_HEADER));
        $this->assertSame('DENY', $response->headers->get('X-Frame-Options'));
    }

    public function testToleratesATrailingSlash(): void
    {
        $response = $this->handle(self::CONSENT_PATH . '/');

        $this->assertSame('DENY', $response->headers->get('X-Frame-Options'));
    }

    public function testHonoursACustomStudioUrlPath(): void
    {
        $response = $this->handle('/backend/oauth/consent', null, '/backend');

        $this->assertSame('DENY', $response->headers->get('X-Frame-Options'));
    }

    /**
     * Studio frames same-origin routes of its own (the image editor, the version diff), so the
     * guard must stay scoped to the consent screen.
     */
    public function testLeavesOtherRoutesAlone(): void
    {
        foreach ([
            self::STUDIO_URL_PATH,
            self::STUDIO_URL_PATH . '/login',
            self::STUDIO_URL_PATH . '/api/image-editor',
            self::STUDIO_URL_PATH . '/oauth/consent-other',
            '/oauth/consent',
        ] as $path) {
            $response = $this->handle($path);

            $this->assertFalse($response->headers->has('X-Frame-Options'), $path);
            $this->assertFalse($response->headers->has(self::CSP_HEADER), $path);
            $this->assertFalse($response->headers->has(self::REFERRER_POLICY_HEADER), $path);
        }
    }

    /**
     * The router matches on the decoded path, so a percent-encoded spelling of the consent path
     * reaches the same controller and must not slip past the guard.
     */
    public function testGuardsPercentEncodedSpellingsOfTheConsentPath(): void
    {
        foreach ([
            'single encoded character' => '/pimcore-studio/oauth/%63onsent',
            'fully encoded segment' => '/pimcore-studio/oauth/%63%6f%6e%73%65%6e%74',
            'encoded separator' => '/pimcore-studio/oauth%2Fconsent',
            'encoded in both segments' => '/pimcore-studio/%6fauth/%63onsent',
        ] as $label => $path) {
            $response = $this->handle($path);

            $this->assertSame('DENY', $response->headers->get('X-Frame-Options'), $label);
            $this->assertSame(
                [self::FRAME_ANCESTORS_NONE],
                $response->headers->all(self::CSP_HEADER),
                $label
            );
        }
    }

    /**
     * The guard claims exactly what the router routes to the consent screen, no more. Decoding
     * happens once: "%2563onsent" decodes to "%63onsent", which the router 404s. Route matching
     * is also case sensitive, so an uppercase spelling is not the consent screen either.
     */
    public function testDoesNotClaimPathsTheRouterDoesNotRouteHere(): void
    {
        foreach ([
            'double encoded' => '/pimcore-studio/oauth/%2563onsent',
            'uppercase' => '/pimcore-studio/oauth/CONSENT',
            'encoded uppercase' => '/pimcore-studio/oauth/%43ONSENT',
        ] as $label => $path) {
            $response = $this->handle($path);

            $this->assertFalse($response->headers->has('X-Frame-Options'), $label);
            $this->assertFalse($response->headers->has(self::CSP_HEADER), $label);
        }
    }

    public function testIgnoresSubRequests(): void
    {
        $response = $this->handle(self::CONSENT_PATH, null, self::STUDIO_URL_PATH, HttpKernelInterface::SUB_REQUEST);

        $this->assertFalse($response->headers->has('X-Frame-Options'));
    }

    private function handle(
        string $path,
        ?Response $response = null,
        string $studioUrlPath = self::STUDIO_URL_PATH,
        int $requestType = HttpKernelInterface::MAIN_REQUEST
    ): Response {
        $response ??= new Response();

        $event = new ResponseEvent(
            $this->kernel(),
            Request::create($path),
            $requestType,
            $response
        );

        (new OAuthConsentSecurityHeadersSubscriber($studioUrlPath))->onKernelResponse($event);

        return $event->getResponse();
    }

    private function kernel(): HttpKernelInterface
    {
        return new class() implements HttpKernelInterface {
            public function handle(
                Request $request,
                int $type = self::MAIN_REQUEST,
                bool $catch = true
            ): Response {
                return new Response();
            }
        };
    }
}
