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

namespace Pimcore\Bundle\StudioUiBundle\EventSubscriber\Csp;

use Pimcore\Bundle\StudioUiBundle\Event\Csp\CspEvent;
use Pimcore\Bundle\StudioUiBundle\Request\StudioRequestMatcher;
use Pimcore\Bundle\StudioUiBundle\Security\Csp\ContentSecurityPolicyHandler;
use Pimcore\Bundle\StudioUiBundle\Security\Csp\ContentSecurityPolicyHandlerInterface;
use Pimcore\Http\RequestHelper;
use Psr\Log\LoggerAwareInterface;
use Psr\Log\LoggerAwareTrait;
use Psr\Log\NullLogger;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Contracts\EventDispatcher\EventDispatcherInterface;

/**
 * @internal
 */
final class CspHeaderSubscriber implements EventSubscriberInterface, LoggerAwareInterface
{
    use LoggerAwareTrait;

    public function __construct(
        private readonly RequestHelper $requestHelper,
        private readonly ContentSecurityPolicyHandlerInterface $contentSecurityPolicyHandler,
        private readonly StudioRequestMatcher $studioRequestMatcher,
        private readonly EventDispatcherInterface $eventDispatcher,
        private readonly bool $cspEnabled,
        private readonly array $excludePaths
    ) {
        $this->logger = new NullLogger();
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::RESPONSE => 'onKernelResponse',
        ];
    }

    public function onKernelResponse(ResponseEvent $event): void
    {
        if (!$this->cspEnabled || !$event->isMainRequest()) {
            return;
        }

        $request = $event->getRequest();

        if (!$this->studioRequestMatcher->matches($request)) {
            return;
        }

        if ($this->requestHelper->isFrontendRequestByAdmin($request)) {
            return;
        }

        if (!empty($this->excludePaths)) {
            $requestUri = $request->getRequestUri();
            foreach ($this->excludePaths as $path) {
                if (@preg_match($path, $requestUri)) {
                    $this->logger->debug('CSP excluded for path', ['path' => $requestUri, 'pattern' => $path]);

                    return;
                }
            }
        }

        $response = $event->getResponse();

        // a copy per response so additions never reach the next one in a worker; only the default
        // handler is known to copy cleanly, a decorated one is shared as before
        $handler = $this->contentSecurityPolicyHandler;
        $policy = $handler instanceof ContentSecurityPolicyHandler ? $handler->forResponse() : $handler;
        $this->addBuildRemoteOrigins($request, $policy, $this->isHtml($response));

        $cspHeader = $policy->getCspHeader();

        $response->headers->set('Content-Security-Policy', $cspHeader);

        $this->logger->debug('CSP header set', ['header' => $cspHeader]);
    }

    private function isHtml(Response $response): bool
    {
        // 204 and 304 carry no page; a nonce-protected page is never served from a 304
        if ($response->isEmpty()) {
            return false;
        }

        $contentType = $response->headers->get('Content-Type');

        // without a content type yet, Symfony prepares the response as HTML
        return $contentType === null || stripos($contentType, 'html') !== false;
    }

    private function addBuildRemoteOrigins(
        \Symfony\Component\HttpFoundation\Request $request,
        ContentSecurityPolicyHandlerInterface $policy,
        bool $htmlResponse
    ): void {
        $cspEvent = new CspEvent($request, $policy, $htmlResponse);
        $this->eventDispatcher->dispatch($cspEvent);

        $allOrigins = $cspEvent->getAdditionalBuildOrigins();

        if (empty($allOrigins)) {
            $this->logger->debug('No additional CSP origins added by subscribers');

            return;
        }

        $this->logger->debug('Adding CSP origins', ['origins' => $allOrigins, 'count' => count($allOrigins)]);

        $webSocketOrigins = $this->generateWebSocketOrigins($allOrigins);

        $policy->addAllowedUrls(ContentSecurityPolicyHandlerInterface::SCRIPT_OPT, $allOrigins);
        $policy->addAllowedUrls(ContentSecurityPolicyHandlerInterface::STYLE_OPT, $allOrigins);
        $policy->addAllowedUrls(ContentSecurityPolicyHandlerInterface::FONT_OPT, $allOrigins);

        $policy->addAllowedUrls(
            ContentSecurityPolicyHandlerInterface::CONNECT_OPT,
            array_merge($allOrigins, $webSocketOrigins)
        );

        if (!empty($webSocketOrigins)) {
            $this->logger->debug('Generated WebSocket origins for HMR', ['websocket_origins' => $webSocketOrigins]);
        }
    }

    /**
     * Generate WebSocket origins from HTTP origins for HMR support
     *
     * @param string[] $httpOrigins
     *
     * @return string[]
     */
    private function generateWebSocketOrigins(array $httpOrigins): array
    {
        $webSocketOrigins = [];

        foreach ($httpOrigins as $origin) {
            if (str_starts_with($origin, 'http://')) {
                $webSocketOrigins[] = str_replace('http://', 'ws://', $origin);
            } elseif (str_starts_with($origin, 'https://')) {
                $webSocketOrigins[] = str_replace('https://', 'wss://', $origin);
            }
        }

        return $webSocketOrigins;
    }
}
