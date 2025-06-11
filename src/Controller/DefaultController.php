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
use Pimcore\Bundle\StudioUiBundle\Service\StaticResourcesResolverInterface;
use Pimcore\Controller\FrontendController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class DefaultController extends FrontendController
{
    public function __construct(
        private StaticResourcesResolverInterface $staticResourcesResolver,
        private UrlServiceInterface $mercureUrlService,
    ) {

    }

    #[Route('')]
    #[Route('/login')]
    #[Route('/{elementType}/{id}', requirements: ['elementType' => 'asset|data-object|document', 'id' => '\d+'])]
    public function indexAction(
        string $studioUrlUrlPath,
        array $studioWysiwygConfiguration
    ): Response {
        return $this->render('@PimcoreStudioUi/default/index.html.twig', [
            'studioCssFiles' => $this->staticResourcesResolver->getStudioCssFiles(),
            'studioJsFiles' => $this->staticResourcesResolver->getStudioJsFiles(),
            'bundleCssFiles' => $this->staticResourcesResolver->getBundleCssFiles(),
            'bundleJsFiles' => $this->staticResourcesResolver->getBundleJsFiles(),
            'additionalCssFiles' => $this->staticResourcesResolver->getAdditionalCssFiles(),
            'additionalJsFiles' => $this->staticResourcesResolver->getAdditionalJsFiles(),
            'baseUrl' => $studioUrlUrlPath,
            'mercureUrl' => $this->mercureUrlService->getClientSideUrl(),
            'wysiwygConfiguration' => $studioWysiwygConfiguration,
        ]);
    }
}
