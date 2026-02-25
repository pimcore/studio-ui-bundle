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

export interface AddOverlayTransformationConfig {
  asset?: number
  path?: string
  x?: number
  y?: number
  origin?: string
  alpha?: number
}

@injectable()
export class AddOverlayTransformationType extends TransformationDynamicTypeAbstract {
  readonly id = 'addOverlay'

  getName (): string {
    return this.id
  }

  getLabel (): string {
    return 'Add Overlay'
  }

  getFieldConfig (): FieldConfig[] {
    return [
      this.createImagePickerFieldConfig('asset', 'Overlay Image'),
      this.createNumberFieldConfig('x', 'X Position', 'Horizontal position in pixels', 0),
      this.createNumberFieldConfig('y', 'Y Position', 'Vertical position in pixels', 0),
      this.createSelectFieldConfig('origin', 'Origin', [
        { value: 'top-left', label: 'Top Left' },
        { value: 'top-right', label: 'Top Right' },
        { value: 'center', label: 'Center' },
        { value: 'bottom-left', label: 'Bottom Left' },
        { value: 'bottom-right', label: 'Bottom Right' }
      ], 'top-left'),
      this.createSliderFieldConfig('alpha', 'Opacity', 0, 100, 100)
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

  private createSliderFieldConfig (
    name: string,
    label: string,
    min: number,
    max: number,
    defaultValue: number
  ): FieldConfig {
    return this.createFieldConfig(name, 'slider', label, {
      defaultValue,
      props: {
        min,
        max,
        showValue: true,
        style: { width: '100%' }
      }
    })
  }
}
