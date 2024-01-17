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

namespace Pimcore\Bundle\xTemplateBundlex\Controller;

use Symfony\Component\HttpFoundation\Response;

final class DefaultController
{
    public function defaultAction(): Response
    {
        return new Response('Hello Pimcore Bundle');
    }
}
