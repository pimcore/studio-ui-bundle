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

import { TransformationDynamicTypeAbstract } from '../transformation-dynamic-type-abstract'
import { type TransformationDynamicTypeInterface, type FieldConfig } from '../transformation-dynamic-type-interface'

export interface FrameTransformationConfig {
  width?: number
  height?: number
  forceResize?: boolean
}

export class FrameTransformationType extends TransformationDynamicTypeAbstract implements TransformationDynamicTypeInterface {
  getName (): string {
    return 'frame'
  }

  getLabel (): string {
    return 'Frame'
  }

  getFieldConfig (): FieldConfig[] {
    return [
      this.createNumberFieldConfig('width', 'Width', 'Enter width value'),
      this.createNumberFieldConfig('height', 'Height', 'Enter height value'),
      this.createBooleanFieldConfig('forceResize', 'Force Resize', false)
    ]
  }
}