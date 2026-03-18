/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { FieldCollectionRegistry, type FieldCollectionRegistryItem } from '@Pimcore/components/form/controls/field-collection/field-collection-registry'
import type { TransformationDynamicTypeRegistry } from '../dynamic-types/transformation-dynamic-type-registry'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'

export class TransformationFieldCollectionRegistry extends FieldCollectionRegistry {
  constructor (private readonly transformationRegistry: TransformationDynamicTypeRegistry) {
    super()
    this.adaptTransformationTypes()
  }

  private adaptTransformationTypes (): void {
    const transformationItems = this.transformationRegistry.getDynamicTypes()

    transformationItems.forEach(transformation => {
      const Component = transformation.getReactComponent()
      const registryItem: FieldCollectionRegistryItem = {
        type: transformation.getId(),
        key: transformation.getId(),
        translationKey: transformation.getLabel(),
        component: React.createElement(Component)
      }

      this.register(registryItem)
    })
  }

  public getItemByType (type: string): FieldCollectionRegistryItem | undefined {
    const item = super.getItemByType(type)
    if (item === undefined) {
      trackError(new GeneralError(`No registry item found for type "${type}"`))
    }
    return item
  }

  /**
   * Get the underlying transformation registry for advanced usage
   */
  public getTransformationRegistry (): TransformationDynamicTypeRegistry {
    return this.transformationRegistry
  }
}
