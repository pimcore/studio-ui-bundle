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

export interface ApplyMaskTransformationConfig {
  asset?: number
  path?: string
}

@injectable()
export class ApplyMaskTransformationType extends TransformationDynamicTypeAbstract {
  readonly id = 'applyMask'

  getName (): string {
    return this.id
  }

  getLabel (): string {
    return 'Apply Mask'
  }

  getFieldConfig (): FieldConfig[] {
    return [
      this.createImagePickerFieldConfig('asset', 'Mask Image')
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
