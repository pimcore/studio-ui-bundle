/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { AbstractMercureProcess } from '@Pimcore/modules/background-processor/process/abstract-mercure-process'
import { topics } from '@Pimcore/modules/execution-engine/topics'

export class DemoProcess extends AbstractMercureProcess {
  protected name: string = 'demo-process'
  protected description: string = 'Demo process for testing purposes'

  protected topics: string[] = [topics['handler-progress']]
}
