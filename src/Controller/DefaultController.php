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

use Pimcore\Bundle\StudioUiBundle\Service\StaticResourcesResolverInterface;
use Pimcore\Controller\FrontendController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class DefaultController extends FrontendController
{
    #[Route('')]
    #[Route('/login')]
    #[Route('/{elementType}/{id}', requirements: ['elementType' => 'asset|data-object|document', 'id' => '\d+'])]
    public function indexAction(
        StaticResourcesResolverInterface $staticResourcesResolver,
        string $studioUrlUrlPath,
        string $studioMercureClientUrl,
        array $studioWysiwygConfiguration
    ): Response {
        return $this->render('@PimcoreStudioUi/default/index.html.twig', [
            'studioCssFiles' => $staticResourcesResolver->getStudioCssFiles(),
            'studioJsFiles' => $staticResourcesResolver->getStudioJsFiles(),
            'bundleCssFiles' => $staticResourcesResolver->getBundleCssFiles(),
            'bundleJsFiles' => $staticResourcesResolver->getBundleJsFiles(),
            'additionalCssFiles' => $staticResourcesResolver->getAdditionalCssFiles(),
            'additionalJsFiles' => $staticResourcesResolver->getAdditionalJsFiles(),
            'baseUrl' => $studioUrlUrlPath,
            'mercureUrl' => $studioMercureClientUrl,
            'wysiwygConfiguration' => $studioWysiwygConfiguration,
        ]);
    }
}
