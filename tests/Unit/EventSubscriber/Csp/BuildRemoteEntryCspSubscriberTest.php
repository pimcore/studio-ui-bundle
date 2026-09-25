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
use Pimcore\Bundle\StudioUiBundle\EventSubscriber\Csp\BuildRemoteEntryCspSubscriber;
use Pimcore\Bundle\StudioUiBundle\Security\Csp\ContentSecurityPolicyHandler;
use Pimcore\Bundle\StudioUiBundle\Security\Csp\CspOriginFileParser;
use Pimcore\Bundle\StudioUiBundle\Security\Csp\CspOriginValidator;
use Pimcore\Bundle\StudioUiBundle\Webpack\EntryPointCatalog;
use Pimcore\Bundle\StudioUiBundle\Webpack\WebpackEntryPointManager;
use Pimcore\Bundle\StudioUiBundle\Webpack\WebpackEntryPointProviderInterface;
use Psr\Log\NullLogger;
use Symfony\Component\Config\ConfigCacheFactory;
use Symfony\Component\HttpFoundation\Request;

class BuildRemoteEntryCspSubscriberTest extends Unit
{
    private string $workDir;

    public function _before(): void
    {
        $this->workDir = sys_get_temp_dir() . '/studio-remote-entry-csp-' . uniqid('', true);
        foreach (['one', 'two', 'three'] as $build) {
            mkdir($this->workDir . '/' . $build, 0775, true);
            file_put_contents($this->workDir . '/' . $build . '/entrypoints.json', '{"entrypoints":{}}');
        }
        file_put_contents($this->workDir . '/one/exposeRemote.js', 'load("https://cdn.example.com/a.js")');
        file_put_contents(
            $this->workDir . '/two/exposeRemote.js',
            'load("https://cdn.example.com/b.js", "https://static.example.org/c.js")'
        );
    }

    public function _after(): void
    {
        foreach (['one', 'two', 'three'] as $build) {
            array_map('unlink', glob($this->workDir . '/' . $build . '/*') ?: []);
            rmdir($this->workDir . '/' . $build);
        }
        rmdir($this->workDir);
    }

    public function testAddsTheOriginsOfEveryRemoteEntryOnce(): void
    {
        $provider = new class($this->workDir) implements WebpackEntryPointProviderInterface {
            public function __construct(private readonly string $dir)
            {
            }

            public function getEntryPointsJsonLocations(): array
            {
                return glob($this->dir . '/*/entrypoints.json') ?: [];
            }

            public function getEntryPoints(): array
            {
                return ['exposeRemote'];
            }

            public function getOptionalEntryPoints(): array
            {
                return [];
            }
        };

        $catalog = new EntryPointCatalog(
            new WebpackEntryPointManager([$provider]),
            new ConfigCacheFactory(false),
            $this->workDir . '/cache',
            'default',
            new NullLogger()
        );
        $event = new CspEvent(new Request(), new ContentSecurityPolicyHandler(true));

        $subscriber = new BuildRemoteEntryCspSubscriber(new CspOriginFileParser(new CspOriginValidator()), $catalog);
        $subscriber->onCspEvent($event);

        $origins = $event->getAdditionalBuildOrigins();
        sort($origins);
        $this->assertSame(['https://cdn.example.com', 'https://static.example.org'], $origins);
    }
}
