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

namespace Pimcore\Bundle\StudioUiBundle\Document\Exception;

use Exception;

/**
 * @internal
 */
final class DocumentVersionNotFoundException extends Exception
{
    public function __construct(int $versionId)
    {
        parent::__construct('Version with id [' . $versionId . "] doesn't exist");
    }
}