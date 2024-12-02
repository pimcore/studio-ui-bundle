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
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'

export interface ElementEditorType {
  name: string
  tabManagerServiceId: string
}
export interface TypeRegistryInterface {
  register: (type: ElementEditorType) => void
  get: (name: string) => ElementEditorType
  has: (name: string) => boolean
}

@injectable()
export class TypeRegistry implements TypeRegistryInterface {
  private registry: Record<string, ElementEditorType> = {}

  register (type: ElementEditorType): void {
    if (this.has(type.name)) {
      trackError(new GeneralError(`Type with the name "${type.name}" already exists.`))
    }

    this.registry[type.name] = type
  }

  get (name: string): ElementEditorType {
    if (!this.has(name)) {
      trackError(new GeneralError(`No type with the name "${name}" found`))
    }

    return this.registry[name]
  }

  has (name: string): boolean {
    return name in this.registry
  }
}
