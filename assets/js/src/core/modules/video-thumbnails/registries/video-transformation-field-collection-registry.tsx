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
import type { VideoTransformationDynamicTypeRegistry } from '../dynamic-types/video-transformation-dynamic-type-registry'
import { VideoTransformationFieldCollectionItem } from '../components/transformation-field-collection-item'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'

export class VideoTransformationFieldCollectionRegistry extends FieldCollectionRegistry {
  constructor (private readonly transformationRegistry: VideoTransformationDynamicTypeRegistry) {
    super()
    this.adaptTransformationTypes()
  }

  private adaptTransformationTypes (): void {
    const transformationItems = this.transformationRegistry.getDynamicTypes()

    transformationItems.forEach(transformation => {
      const registryItem: FieldCollectionRegistryItem = {
        type: transformation.getId(),
        key: transformation.getId(),
        translationKey: transformation.getLabel(),
        component: React.createElement(VideoTransformationFieldCollectionItem, {
          transformationType: transformation.getId()
        })
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

  public getTransformationRegistry (): VideoTransformationDynamicTypeRegistry {
    return this.transformationRegistry
  }
}
