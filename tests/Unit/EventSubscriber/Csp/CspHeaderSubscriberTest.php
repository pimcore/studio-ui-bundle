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
use Pimcore\Http\RequestHelper;
use Symfony\Component\EventDispatcher\EventDispatcher;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ResponseEvent;
use Symfony\Component\HttpKernel\HttpKernelInterface;

class CspHeaderSubscriberTest extends Unit
{
    private const BUILD_ORIGIN = 'https://cdn.example.com';

    private const PAGE = '<html lang="en"></html>';

    private int $cspEvents = 0;

    public function testAnApiResponseGetsTheHeaderWithoutAskingForBuildOrigins(): void
    {
        $header = $this->handle(new JsonResponse(['ok' => true]), '/pimcore-studio/api/user/current-user-information');

        $this->assertSame(0, $this->cspEvents);
        $this->assertStringContainsString("frame-ancestors 'self'", $header);
        $this->assertStringNotContainsString(self::BUILD_ORIGIN, $header);
    }

    public function testAStudioPageGetsTheBuildOrigins(): void
    {
        $response = new Response(self::PAGE);
        $response->headers->set('Content-Type', 'text/html; charset=UTF-8');

        $header = $this->handle($response, '/pimcore-studio/');

        $this->assertSame(1, $this->cspEvents);
        $this->assertStringContainsString(self::BUILD_ORIGIN, $header);
    }

    public function testAResponseWithoutAContentTypeIsTreatedAsAPage(): void
    {
        $header = $this->handle(new Response(self::PAGE), '/pimcore-studio/');

        $this->assertSame(1, $this->cspEvents);
        $this->assertStringContainsString(self::BUILD_ORIGIN, $header);
    }

    private function handle(Response $response, string $path): string
    {
        $dispatcher = new EventDispatcher();
        $dispatcher->addListener(CspEvent::class, function (CspEvent $event): void {
            $this->cspEvents++;
            $event->addBuildOrigins([self::BUILD_ORIGIN]);
        });

        $requestHelper = $this->createMock(RequestHelper::class);
        $requestHelper->method('isFrontendRequestByAdmin')->willReturn(false);

        $subscriber = new CspHeaderSubscriber(
            $requestHelper,
            new ContentSecurityPolicyHandler(true),
            new StudioRequestMatcher('/pimcore-studio'),
            $dispatcher,
            true,
            []
        );

        $subscriber->onKernelResponse(new ResponseEvent(
            $this->createMock(HttpKernelInterface::class),
            Request::create($path),
            HttpKernelInterface::MAIN_REQUEST,
            $response
        ));

        return (string) $response->headers->get('Content-Security-Policy');
    }
}
