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

import { type ComponentType } from 'react'
import { type DefaultCellProps } from '../columns/default-cell'
import { injectable } from 'inversify'

interface ITypeRegistryConfig {
  type: string
  component: ComponentType<DefaultCellProps>

}

export interface ITypeRegistry {
  registerType: (config: ITypeRegistryConfig) => void
  getType: (type: string) => ComponentType<DefaultCellProps>
}

@injectable()
export class TypeRegistry implements ITypeRegistry {
  private registry: Record<string, ComponentType<DefaultCellProps>> = {}

  public registerType (config: ITypeRegistryConfig): void {
    this.registry[config.type] = config.component
  }

  public getType (type: string): ComponentType<DefaultCellProps> {
    return this.registry[type]
  }
}
