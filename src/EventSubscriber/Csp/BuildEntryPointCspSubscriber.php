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
use Pimcore\Bundle\StudioUiBundle\Security\Csp\CspOriginFileParserInterface;
use Pimcore\Bundle\StudioUiBundle\Service\StaticResourcesResolver;
use Psr\Log\LoggerAwareInterface;
use Psr\Log\LoggerAwareTrait;
use Psr\Log\NullLogger;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

/**
 * Adds origins from webpack entry points (static CSS/JS resources)
 * to CSP directives.
 *
 * Priority: 50 (runs after BuildRemoteEntryCspSubscriber)
 *
 * @internal
 */
final class BuildEntryPointCspSubscriber implements EventSubscriberInterface, LoggerAwareInterface
{
    use LoggerAwareTrait;

    /**
     * Priority for this subscriber.
     * Lower than BuildRemoteEntryCspSubscriber to ensure remote entries are processed first.
     */
    public const PRIORITY = 50;

    public function __construct(
        private readonly StaticResourcesResolver $staticResourcesResolver,
        private readonly CspOriginFileParserInterface $cspOriginFileParser
    ) {
        $this->logger = new NullLogger();
    }

    public static function getSubscribedEvents(): array
    {
        return [
            CspEvent::class => ['onCspEvent', self::PRIORITY],
        ];
    }

    public function onCspEvent(CspEvent $event): void
    {
        try {
            $origins = $this->extractOriginsFromStaticResources();

            if (!empty($origins)) {
                $this->logger->debug('Extracted origins from static resources', ['origins' => $origins]);
                $event->addBuildOrigins($origins);
            }
        } catch (\Exception $e) {
            $this->logger->warning('Failed to extract origins from static resources', ['exception' => $e->getMessage()]);
            // If extraction fails, continue without static resource origins
        }
    }

    /**
     * @return string[]
     */
    private function extractOriginsFromStaticResources(): array
    {
        $allFiles = array_merge(
            $this->staticResourcesResolver->getStudioCssFiles(),
            $this->staticResourcesResolver->getStudioJsFiles(),
            $this->staticResourcesResolver->getBundleCssFiles(),
            $this->staticResourcesResolver->getBundleJsFiles(),
            $this->staticResourcesResolver->getAdditionalCssFiles(),
            $this->staticResourcesResolver->getAdditionalJsFiles()
        );

        // Use CspOriginFileParser to extract origins from URLs
        $urlsContent = implode("\n", $allFiles);

        return $this->cspOriginFileParser->extractOriginsFromContent($urlsContent);
    }
}
