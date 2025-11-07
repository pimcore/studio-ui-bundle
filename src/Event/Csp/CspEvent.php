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

namespace Pimcore\Bundle\StudioUiBundle\Event\Csp;

use Pimcore\Bundle\StudioUiBundle\Security\Csp\ContentSecurityPolicyHandlerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Contracts\EventDispatcher\Event;

/**
 * Event dispatched before CSP headers are set, allowing listeners to add additional
 * build origins or modify CSP directives.
 * 
 * Extension developers can subscribe to this event to add their own origins:
 * 
 * ```php
 * use Pimcore\Bundle\StudioUiBundle\Event\Csp\CspEvent;
 * use Symfony\Component\EventDispatcher\EventSubscriberInterface;
 * 
 * final class MyExtensionCspSubscriber implements EventSubscriberInterface
 * {
 *     public static function getSubscribedEvents(): array
 *     {
 *         // Use priority < 50 to run after core subscribers
 *         // Use priority > 100 to run before core subscribers
 *         return [
 *             CspEvent::class => ['onCspEvent', 0],
 *         ];
 *     }
 *     
 *     public function onCspEvent(CspEvent $event): void
 *     {
 *         $event->addBuildOrigins(['https://my-cdn.example.com']);
 *         
 *         // Or modify CSP handler directly
 *         $event->getCspHandler()->addAllowedUrls(
 *             ContentSecurityPolicyHandlerInterface::FONT_OPT,
 *             ['https://fonts.googleapis.com']
 *         );
 *     }
 * }
 * ```
 * 
 * Core subscriber priorities:
 * - BuildRemoteEntryCspSubscriber: 100 (remote entry files)
 * - BuildEntryPointCspSubscriber: 50 (static resources)
 * - Extension subscribers should typically use priority 0 or negative values
 */
final class CspEvent extends Event
{
    private array $additionalBuildOrigins = [];

    public function __construct(
        private readonly Request $request,
        private readonly ContentSecurityPolicyHandlerInterface $cspHandler
    ) {
    }

    public function getRequest(): Request
    {
        return $this->request;
    }

    public function getCspHandler(): ContentSecurityPolicyHandlerInterface
    {
        return $this->cspHandler;
    }

    /**
     * Add additional build origins that should be allowed in CSP directives.
     * These origins will be automatically added to script-src, style-src, and connect-src.
     * 
     * @param string[] $origins Array of origins (e.g., ['http://localhost:3030'])
     */
    public function addBuildOrigins(array $origins): void
    {
        $this->additionalBuildOrigins = array_merge($this->additionalBuildOrigins, $origins);
    }

    /**
     * Get all additional build origins that have been added by event listeners.
     * 
     * @return string[]
     */
    public function getAdditionalBuildOrigins(): array
    {
        return array_unique($this->additionalBuildOrigins);
    }
}
