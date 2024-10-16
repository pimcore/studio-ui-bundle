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
import { type DynamicTypeListingAbstract } from './dynamic-type-listing-abstract'

@injectable()
export class DynamicTypeListingRegistry {
  private readonly dynamicTypes = new Map<string, DynamicTypeListingAbstract>()

  registerDynamicType (type: DynamicTypeListingAbstract): void {
    if (this.dynamicTypes.has(type.id)) {
      throw new Error(`Dynamic type with id "${type.id}" already exists`)
    }

    this.dynamicTypes.set(type.id, type)
  }

  overrideDynamicType (type: DynamicTypeListingAbstract): void {
    if (!this.dynamicTypes.has(type.id)) {
      throw new Error(`Dynamic type with id "${type.id}" not found`)
    }

    this.dynamicTypes.set(type.id, type)
  }

  getDynamicType (id: string): DynamicTypeListingAbstract {
    if (!this.dynamicTypes.has(id)) {
      throw new Error(`Dynamic type with id "${id}" not found`)
    }

    return this.dynamicTypes.get(id)!
  }
}
