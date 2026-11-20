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
use function is_string;
use Pimcore\Bundle\StudioUiBundle\Document\DocumentVersionComparisonService;
use Pimcore\Bundle\StudioUiBundle\Document\Exception\DocumentVersionComparisonException;
use Pimcore\Bundle\StudioUiBundle\Document\Exception\DocumentVersionNotFoundException;
use function preg_match;
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
    private const string ERROR_TEMPLATE = '@PimcoreStudioUi/backend/error.html.twig';

    /**
     * Matches exactly the names {@see DocumentVersionComparisonService} generates for its own
     * temporary diff artifacts: "version-diff-tmp-" + date('Y-m-d') + "-" + uniqid('', true)
     * + "-{from,to}.{png,html}". uniqid() with more entropy is 13 hex digits, one digit, a dot
     * and 8 digits. The parameter can therefore no longer address any other file in
     * PIMCORE_SYSTEM_TEMP_DIRECTORY. "\z" (not "$") so a trailing line feed is rejected as well.
     */
    private const DIFF_FILE_NAME_PATTERN = '/^version-diff-tmp-\d{4}-\d{2}-\d{2}-[0-9a-f]{13}\d\.\d{8}'
        . '-(?:from|to)\.(?:png|html)\z/';

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
            return $this->render(self::ERROR_TEMPLATE, [
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
            return $this->render(self::ERROR_TEMPLATE, [
                'title' => $this->translator->trans('document.version.comparison.error.title', [], 'studio'),
                'message' => $e->getMessage(),
            ]);
        } catch (DocumentVersionComparisonException $e) {
            return $this->render(self::ERROR_TEMPLATE, [
                'title' => $this->translator->trans('document.version.comparison.error.title', [], 'studio'),
                'message' => 'The version comparison could not be completed. ' . $e->getMessage(),
            ]);
        }
    }

    public function diffVersionsHtmlAction(Request $request): BinaryFileResponse
    {
        // The id is only ever sent as a query parameter; reading the parameter bags directly
        // also avoids the deprecated Request::get() and tolerates array values (-> 404).
        $id = $request->query->all()['id'] ?? null;
        if (!is_string($id) || preg_match(self::DIFF_FILE_NAME_PATTERN, $id) !== 1) {
            throw $this->createNotFoundException('Version diff file not found');
        }

        $file = PIMCORE_SYSTEM_TEMP_DIRECTORY . '/' . basename($id);
        if (file_exists($file)) {
            return new BinaryFileResponse($file);
        }

        throw $this->createNotFoundException('Version diff file not found');
    }
}
