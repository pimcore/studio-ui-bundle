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

/**
 * Adapter that wraps TransformationDynamicTypeRegistry to work with FieldCollection pattern
 * Maintains all existing transformation dynamic types without modification
 */
export class TransformationFieldCollectionRegistry extends FieldCollectionRegistry {
  constructor(private readonly transformationRegistry: TransformationDynamicTypeRegistry) {
    super()
    this.adaptTransformationTypes()
  }

  /**
   * Converts transformation dynamic types to field collection registry items
   */
  private adaptTransformationTypes(): void {
    const transformationItems = this.transformationRegistry.getAll()
    
    transformationItems.forEach(transformation => {
      const registryItem: FieldCollectionRegistryItem = {
        type: transformation.getId(),
        key: transformation.getId(), // Use getId() as key for consistency
        translationKey: transformation.getLabel(), // Use getLabel() for display
        component: React.createElement(TransformationFieldCollectionItem, { 
          transformationType: transformation.getId() 
        })
      }
      
      this.register(registryItem)
    })
  }

  /**
   * Get the underlying transformation registry for advanced usage
   */
  public getTransformationRegistry(): TransformationDynamicTypeRegistry {
    return this.transformationRegistry
  }
}