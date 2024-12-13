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

@injectable()
export abstract class DynamicTypeAbstract {
  abstract readonly id: string
}

@injectable()
export abstract class DynamicTypeRegistryAbstract<GenericDynamicTypeAbstract extends DynamicTypeAbstract> {
  protected readonly dynamicTypes = new Map<string, GenericDynamicTypeAbstract>()

  registerDynamicType (type: GenericDynamicTypeAbstract): void {
    if (this.dynamicTypes.has(type.id)) {
      trackError(new GeneralError(`Dynamic type with id "${type.id}" already exists`))
    }

    this.dynamicTypes.set(type.id, type)
  }

  getDynamicType (id: string): GenericDynamicTypeAbstract {
    const dynamicType = this.dynamicTypes.get(id)

    if (dynamicType === undefined) {
      trackError(new GeneralError(`Dynamic type with id "${id}" not found`))
    }

    return dynamicType!
  }

  getDynamicTypes (): GenericDynamicTypeAbstract[] {
    return Array.from(this.dynamicTypes.values())
  }

  overrideDynamicType (type: GenericDynamicTypeAbstract): void {
    if (!this.dynamicTypes.has(type.id)) {
      trackError(new GeneralError(`Dynamic type with id "${type.id}" not found`))
    }

    this.dynamicTypes.set(type.id, type)
  }

  hasDynamicType (id: string): boolean {
    return this.dynamicTypes.has(id)
  }
}
