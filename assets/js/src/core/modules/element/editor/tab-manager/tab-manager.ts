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

import { type IEditorTabManager } from '@Pimcore/modules/element/editor/tab-manager/interface/IEditorTabManager'
import { type IEditorTab } from '@Pimcore/modules/element/editor/tab-manager/interface/IEditorTab'
import { injectable } from 'inversify'

@injectable()
export abstract class TabManager implements IEditorTabManager {
  type: string = ''
  tabs: IEditorTab[] = []

  getTabs (): IEditorTab[] {
    return this.tabs
  }

  getTab (key: string): IEditorTab | undefined {
    return this.tabs.find((tab) => tab.key === key)
  }

  register (tab: IEditorTab): void {
    if (this.getTab(tab.key) !== undefined) {
      this.tabs.splice(this.tabs.findIndex((t) => t.key === tab.key), 1, tab)
      return
    }

    this.tabs.push(tab)
  }
}
