<?php

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

use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;

/**
 * This is the class that validates and merges configuration from your app/config files.
 *
 * To learn more see {@link http://symfony.com/doc/current/cookbook/bundles/configuration.html}
 */
class Configuration implements ConfigurationInterface
{
    /**
     * {@inheritdoc}
     */
    public function getConfigTreeBuilder(): TreeBuilder
    {
        $treeBuilder = new TreeBuilder('pimcore_studio_ui');

        // @phpstan-ignore-next-line
        $treeBuilder
            ->getRootNode()
            ->children()
                ->scalarNode('url_path')
                ->defaultValue('/pimcore-studio')
            ->end()
            ->arrayNode('static_resources')
                ->addDefaultsIfNotSet()
                ->children()
                    ->arrayNode('css')
                        ->scalarPrototype()->end()
                        ->defaultValue([])
                    ->end()
                    ->arrayNode('js')
                        ->scalarPrototype()->end()
                        ->defaultValue([])
                    ->end()
                ->end()
            ->end()
            ->arrayNode('wysiwyg')
                ->addDefaultsIfNotSet()
                ->children()
                    ->arrayNode('defaultEditorConfig')
                        ->addDefaultsIfNotSet()
                        ->children()
                            ->variableNode('document')->defaultValue([])->end()
                            ->variableNode('dataObject')->defaultValue([])->end()
                        ->end()
                    ->end()
                ->end()
            ->end();

        return $treeBuilder;
    }
}
