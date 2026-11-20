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
    private const PREFIX = 'version-diff-tmp-';

    private const FROM_PNG = '-from.png';

    /** @var string[] */
    private array $createdFiles = [];

    public function _after(): void
    {
        foreach ($this->createdFiles as $file) {
            @unlink($file);
        }
        $this->createdFiles = [];
    }

    public function testServesTheFilesGeneratedByTheComparisonService(): void
    {
        // Same naming scheme as DocumentVersionComparisonService::generateVersionComparison().
        $comparisonId = uniqid(date('Y-m-d') . '-', true);

        foreach (['from', 'to'] as $side) {
            foreach (['png', 'html'] as $extension) {
                $name = self::PREFIX . $comparisonId . '-' . $side . '.' . $extension;
                $this->writeTempFile($name, 'generated-content');

                $response = $this->controller()->diffVersionsHtmlAction($this->requestWithId($name));

                $this->assertInstanceOf(BinaryFileResponse::class, $response, $name);
                $this->assertSame(
                    realpath(PIMCORE_SYSTEM_TEMP_DIRECTORY . '/' . $name),
                    realpath($response->getFile()->getPathname()),
                    $name
                );
            }
        }
    }

    public function testRejectsExistingFilesOutsideTheComparisonNamingScheme(): void
    {
        $comparisonId = uniqid(date('Y-m-d') . '-', true);

        $names = [
            'unrelated-file.dat',
            self::PREFIX . 'notes.png',
            self::PREFIX . 'notes.html',
            self::PREFIX . $comparisonId . '.png',
            self::PREFIX . $comparisonId . '-from.txt',
            self::PREFIX . $comparisonId . '-other.png',
            'prefix-' . self::PREFIX . $comparisonId . self::FROM_PNG,
            // A trailing line feed must not slip past the end anchor.
            self::PREFIX . $comparisonId . self::FROM_PNG . "\n",
        ];

        foreach ($names as $name) {
            $this->writeTempFile($name, 'must-not-be-served');

            try {
                $this->controller()->diffVersionsHtmlAction($this->requestWithId($name));
                $this->fail('Expected a 404 for ' . json_encode($name));
            } catch (NotFoundHttpException) {
                $this->addToAssertionCount(1);
            }
        }
    }

    public function testRejectsPathComponentsInTheId(): void
    {
        $comparisonId = uniqid(date('Y-m-d') . '-', true);

        foreach (['../composer.json', 'sub/' . self::PREFIX . $comparisonId . self::FROM_PNG] as $id) {
            try {
                $this->controller()->diffVersionsHtmlAction($this->requestWithId($id));
                $this->fail('Expected a 404 for ' . $id);
            } catch (NotFoundHttpException) {
                $this->addToAssertionCount(1);
            }
        }
    }

    public function testRejectsAMissingId(): void
    {
        $this->expectException(NotFoundHttpException::class);

        $this->controller()->diffVersionsHtmlAction(new Request());
    }

    public function testRejectsAnArrayId(): void
    {
        $this->expectException(NotFoundHttpException::class);

        $this->controller()->diffVersionsHtmlAction(new Request(['id' => ['version-diff-tmp']]));
    }

    public function testAnUnknownButWellFormedNameIsNotFound(): void
    {
        $this->expectException(NotFoundHttpException::class);

        $name = self::PREFIX . uniqid(date('Y-m-d') . '-', true) . self::FROM_PNG;

        $this->controller()->diffVersionsHtmlAction($this->requestWithId($name));
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
        if (!is_dir(PIMCORE_SYSTEM_TEMP_DIRECTORY)) {
            mkdir(PIMCORE_SYSTEM_TEMP_DIRECTORY, 0777, true);
        }

        $path = PIMCORE_SYSTEM_TEMP_DIRECTORY . '/' . $name;
        file_put_contents($path, $contents);
        $this->createdFiles[] = $path;
    }
}
