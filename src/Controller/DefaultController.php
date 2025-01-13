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
        string $studioMercureClientUrl
    ): Response {
        return $this->render('@PimcoreStudioUi/default/index.html.twig', [
            'studioCssFiles' => $staticResourcesResolver->getStudioCssFiles(),
            'studioJsFiles' => $staticResourcesResolver->getStudioJsFiles(),
            'bundleCssFiles' => $staticResourcesResolver->getBundleCssFiles(),
            'bundleJsFiles' => $staticResourcesResolver->getBundleJsFiles(),
            'baseUrl' => $studioUrlUrlPath,
            'mercureUrl' => $studioMercureClientUrl,
        ]);
    }
}
