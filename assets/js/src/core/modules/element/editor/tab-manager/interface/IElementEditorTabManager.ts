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

import { type IElementEditorTab } from '@Pimcore/modules/element/editor/tab-manager/interface/types/IElementEditorTab'
import { type IEditorTabManager } from '@Pimcore/modules/element/editor/tab-manager/interface/IEditorTabManager'

export interface IElementEditorTabManager extends IEditorTabManager {
  tabs: IElementEditorTab[]
  getTabs: () => IElementEditorTab[]
  getTab: (key: string) => IElementEditorTab | undefined
  register: (tab: IElementEditorTab) => void
}
