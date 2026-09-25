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
use Pimcore\Bundle\StudioUiBundle\Webpack\EntryPointCatalog;
use Psr\Log\LoggerAwareInterface;
use Psr\Log\LoggerAwareTrait;
use Psr\Log\NullLogger;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

/**
 * Adds origins from webpack module federation remote entry files (exposeRemote.js)
 * to CSP directives.
 *
 * Priority: 100 (runs early to ensure remote entry origins are added first)
 *
 * @internal
 */
final class BuildRemoteEntryCspSubscriber implements EventSubscriberInterface, LoggerAwareInterface
{
    use LoggerAwareTrait;

    /**
     * Priority for this subscriber.
     * Higher values run earlier. Extensions can use lower priorities to run after core subscribers.
     */
    public const PRIORITY = 100;

    public function __construct(
        private readonly CspOriginFileParserInterface $cspOriginFileParser,
        private readonly EntryPointCatalog $entryPointCatalog
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
        $sources = [];

        foreach ($this->entryPointCatalog->getProviders() as $provider) {
            foreach ($this->entryPointCatalog->getEntryPointsJsonLocations($provider) as $entryPointLocation) {
                $source = $this->entryPointCatalog->getExposeRemoteSource($provider, $entryPointLocation);

                if ($source !== null) {
                    $sources[] = $source;
                    $this->logger->debug('Found exposeRemote.js', ['file' => dirname($entryPointLocation) . '/exposeRemote.js']);
                }
            }
        }

        if (empty($sources)) {
            $this->logger->debug('No exposeRemote.js files found');

            return;
        }

        $this->logger->debug('Scanning exposeRemote.js files', ['files_found' => count($sources)]);

        $origins = [];
        foreach ($sources as $source) {
            array_push($origins, ...$this->cspOriginFileParser->extractOriginsFromContent($source));
        }
        $origins = array_values(array_unique($origins));

        if (!empty($origins)) {
            $this->logger->debug('Extracted origins from exposeRemote.js files', ['origins' => $origins]);
            $event->addBuildOrigins($origins);
        }
    }
}
