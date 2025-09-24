/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type React from 'react'

export interface ISidebarEntry<T = any> {
  key: string
  icon: React.JSX.Element
  component: React.JSX.Element
  tooltip?: string
  isVisible?: (context?: T) => boolean
}

export interface ISidebarButton {
  key: string
  icon: React.JSX.Element
  component: React.JSX.Element
}

export abstract class SidebarManager<T = any> {
  entries: Array<ISidebarEntry<T>> = []
  buttons: ISidebarButton[] = []

  getEntries (): Array<ISidebarEntry<T>> {
    return this.entries
  }

  getVisibleEntries (context?: T): Array<ISidebarEntry<T>> {
    return this.entries.filter(entry => {
      // If no isVisible function is provided, the entry is always visible
      if (entry.isVisible === undefined) {
        return true
      }

      try {
        return entry.isVisible(context)
      } catch (error) {
        console.warn(`Error checking visibility for sidebar entry "${entry.key}":`, error)
        return false
      }
    })
  }

  getEntry (key: string): ISidebarEntry<T> | undefined {
    return this.entries.find((entry) => entry.key === key)
  }

  registerEntry (entry: ISidebarEntry<T>): void {
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
