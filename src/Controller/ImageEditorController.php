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

        return $this->render('@PimcoreStudioUi/image-editor/editor.html.twig', [
            'asset' => $asset,
        ]);
    }
}
