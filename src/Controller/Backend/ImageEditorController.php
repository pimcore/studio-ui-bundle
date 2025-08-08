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

namespace Pimcore\Bundle\StudioUiBundle\Controller\Backend;

use Pimcore\Bundle\StudioBackendBundle\Security\Service\SecurityServiceInterface;
use Pimcore\Bundle\StudioBackendBundle\Util\Constant\ElementPermissions;
use Pimcore\Model\Asset;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class ImageEditorController extends AbstractController
{
    public function __construct(
        private readonly SecurityServiceInterface $securityService,
    ) {
    }

    #[Route('/image-editor', methods: ['GET'])]
    public function editorAction(Request $request): Response
    {
        $asset = Asset\Image::getById((int) $request->get('id'));

        if (!$asset) {
            throw $this->createNotFoundException('Asset not found');
        }

        $this->securityService->hasElementPermission(
            $asset,
            $this->securityService->getCurrentUser(),
            ElementPermissions::VIEW_PERMISSION
        );

        return $this->render('@PimcoreStudioUi/backend/image-editor/editor.html.twig', [
            'asset' => $asset,
        ]);
    }
}
