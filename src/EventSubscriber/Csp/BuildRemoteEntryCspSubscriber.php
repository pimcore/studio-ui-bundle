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
use Pimcore\Bundle\StudioUiBundle\Webpack\WebpackEntryPointManager;
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
        private readonly WebpackEntryPointManager $webpackEntryPointManager
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
        $exposeRemoteFiles = [];

        foreach ($this->webpackEntryPointManager->getProviders() as $provider) {
            foreach ($provider->getEntryPointsJsonLocations() as $entryPointLocation) {
                $directory = dirname($entryPointLocation);
                $exposeRemoteFile = $directory . '/exposeRemote.js';

                if (file_exists($exposeRemoteFile)) {
                    $exposeRemoteFiles[] = $exposeRemoteFile;
                    $this->logger->debug('Found exposeRemote.js', ['file' => $exposeRemoteFile]);
                }
            }
        }

        if (empty($exposeRemoteFiles)) {
            $this->logger->debug('No exposeRemote.js files found');

            return;
        }

        $this->logger->debug('Scanning exposeRemote.js files', ['files_found' => count($exposeRemoteFiles)]);

        $origins = $this->cspOriginFileParser->extractOriginsFromFiles($exposeRemoteFiles);

        if (!empty($origins)) {
            $this->logger->debug('Extracted origins from exposeRemote.js files', ['origins' => $origins]);
            $event->addBuildOrigins($origins);
        }
    }
}
