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

export interface SetBackgroundImageTransformationConfig {
  asset?: number
  path?: string
  mode?: string
}

@injectable()
export class SetBackgroundImageTransformationType extends TransformationDynamicTypeAbstract {
  readonly id = 'setBackgroundImage'

  getName (): string {
    return this.id
  }

  getLabel (): string {
    return 'Set Background Image'
  }

  getFieldConfig (): FieldConfig[] {
    return [
      this.createImagePickerFieldConfig('asset', 'Background Image'),
      this.createSelectFieldConfig('mode', 'Mode', [
        { value: '', label: 'fit' },
        { value: 'cropTopLeft', label: 'cropTopLeft' },
        { value: 'asTexture', label: 'asTexture' }
      ], '')
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
