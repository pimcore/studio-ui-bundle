<?php

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

use Pimcore\Bundle\StudioUiBundle\Security\Csp\ContentSecurityPolicyHandlerInterface;
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
                    ->arrayNode('editmode')
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
            ->end()
            ->arrayNode('csp_header')
                ->canBeDisabled()
                ->info('Can be used to enable or disable the Content Security Policy headers.')
                ->children()
                    ->arrayNode('exclude_paths')
                        ->scalarPrototype()->end()
                        ->info('Regular Expressions like: /^\/path\/toexclude/')
                    ->end()
                    ->arrayNode('additional_urls')
                        ->addDefaultsIfNotSet()
                        ->normalizeKeys(false)
                        ->children()
                            ->arrayNode(ContentSecurityPolicyHandlerInterface::DEFAULT_OPT)
                                ->scalarPrototype()->end()
                            ->end()
                            ->arrayNode(ContentSecurityPolicyHandlerInterface::IMG_OPT)
                                ->scalarPrototype()->end()
                            ->end()
                            ->arrayNode(ContentSecurityPolicyHandlerInterface::SCRIPT_OPT)
                                ->scalarPrototype()->end()
                            ->end()
                            ->arrayNode(ContentSecurityPolicyHandlerInterface::STYLE_OPT)
                                ->scalarPrototype()->end()
                            ->end()
                            ->arrayNode(ContentSecurityPolicyHandlerInterface::CONNECT_OPT)
                                ->scalarPrototype()->end()
                            ->end()
                            ->arrayNode(ContentSecurityPolicyHandlerInterface::FONT_OPT)
                                ->scalarPrototype()->end()
                            ->end()
                            ->arrayNode(ContentSecurityPolicyHandlerInterface::MEDIA_OPT)
                                ->scalarPrototype()->end()
                            ->end()
                            ->arrayNode(ContentSecurityPolicyHandlerInterface::FRAME_OPT)
                                ->scalarPrototype()->end()
                            ->end()
                        ->end()
                    ->end()
                ->end()
            ->end();

        return $treeBuilder;
    }
}
