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
import { TransformationDynamicTypeAbstract } from '../transformation-dynamic-type-abstract'
import { type FieldConfig } from '../transformation-dynamic-type-interface'

export interface AddOverlayFitTransformationConfig {
  asset?: number
  path?: string
  origin?: string
}

@injectable()
export class AddOverlayFitTransformationType extends TransformationDynamicTypeAbstract {
  readonly id = 'addOverlayFit'

  getName (): string {
    return this.id
  }

  getLabel (): string {
    return 'Add Overlay Fit'
  }

  getFieldConfig (): FieldConfig[] {
    return [
      this.createImagePickerFieldConfig('asset', 'Overlay Image'),
      this.createSelectFieldConfig('origin', 'Origin', [
        { value: 'center', label: 'Center' },
        { value: 'top-left', label: 'Top Left' },
        { value: 'top-right', label: 'Top Right' },
        { value: 'bottom-left', label: 'Bottom Left' },
        { value: 'bottom-right', label: 'Bottom Right' }
      ], 'center')
    ]
  }

  private createImagePickerFieldConfig (
    name: string,
    label: string
  ): FieldConfig {
    return this.createFieldConfig(name, 'image-picker', label, {
      defaultValue: null,
      props: {
        width: 300,
        height: 150,
        type: 'add',
        allowedTypes: ['image']
      }
    })
  }
}
