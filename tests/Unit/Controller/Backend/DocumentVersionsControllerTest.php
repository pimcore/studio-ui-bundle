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

namespace Pimcore\Bundle\StudioUiBundle\Tests\Unit\Controller\Backend;

use Codeception\Test\Unit;
use Pimcore\Bundle\StudioUiBundle\Controller\Backend\DocumentVersionsController;
use Pimcore\Bundle\StudioUiBundle\Document\DocumentVersionComparisonService;
use Pimcore\Document\Renderer\DocumentRendererInterface;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Contracts\Translation\TranslatorInterface;

/**
 * Unit coverage for the file-name allow-list in {@see DocumentVersionsController::diffVersionsHtmlAction()}.
 */
class DocumentVersionsControllerTest extends Unit
{
    /** @var string[] */
    private array $createdFiles = [];

    public function _after(): void
    {
        foreach ($this->createdFiles as $file) {
            @unlink($file);
        }
        $this->createdFiles = [];
    }

    public function testServesAFileGeneratedByTheComparisonService(): void
    {
        $name = 'version-diff-tmp-2026-01-01-' . uniqid('', true) . '-from.png';
        $this->writeTempFile($name, 'image-bytes');

        $response = $this->controller()->diffVersionsHtmlAction($this->requestWithId($name));

        $this->assertInstanceOf(BinaryFileResponse::class, $response);
        $this->assertSame(
            realpath(PIMCORE_SYSTEM_TEMP_DIRECTORY . '/' . $name),
            realpath($response->getFile()->getPathname())
        );
    }

    public function testRejectsAFileOutsideTheComparisonNamingScheme(): void
    {
        $name = 'webdav-delete.dat';
        $this->writeTempFile($name, 'serialized-assets');

        $this->expectException(NotFoundHttpException::class);

        $this->controller()->diffVersionsHtmlAction($this->requestWithId($name));
    }

    public function testRejectsAMissingId(): void
    {
        $this->expectException(NotFoundHttpException::class);

        $this->controller()->diffVersionsHtmlAction(new Request());
    }

    private function controller(): DocumentVersionsController
    {
        return new DocumentVersionsController(
            new DocumentVersionComparisonService(
                $this->createMock(DocumentRendererInterface::class),
                $this->createMock(RouterInterface::class)
            ),
            $this->createMock(TranslatorInterface::class)
        );
    }

    private function requestWithId(string $id): Request
    {
        return new Request(['id' => $id]);
    }

    private function writeTempFile(string $name, string $contents): void
    {
        $path = PIMCORE_SYSTEM_TEMP_DIRECTORY . '/' . $name;
        file_put_contents($path, $contents);
        $this->createdFiles[] = $path;
    }
}
