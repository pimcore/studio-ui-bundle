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

import type React from 'react'

export interface ISidebarEntry {
  key: string
  icon: React.JSX.Element
  component: React.JSX.Element
}

export interface ISidebarButton {
  key: string
  icon: React.JSX.Element
  component: React.JSX.Element
}

export abstract class SidebarManager {
  entries: ISidebarEntry[] = []
  buttons: ISidebarButton[] = []

  getEntries (): ISidebarEntry[] {
    return this.entries
  }

  getEntry (key: string): ISidebarEntry | undefined {
    return this.entries.find((entry) => entry.key === key)
  }

  registerEntry (entry: ISidebarEntry): void {
    if (this.getEntry(entry.key) !== undefined) {
      this.entries.splice(this.entries.findIndex((e) => e.key === entry.key), 1, entry)
      return
    }

    this.entries.push(entry)
  }

  getButtons (): ISidebarButton[] {
    return this.buttons
  }

  getButton (key: string): ISidebarButton | undefined {
    return this.buttons.find((button) => button.key === key)
  }

  registerButton (button: ISidebarButton): void {
    if (this.getButton(button.key) !== undefined) {
      this.buttons.splice(this.buttons.findIndex((e) => e.key === button.key), 1, button)
      return
    }

    this.buttons.push(button)
  }
}
