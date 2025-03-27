<?php

declare(strict_types=1);

/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 *  @license    http://www.pimcore.org/license     GPLv3 and PCL
 */

namespace Pimcore\Bundle\StudioUiBundle\DependencyInjection;

use Exception;
use Pimcore\Bundle\StudioUiBundle\Service\StaticResourcesResolverInterface;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Loader;
use Symfony\Component\HttpKernel\DependencyInjection\Extension;

/**
 * This is the class that loads and manages your bundle configuration.
 *
 * @link http://symfony.com/doc/current/cookbook/bundles/extension.html
 */
class PimcoreStudioUiExtension extends Extension
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

        $container->getDefinition(StaticResourcesResolverInterface::class)
            ->setArgument('$additionalCssFiles', array_unique($config['static_resources']['css']))
            ->setArgument('$additionalJsFiles', array_unique($config['static_resources']['js']));

        $container->setParameter('pimcore_studio_ui.wysiwyg_configuration', $config['wysiwyg']);
    }
}
