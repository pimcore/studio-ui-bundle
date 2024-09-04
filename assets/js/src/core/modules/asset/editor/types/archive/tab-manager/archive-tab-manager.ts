/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { TabManager } from '@Pimcore/modules/element/editor/tab-manager/tab-manager'
import { type IAssetEditorTabManager } from '@Pimcore/modules/element/editor/tab-manager/interface/IAssetEditorTabManager'

export class ArchiveTabManager extends TabManager implements IAssetEditorTabManager {
  constructor () {
    super()
    this.type = 'archive'
  }
}
