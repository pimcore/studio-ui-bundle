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
            ->arrayNode('asset_upload')
                ->addDefaultsIfNotSet()
                ->children()
                    ->integerNode('max_parallel_uploads')
                        ->info(
                            'How many asset uploads a single browser tab sends at the same time. ' .
                            'Lower this if bursts of uploads exhaust the PHP-FPM pool.'
                        )
                        ->min(1)
                        ->defaultValue(5)
                    ->end()
                ->end()
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
            ->end()
            ->arrayNode('pagination')
                ->addDefaultsIfNotSet()
                ->children()
                    ->arrayNode('page_size_options')
                        ->info(
                            'Page sizes offered in the page-size changer of paginated listings. ' .
                            'Accepts a list or a comma separated string.'
                        )
                        ->beforeNormalization()
                            ->always(static function (mixed $value): mixed {
                                if (is_string($value)) {
                                    $value = explode(',', $value);
                                }

                                if (!is_array($value)) {
                                    return $value;
                                }

                                $options = [];
                                foreach ($value as $option) {
                                    $option = is_string($option) ? trim($option) : $option;
                                    $options[] = is_string($option) && ctype_digit($option) ? (int) $option : $option;
                                }

                                return array_values(array_unique(array_filter($options, static fn (mixed $option): bool => $option !== '')));
                            })
                        ->end()
                        ->requiresAtLeastOneElement()
                        ->integerPrototype()
                            ->min(1)
                        ->end()
                        ->defaultValue([10, 20, 50, 100])
                    ->end()
                    ->integerNode('default_page_size')
                        ->info('Page size a listing starts with. Must be one of page_size_options.')
                        ->min(1)
                        ->defaultValue(20)
                    ->end()
                    ->integerNode('max_page_size')
                        ->info(
                            'Upper bound for page sizes users may enter in the page-size changer. ' .
                            'Keep it well below the search index result window (index.max_result_window).'
                        )
                        ->min(1)
                        ->defaultValue(1000)
                    ->end()
                ->end()
                ->validate()
                    ->ifTrue(static fn (array $v): bool => !in_array($v['default_page_size'], $v['page_size_options'], true))
                    ->thenInvalid('pimcore_studio_ui.pagination.default_page_size must be one of page_size_options.')
                ->end()
                ->validate()
                    ->ifTrue(static fn (array $v): bool => max($v['page_size_options']) > $v['max_page_size'])
                    ->thenInvalid('pimcore_studio_ui.pagination.page_size_options must not exceed max_page_size.')
                ->end()
            ->end();

        return $treeBuilder;
    }
}
