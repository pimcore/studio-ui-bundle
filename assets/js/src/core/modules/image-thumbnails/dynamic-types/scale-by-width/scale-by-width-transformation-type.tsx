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

export interface ScaleByWidthTransformationConfig {
  width?: number
  forceResize?: boolean
}

@injectable()
export class ScaleByWidthTransformationType extends TransformationDynamicTypeAbstract {
  readonly id = 'scaleByWidth'

  getName (): string {
    return this.id
  }

  getLabel (): string {
    return 'Scale by Width'
  }

  getFieldConfig (): FieldConfig[] {
    return [
      this.createNumberFieldConfig('width', 'Width', '800', 800),
      this.createBooleanFieldConfig('forceResize', 'Force Resize', false)
    ]
  }
}