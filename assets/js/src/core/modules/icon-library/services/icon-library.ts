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
