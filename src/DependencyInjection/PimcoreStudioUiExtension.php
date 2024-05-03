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
        $loader = new Loader\YamlFileLoader($container, new FileLocator(__DIR__.'/../../config'));
        $loader->load('services.yaml');
    }

    public function prepend(ContainerBuilder $container): void
    {
        $builds = [
            'pimcoreStudioUi' => dirname(__DIR__, 2) . '/public/build',
        ];

        $container->prependExtensionConfig('webpack_encore', [
            // 'output_path' => realpath(__DIR__ . '/../Resources/public/build')
            'output_path' => false,
            'builds' => $builds,
        ]);

    }
}
