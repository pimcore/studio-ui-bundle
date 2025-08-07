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

namespace Pimcore\Bundle\StudioUiBundle\Document;

use Imagick;
use ImagickException;
use Pimcore\Bundle\StudioUiBundle\Document\Exception\DocumentVersionComparisonException;
use Pimcore\Bundle\StudioUiBundle\Document\Exception\DocumentVersionNotFoundException;
use Pimcore\Config;
use Pimcore\Document\Renderer\DocumentRendererInterface;
use Pimcore\Image\HtmlToImage;
use Pimcore\Model\Document;
use Pimcore\Model\Version;
use Symfony\Component\Routing\RouterInterface;
use function base64_encode;
use function basename;
use function class_exists;
use function date;
use function file_exists;
use function file_get_contents;
use function file_put_contents;
use function sprintf;
use function uniqid;
use function unlink;

/**
 * @internal
 */
final class DocumentVersionComparisonService
{
    public function __construct(
        private readonly DocumentRendererInterface $documentRenderer,
        private readonly RouterInterface $router,
    ) {
    }

    public function isComparisonSupported(): bool
    {
        return HtmlToImage::isSupported() && class_exists('Imagick');
    }

    public function generateVersionComparison(int $fromVersionId, int $toVersionId, string $baseUrl): DocumentVersionComparisonResult
    {
        $docFrom = $this->loadAndValidateDocument($fromVersionId);
        $docTo = $this->loadAndValidateDocument($toVersionId);

        $comparisonId = uniqid(date('Y-m-d') . '-', true);
        $tempFileTemplate = PIMCORE_SYSTEM_TEMP_DIRECTORY . '/version-diff-tmp-' . $comparisonId . '-%s.%s';
        $fromImageFile = sprintf($tempFileTemplate, 'from', 'png');
        $toImageFile = sprintf($tempFileTemplate, 'to', 'png');
        $fromHtmlFile = sprintf($tempFileTemplate, 'from', 'html');
        $toHtmlFile = sprintf($tempFileTemplate, 'to', 'html');

        try {
            $this->generateHtmlFiles($docFrom, $docTo, $fromHtmlFile, $toHtmlFile);
            $this->convertHtmlToImages($fromHtmlFile, $toHtmlFile, $fromImageFile, $toImageFile, $baseUrl);
            
            return $this->compareImages($fromImageFile, $toImageFile);
        } finally {
            $this->cleanupFiles([$fromImageFile, $toImageFile]);
        }
    }

    private function loadAndValidateDocument(int $versionId): Document
    {
        $version = Version::getById($versionId);
        $document = $version?->loadData();

        if (!$document) {
            throw new DocumentVersionNotFoundException($versionId);
        }

        return $document;
    }

    private function generateHtmlFiles(Document $docFrom, Document $docTo, string $fromHtmlFile, string $toHtmlFile): void
    {
        try {
            $docContentFrom = $this->documentRenderer->render($docFrom);
            $docContentTo = $this->documentRenderer->render($docTo);

            if (file_put_contents($fromHtmlFile, $docContentFrom) === false) {
                throw DocumentVersionComparisonException::fileOperationFailed('write', $fromHtmlFile);
            }

            if (file_put_contents($toHtmlFile, $docContentTo) === false) {
                throw DocumentVersionComparisonException::fileOperationFailed('write', $toHtmlFile);
            }
        } catch (\Exception $e) {
            if ($e instanceof DocumentVersionComparisonException) {
                throw $e;
            }
            throw new DocumentVersionComparisonException('Failed to generate HTML files: ' . $e->getMessage(), 0, $e);
        }
    }

    private function convertHtmlToImages(
        string $fromHtmlFile,
        string $toHtmlFile,
        string $fromImageFile,
        string $toImageFile,
        string $baseUrl
    ): void {
        $prefix = Config::getSystemConfiguration('documents')['preview_url_prefix'];
        if (empty($prefix)) {
            $prefix = $baseUrl;
        }

        $fromUrl = $prefix . $this->router->generate('pimcore_studio_ui_document_diffversions_html', ['id' => basename($fromHtmlFile)]);
        $toUrl = $prefix . $this->router->generate('pimcore_studio_ui_document_diffversions_html', ['id' => basename($toHtmlFile)]);

        try {
            if (!HtmlToImage::convert($fromUrl, $fromImageFile)) {
                throw DocumentVersionComparisonException::htmlToImageConversionFailed($fromUrl, $fromImageFile);
            }

            if (!HtmlToImage::convert($toUrl, $toImageFile)) {
                throw DocumentVersionComparisonException::htmlToImageConversionFailed($toUrl, $toImageFile);
            }
        } catch (\Exception $e) {
            if ($e instanceof DocumentVersionComparisonException) {
                throw $e;
            }
            throw new DocumentVersionComparisonException('HTML to image conversion failed: ' . $e->getMessage(), 0, $e);
        } finally {
            // Clean up HTML files regardless of success/failure
            if (file_exists($fromHtmlFile)) {
                unlink($fromHtmlFile);
            }
            if (file_exists($toHtmlFile)) {
                unlink($toHtmlFile);
            }
        }
    }

    private function compareImages(string $fromImageFile, string $toImageFile): DocumentVersionComparisonResult
    {
        if (!file_exists($fromImageFile)) {
            throw DocumentVersionComparisonException::fileOperationFailed('read', $fromImageFile);
        }

        if (!file_exists($toImageFile)) {
            throw DocumentVersionComparisonException::fileOperationFailed('read', $toImageFile);
        }

        try {
            $image1 = new Imagick($fromImageFile);
            $image2 = new Imagick($toImageFile);
        } catch (ImagickException $e) {
            throw DocumentVersionComparisonException::imageComparisonFailed($fromImageFile, $toImageFile);
        }

        try {
            if ($image1->getImageWidth() == $image2->getImageWidth() && $image1->getImageHeight() == $image2->getImageHeight()) {
                $result = $image1->compareImages($image2, Imagick::METRIC_MEANSQUAREERROR);
                $result[0]->setImageFormat('png');

                $imageData = base64_encode($result[0]->getImageBlob());

                $result[0]->clear();
                $result[0]->destroy();

                return new DocumentVersionComparisonResult(image: $imageData);
            } else {
                $fromImageContent = file_get_contents($fromImageFile);
                $toImageContent = file_get_contents($toImageFile);

                if ($fromImageContent === false) {
                    throw DocumentVersionComparisonException::fileOperationFailed('read', $fromImageFile);
                }

                if ($toImageContent === false) {
                    throw DocumentVersionComparisonException::fileOperationFailed('read', $toImageFile);
                }

                return new DocumentVersionComparisonResult(
                    image1: base64_encode($fromImageContent),
                    image2: base64_encode($toImageContent)
                );
            }
        } catch (ImagickException $e) {
            throw DocumentVersionComparisonException::imageComparisonFailed($fromImageFile, $toImageFile);
        } finally {
            $image1->clear();
            $image1->destroy();
            $image2->clear();
            $image2->destroy();
        }
    }

    private function cleanupFiles(array $files): void
    {
        foreach ($files as $file) {
            if (file_exists($file)) {
                if (!unlink($file)) {
                    // Log warning but don't throw exception for cleanup failures
                    error_log("Warning: Failed to delete temporary file: {$file}");
                }
            }
        }
    }
}