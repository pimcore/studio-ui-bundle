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

export interface BrightnessSaturationTransformationConfig {
  brightness?: number
  saturation?: number
  hue?: number
}

@injectable()
export class BrightnessSaturationTransformationType extends TransformationDynamicTypeAbstract {
  readonly id = 'brightnessSaturation'

  getName (): string {
    return this.id
  }

  getLabel (): string {
    return 'Brightness/Saturation'
  }

  getFieldConfig (): FieldConfig[] {
    return [
      this.createSliderFieldConfig('brightness', 'Brightness', 0, 200, 100),
      this.createSliderFieldConfig('saturation', 'Saturation', 0, 200, 100),
      this.createSliderFieldConfig('hue', 'Hue', 0, 200, 100)
    ]
  }

  private createSliderFieldConfig(
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