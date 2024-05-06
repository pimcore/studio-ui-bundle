<?php
declare(strict_types=1);

/**
 * Pimcore
 *
 * This source file is available under following license:
 * - Pimcore Commercial License (PCL)
 *
 *  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 *  @license    http://www.pimcore.org/license     PCL
 */

namespace Pimcore\Bundle\StudioUiBundle\Controller;

use Pimcore\Controller\FrontendController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

final class DefaultController extends FrontendController
{
    /**
     * @Route("/")
     */
    public function indexAction(): Response
    {
        return $this->render('@PimcoreStudioUi/default/index.html.twig');
    }

    /**
     * @Route("/{any}", requirements={"any"=".+"})
     */
    public function catchAllAction(): Response
    {
        return $this->render('@PimcoreStudioUi/default/index.html.twig');
    }
}
