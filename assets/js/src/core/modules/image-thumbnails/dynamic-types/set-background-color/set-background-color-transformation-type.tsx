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

export interface SetBackgroundColorTransformationConfig {
  color?: string
}

@injectable()
export class SetBackgroundColorTransformationType extends TransformationDynamicTypeAbstract {
  readonly id = 'setBackgroundColor'

  getName (): string {
    return this.id
  }

  getLabel (): string {
    return 'Set Background Color'
  }

  getFieldConfig (): FieldConfig[] {
    return [
      this.createColorFieldConfig('color', 'Background Color', '#ffffff')
    ]
  }

  private createColorFieldConfig(
    name: string,
    label: string,
    defaultValue: string
  ): FieldConfig {
    return this.createFieldConfig(name, 'color-picker', label, {
      defaultValue,
      props: {
        format: 'hex',
        showText: true,
        style: { width: '100%' }
      }
    })
  }
}