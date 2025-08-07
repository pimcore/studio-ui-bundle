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

use function basename;
use function file_exists;
use Pimcore\Bundle\StudioUiBundle\Document\DocumentVersionComparisonService;
use Pimcore\Bundle\StudioUiBundle\Document\Exception\DocumentVersionComparisonException;
use Pimcore\Bundle\StudioUiBundle\Document\Exception\DocumentVersionNotFoundException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Contracts\Translation\TranslatorInterface;

/**
 * @internal
 */
#[Route('/documents', methods: ['GET'])]
final class DocumentVersionsController extends AbstractController
{
    public function __construct(
        private readonly DocumentVersionComparisonService $versionComparisonService,
        private readonly TranslatorInterface $translator,
    ) {
    }

    #[Route(
        '/diff-versions/from/{from}/to/{to}',
        name: 'pimcore_studio_ui_document_diffversions',
        requirements: ['from' => '\d+', 'to' => '\d+'],
        methods: ['GET']
    )]
    public function diffVersionsAction(
        Request $request,
        int $from,
        int $to,
    ): Response {

        if (!$this->versionComparisonService->isComparisonSupported()) {
            return $this->render('@PimcoreStudioUi/backend/error.html.twig', [
                'title' => $this->translator->trans('unsupported_feature', [], 'studio'),
                'message' => $this->translator->trans('document.version.comparison.unsupported.requirements', [], 'studio'),
            ]);
        }

        try {
            $result = $this->versionComparisonService->generateVersionComparison(
                $from,
                $to,
                $request->getSchemeAndHttpHost()
            );

            $viewParams = [];
            if ($result->hasSingleImage()) {
                $viewParams['image'] = $result->image;
            } elseif ($result->hasSeparateImages()) {
                $viewParams['image1'] = $result->image1;
                $viewParams['image2'] = $result->image2;
            }

            return $this->render('@PimcoreStudioUi/backend/document-versions/diff_versions.html.twig', $viewParams);
        } catch (DocumentVersionNotFoundException $e) {
            return $this->render('@PimcoreStudioUi/backend/error.html.twig', [
                'title' => $this->translator->trans('document.version.comparison.error.title', [], 'studio'),
                'message' => $e->getMessage(),
            ]);
        } catch (DocumentVersionComparisonException $e) {
            return $this->render('@PimcoreStudioUi/backend/error.html.twig', [
                'title' => $this->translator->trans('document.version.comparison.error.title', [], 'studio'),
                'message' => 'The version comparison could not be completed. ' . $e->getMessage(),
            ]);
        }
    }

    #[Route('/diff-versions/html/{id}', name: 'pimcore_studio_ui_document_diffversions_html', methods: ['GET'])]
    public function diffVersionsHtmlAction(Request $request): BinaryFileResponse
    {
        $file = PIMCORE_SYSTEM_TEMP_DIRECTORY . '/' . basename($request->get('id'));
        if (file_exists($file)) {
            $response = new BinaryFileResponse($file);

            return $response;
        }

        throw $this->createNotFoundException('Version diff file not found');
    }
}
