/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { TabManager } from '@Pimcore/modules/element/editor/tab-manager/tab-manager'
import { injectable } from 'inversify'

@injectable()
export class PageTabManager extends TabManager {
  constructor () {
    super()
    this.type = 'page'
  }
}
