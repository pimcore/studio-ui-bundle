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
use Pimcore\Bundle\StudioUiBundle\EventSubscriber\Security\OAuthConsentFrameGuardSubscriber;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ResponseEvent;
use Symfony\Component\HttpKernel\HttpKernelInterface;
use Symfony\Component\HttpKernel\KernelEvents;

class OAuthConsentFrameGuardSubscriberTest extends Unit
{
    private const STUDIO_URL_PATH = '/pimcore-studio';

    private const CONSENT_PATH = '/pimcore-studio/oauth/consent';

    private const CSP_HEADER = 'Content-Security-Policy';

    private const FRAME_ANCESTORS_NONE = "frame-ancestors 'none'";

    public function testRunsAfterEveryCspWritingListener(): void
    {
        // CspHeaderSubscriber (priority 0) and Symfony's web profiler (-128) both replace the CSP
        // header, so this guard has to run after them or its policy would be dropped.
        $events = OAuthConsentFrameGuardSubscriber::getSubscribedEvents();

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

        (new OAuthConsentFrameGuardSubscriber($studioUrlPath))->onKernelResponse($event);

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
