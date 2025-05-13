/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { injectable } from 'inversify'
import { type ComponentType } from 'react'

interface AbstractIconLibrary {
  register: ({ name, component }: { name: string, component: ComponentType }) => void
  get: (iconName: string) => ComponentType | undefined
  getIcons: () => Map<string, ComponentType>
}

@injectable()
export class IconLibrary implements AbstractIconLibrary {
  private readonly icons = new Map<string, ComponentType>()

  register ({ name, component }: { name: string, component: ComponentType }): void {
    this.icons.set(name, component)
  }

  get (name: string): ComponentType | undefined {
    return this.icons.get(name)
  }

  getIcons (): Map<string, ComponentType> {
    return this.icons
  }
}
