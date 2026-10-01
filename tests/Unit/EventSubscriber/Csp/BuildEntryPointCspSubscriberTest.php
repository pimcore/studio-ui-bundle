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
use Pimcore\Bundle\StudioUiBundle\EventSubscriber\Csp\BuildEntryPointCspSubscriber;
use Pimcore\Bundle\StudioUiBundle\Security\Csp\ContentSecurityPolicyHandler;
use Pimcore\Bundle\StudioUiBundle\Security\Csp\CspOriginFileParser;
use Pimcore\Bundle\StudioUiBundle\Security\Csp\CspOriginValidator;
use Pimcore\Bundle\StudioUiBundle\Service\StaticResourcesResolver;
use Pimcore\Bundle\StudioUiBundle\Webpack\EntryPointCatalog;
use Pimcore\Bundle\StudioUiBundle\Webpack\WebpackEntryPointManager;
use Pimcore\Bundle\StudioUiBundle\Webpack\WebpackEntryPointProviderInterface;
use Psr\Log\NullLogger;
use Symfony\Component\Config\ConfigCacheFactory;
use Symfony\Component\HttpFoundation\Request;

class BuildEntryPointCspSubscriberTest extends Unit
{
    public function testLeavesTheBuildsAloneForAnApiResponse(): void
    {
        $provider = new class() implements WebpackEntryPointProviderInterface {
            public int $calls = 0;

            public function getEntryPointsJsonLocations(): array
            {
                $this->calls++;

                return [];
            }

            public function getEntryPoints(): array
            {
                return [];
            }

            public function getOptionalEntryPoints(): array
            {
                return [];
            }
        };

        $catalog = new EntryPointCatalog(
            new WebpackEntryPointManager([$provider]),
            new ConfigCacheFactory(false),
            sys_get_temp_dir(),
            'default',
            new NullLogger()
        );
        $subscriber = new BuildEntryPointCspSubscriber(
            new StaticResourcesResolver($catalog),
            new CspOriginFileParser(new CspOriginValidator())
        );

        $subscriber->onCspEvent(new CspEvent(new Request(), new ContentSecurityPolicyHandler(true), false));
        $this->assertSame(0, $provider->calls);

        $subscriber->onCspEvent(new CspEvent(new Request(), new ContentSecurityPolicyHandler(true)));
        $this->assertSame(1, $provider->calls);
    }
}
