/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - Pimcore Open Core License (POCL)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 * @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 * @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
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

  private createImagePickerFieldConfig(
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