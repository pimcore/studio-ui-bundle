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

namespace Pimcore\Bundle\StudioUiBundle\DependencyInjection;

use Exception;
use Pimcore\Bundle\StudioUiBundle\Security\Csp\ContentSecurityPolicyHandlerInterface;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Extension\PrependExtensionInterface;
use Symfony\Component\DependencyInjection\Loader;
use Symfony\Component\HttpKernel\DependencyInjection\Extension;

/**
 * This is the class that loads and manages your bundle configuration.
 *
 * @link http://symfony.com/doc/current/cookbook/bundles/extension.html
 */
class PimcoreStudioUiExtension extends Extension implements PrependExtensionInterface
{
    /**
     * {@inheritdoc}
     *
     * @throws Exception
     */
    public function load(array $configs, ContainerBuilder $container): void
    {
        $configuration = new Configuration();
        $config = $this->processConfiguration($configuration, $configs);

        $loader = new Loader\YamlFileLoader($container, new FileLocator(__DIR__.'/../../config'));
        $loader->load('services.yaml');

        $container->setParameter('pimcore_studio_ui.url_path', rtrim($config['url_path'], '/'));

        $container->getDefinition('pimcore_studio.static_resources_resolver.default')
            ->setArgument('$additionalCssFiles', array_unique($config['static_resources']['css']))
            ->setArgument('$additionalJsFiles', array_unique($config['static_resources']['js']));

        $container->getDefinition('pimcore_studio.static_resources_resolver.document_editor_iframe')
            ->setArgument('$additionalCssFiles', array_unique($config['static_resources']['editmode']['css']))
            ->setArgument('$additionalJsFiles', array_unique($config['static_resources']['editmode']['js']));

        $container->setParameter('pimcore_studio_ui.wysiwyg_configuration', $config['wysiwyg']);

        $container->setParameter('pimcore_studio_ui.csp_header.enabled', $config['csp_header']['enabled']);

        $cspHandlerDefinition = $container->getDefinition(ContentSecurityPolicyHandlerInterface::class);
        $cspHandlerDefinition->setArgument('$cspEnabled', $config['csp_header']['enabled']);
        foreach ($config['csp_header']['additional_urls'] as $additionalUrlsKey => $additionalUrlsArr) {
            $cspHandlerDefinition->addMethodCall('addAllowedUrls', [$additionalUrlsKey, $additionalUrlsArr]);
        }

        $cspSubscriberDefinition = $container->getDefinition('Pimcore\Bundle\StudioUiBundle\EventSubscriber\Csp\CspHeaderSubscriber');
        $cspSubscriberDefinition
            ->setArgument('$cspEnabled', $config['csp_header']['enabled'])
            ->setArgument('$excludePaths', $config['csp_header']['exclude_paths']);
    }

    /**
     * Registers the configured studio url_path under the Pimcore admin context so that
     * the RoutingListener short-circuits before site resolution and document routing,
     * preventing sites or documents from overwriting the studio route.
     *
     * @throws Exception
     */
    public function prepend(ContainerBuilder $container): void
    {
        $configs = $container->getExtensionConfig($this->getAlias());
        $config = $this->processConfiguration(new Configuration(), $configs);
        $urlPath = rtrim($config['url_path'] ?? '/pimcore-studio', '/');

        $container->prependExtensionConfig('pimcore', [
            'context' => [
                'admin' => [
                    'routes' => [
                        ['path' => '^' . preg_quote($urlPath, '@') . '(/.*)?$'],
                    ],
                ],
            ],
        ]);
    }
}
