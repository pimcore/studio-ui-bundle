<?php

/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

define('PIMCORE_PROJECT_ROOT', dirname(__DIR__));

const PROJECT_ROOT = PIMCORE_PROJECT_ROOT;

// set the used pimcore/symfony environment
foreach (['APP_ENV' => 'test', 'PIMCORE_SKIP_DOTENV_FILE' => true] as $name => $value) {
    putenv("{$name}={$value}");
    $_ENV[$name] = $_SERVER[$name] = $value;
}
require_once PIMCORE_PROJECT_ROOT . '/vendor/autoload.php';

\Pimcore\Bootstrap::setProjectRoot();
\Pimcore\Bootstrap::bootstrap();
