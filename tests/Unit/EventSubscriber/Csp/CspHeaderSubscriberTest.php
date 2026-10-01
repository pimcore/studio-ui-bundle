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

namespace Pimcore\Bundle\StudioUiBundle\Tests\Unit\EventSubscriber\Csp;

use Codeception\Test\Unit;
use Pimcore\Bundle\StudioUiBundle\Event\Csp\CspEvent;
use Pimcore\Bundle\StudioUiBundle\EventSubscriber\Csp\CspHeaderSubscriber;
use Pimcore\Bundle\StudioUiBundle\Request\StudioRequestMatcher;
use Pimcore\Bundle\StudioUiBundle\Security\Csp\ContentSecurityPolicyHandler;
use Pimcore\Bundle\StudioUiBundle\Security\Csp\ContentSecurityPolicyHandlerInterface;
use Pimcore\Http\RequestHelper;
use Symfony\Component\EventDispatcher\EventDispatcher;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ResponseEvent;
use Symfony\Component\HttpKernel\HttpKernelInterface;

class CspHeaderSubscriberTest extends Unit
{
    private const BUILD_ORIGIN = 'https://cdn.example.com';

    private const PARTNER = 'https://partner.example.com';

    private const PAGE_PATH = '/pimcore-studio/';

    private const HTML = 'text/html';

    private const API_PATH = '/pimcore-studio/api/user/current-user-information';

    /**
     * @var bool[]
     */
    private array $pageFlags = [];

    private int $responses = 0;

    private RequestStack $requestStack;

    private ContentSecurityPolicyHandler $handler;

    private CspHeaderSubscriber $subscriber;

    private EventDispatcher $dispatcher;

    public function _before(): void
    {
        $this->requestStack = new RequestStack();
        $this->handler = new ContentSecurityPolicyHandler(true, [], $this->requestStack);

        $this->dispatcher = new EventDispatcher();
        $this->dispatcher->addListener(CspEvent::class, function (CspEvent $event): void {
            $this->pageFlags[] = $event->isHtmlResponse();
            // what Studio's build origin listeners do
            if ($event->isHtmlResponse()) {
                $event->addBuildOrigins([self::BUILD_ORIGIN]);
            }
            // a listener changing a directive for one response only
            if (++$this->responses === 1) {
                $event->getCspHandler()->addAllowedUrls(ContentSecurityPolicyHandlerInterface::FRAME_ANCHESTORS, [
                    self::PARTNER,
                ]);
            }
        });

        $this->subscriber = $this->subscriberFor($this->handler);
    }

    public function testEveryResponseDispatchesTheEventAndTellsWhetherItIsAPage(): void
    {
        $this->handle(new JsonResponse(['ok' => true]), self::API_PATH);
        $this->handle($this->page('text/html; charset=UTF-8'), self::PAGE_PATH);
        $this->handle(new Response('<html lang="en"></html>'), self::PAGE_PATH);
        $this->handle($this->page('Text/HTML; charset=UTF-8'), self::PAGE_PATH);
        $this->handle(new Response(null, Response::HTTP_NO_CONTENT), self::API_PATH);
        $this->handle(new Response(null, Response::HTTP_NOT_MODIFIED), self::API_PATH);

        $this->assertSame([false, true, true, true, false, false], $this->pageFlags);
    }

    public function testAnApiResponseGetsNoBuildOrigins(): void
    {
        $this->handle($this->page(self::HTML), self::PAGE_PATH);
        $api = $this->handle(new JsonResponse(['ok' => true]), self::API_PATH);

        $this->assertStringNotContainsString(self::BUILD_ORIGIN, $api);
        $this->assertStringContainsString("frame-ancestors 'self'", $api);
    }

    public function testNothingFromOneResponseReachesTheNext(): void
    {
        $page = $this->handle($this->page(self::HTML), self::PAGE_PATH);
        $api = $this->handle(new JsonResponse(['ok' => true]), self::API_PATH);

        $this->assertStringContainsString(self::BUILD_ORIGIN, $page);
        $this->assertStringContainsString(self::PARTNER, $page);
        $this->assertStringNotContainsString(self::BUILD_ORIGIN, $api);
        $this->assertStringNotContainsString(self::PARTNER, $api);
        $this->assertStringNotContainsString(self::BUILD_ORIGIN, $this->handler->getCspHeader());
    }

    public function testTheHeaderDoesNotGrowOverManyResponses(): void
    {
        $headers = [];
        for ($i = 0; $i < 5; $i++) {
            $header = $this->handle($this->page(self::HTML), self::PAGE_PATH);
            $headers[] = preg_replace("/'nonce-[^']+'/", "'nonce'", $header);
        }

        $this->assertCount(1, array_unique(array_slice($headers, 1)));
    }

    public function testEachRequestGetsItsOwnNonceMatchingItsTemplate(): void
    {
        $nonces = [];
        for ($i = 0; $i < 2; $i++) {
            $request = Request::create(self::PAGE_PATH);
            $this->requestStack->push($request);

            // the template renders the nonce through the shared handler, before the response is built
            preg_match('/nonce="([^"]+)"/', $this->handler->getNonceHtmlAttribute(), $match);
            $header = $this->respond($request, $this->page(self::HTML));
            $this->requestStack->pop();

            $this->assertStringContainsString("'nonce-" . $match[1] . "'", $header);
            $nonces[] = $match[1];
        }

        $this->assertNotSame($nonces[0], $nonces[1]);
    }

    public function testADecoratedHandlerThatCannotBeClonedStillGetsItsHeader(): void
    {
        $decorated = new class($this->handler) implements ContentSecurityPolicyHandlerInterface {
            public function __construct(private readonly ContentSecurityPolicyHandlerInterface $inner)
            {
            }

            private function __clone()
            {
                // a decorator may forbid cloning; the subscriber must not rely on it
            }

            public function getCspHeader(): string
            {
                return $this->inner->getCspHeader();
            }

            public function addAllowedUrls(string $key, array $value): static
            {
                $this->inner->addAllowedUrls($key, $value);

                return $this;
            }

            public function setCspHeader(string $key, string $value): static
            {
                $this->inner->setCspHeader($key, $value);

                return $this;
            }

            public function getNonceHtmlAttribute(): string
            {
                return $this->inner->getNonceHtmlAttribute();
            }
        };
        $this->subscriber = $this->subscriberFor($decorated);

        $header = $this->handle($this->page(self::HTML), self::PAGE_PATH);

        $this->assertStringContainsString(self::BUILD_ORIGIN, $header);
        $this->assertStringContainsString("script-src 'self' 'nonce-", $header);
    }

    private function subscriberFor(ContentSecurityPolicyHandlerInterface $handler): CspHeaderSubscriber
    {
        $requestHelper = $this->createMock(RequestHelper::class);
        $requestHelper->method('isFrontendRequestByAdmin')->willReturn(false);

        return new CspHeaderSubscriber(
            $requestHelper,
            $handler,
            new StudioRequestMatcher('/pimcore-studio'),
            $this->dispatcher,
            true,
            []
        );
    }

    private function page(string $contentType): Response
    {
        $response = new Response('<html lang="en"></html>');
        $response->headers->set('Content-Type', $contentType);

        return $response;
    }

    private function handle(Response $response, string $path): string
    {
        $request = Request::create($path);
        $this->requestStack->push($request);
        $header = $this->respond($request, $response);
        $this->requestStack->pop();

        return $header;
    }

    private function respond(Request $request, Response $response): string
    {
        $this->subscriber->onKernelResponse(new ResponseEvent(
            $this->createMock(HttpKernelInterface::class),
            $request,
            HttpKernelInterface::MAIN_REQUEST,
            $response
        ));

        return (string) $response->headers->get('Content-Security-Policy');
    }
}
