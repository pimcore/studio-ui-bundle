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
import { TransformationFieldCollectionItem } from '../components/transformation-field-collection-item'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'

export class TransformationFieldCollectionRegistry extends FieldCollectionRegistry {
  private isAdapted: boolean = false

  constructor(private readonly transformationRegistry: TransformationDynamicTypeRegistry) {
    super()
  }

  private ensureAdapted(): void {
    if (!this.isAdapted && this.transformationRegistry.getDynamicTypes().length > 0) {
      this.adaptTransformationTypes()
      this.isAdapted = true
    }
  }

  private adaptTransformationTypes(): void {
    const transformationItems = this.transformationRegistry.getDynamicTypes()
    
    transformationItems.forEach(transformation => {
      const registryItem: FieldCollectionRegistryItem = {
        type: transformation.getId(),
        key: transformation.getId(), 
        translationKey: transformation.getLabel(), 
        component: React.createElement(TransformationFieldCollectionItem, { 
          transformationType: transformation.getId() 
        })
      }
      
      this.register(registryItem)
    })
  }

  /**
   * Override parent method to ensure lazy adaptation before lookup
   */
  public getItemByType(type: string): FieldCollectionRegistryItem | undefined {
    this.ensureAdapted()
    const item = super.getItemByType(type)
    if (item === undefined) {
      trackError(new GeneralError(`No registry item found for type "${type}"`))
    }
    return item
  }

  /**
   * Override parent method to ensure lazy adaptation before returning items
   */
  public getItems(): FieldCollectionRegistryItem[] {
    this.ensureAdapted()
    return super.getItems()
  }

  /**
   * Get the underlying transformation registry for advanced usage
   */
  public getTransformationRegistry(): TransformationDynamicTypeRegistry {
    return this.transformationRegistry
  }
}