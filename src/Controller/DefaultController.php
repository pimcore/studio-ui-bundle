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

namespace Pimcore\Bundle\StudioUiBundle\Controller;

use Pimcore\Bundle\StudioBackendBundle\Mercure\Service\UrlServiceInterface;
use Pimcore\Bundle\StudioUiBundle\AppConfig\AppConfigProviderInterface;
use Pimcore\Bundle\StudioUiBundle\Service\StaticResourcesResolverInterface;
use Pimcore\Controller\FrontendController;
use Pimcore\Tool;
use Symfony\Component\DependencyInjection\Attribute\TaggedIterator;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class DefaultController extends FrontendController
{
    /**
     * @param iterable<AppConfigProviderInterface> $appConfigProviders
     */
    public function __construct(
        private StaticResourcesResolverInterface $staticResourcesResolver,
        private UrlServiceInterface $mercureUrlService,
        #[TaggedIterator('pimcore_studio_ui.app_config_provider')]
        private iterable $appConfigProviders,
    ) {

    }

    #[Route('')]
    #[Route('/login')]
    #[Route('/reset-password')]
    #[Route('/{elementType}/{id}', requirements: ['elementType' => 'asset|data-object|document', 'id' => '\d+'])]
    public function indexAction(
        string $studioUrlPath,
        array $studioWysiwygConfiguration
    ): Response {
        $appConfig = [
            'baseUrl' => $studioUrlPath . '/',
            'mercureUrl' => $this->mercureUrlService->getClientSideUrl(),
            'wysiwyg' => $studioWysiwygConfiguration,
        ];

        foreach ($this->appConfigProviders as $provider) {
            $appConfig = array_merge($appConfig, $provider->getAppConfig());
        }

        return $this->render('@PimcoreStudioUi/default/index.html.twig', [
            'studioCssFiles' => $this->staticResourcesResolver->getStudioCssFiles(),
            'studioJsFiles' => $this->staticResourcesResolver->getStudioJsFiles(),
            'bundleCssFiles' => $this->staticResourcesResolver->getBundleCssFiles(),
            'bundleJsFiles' => $this->staticResourcesResolver->getBundleJsFiles(),
            'additionalCssFiles' => $this->staticResourcesResolver->getAdditionalCssFiles(),
            'additionalJsFiles' => $this->staticResourcesResolver->getAdditionalJsFiles(),
            'appConfig' => $appConfig,
            'hostname' => Tool::getHostname(),
        ]);
    }
}
