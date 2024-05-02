/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*/

import { TabManager } from '@Pimcore/modules/element/editor/tab-manager/tab-manager'

export class FolderTabManager extends TabManager {
  constructor () {
    super()
    this.type = 'folder'
  }
}
