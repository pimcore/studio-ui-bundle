/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type IElementEditorTab } from '@Pimcore/modules/element/editor/tab-manager/interface/types/IElementEditorTab'
import { type IEditorTabManager } from '@Pimcore/modules/element/editor/tab-manager/interface/IEditorTabManager'

export interface IElementEditorTabManager extends IEditorTabManager {
  tabs: IElementEditorTab[]
  getTabs: () => IElementEditorTab[]
  getTab: (key: string) => IElementEditorTab | undefined
  register: (tab: IElementEditorTab) => void
}
