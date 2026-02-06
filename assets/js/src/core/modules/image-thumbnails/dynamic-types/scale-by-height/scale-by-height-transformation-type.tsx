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
import { Icon } from '@Pimcore/components/icon/icon'
import React from 'react'

export interface ScaleByHeightTransformationConfig {
  height?: number
  forceResize?: boolean
}

export class ScaleByHeightTransformationType extends TransformationDynamicTypeAbstract implements TransformationDynamicTypeInterface {
  getSubGroup (): string {
    return 'scaling'
  }

  getName (): string {
    return 'scaleByHeight'
  }

  getLabel (): string {
    return 'Scale by Height'
  }

  getIcon (): React.ReactNode {
    return <Icon value="arrows-alt-v" />
  }

  getFieldConfig (): FieldConfig[] {
    return [
      this.createNumberFieldConfig('height', 'Height', '600', 600),
      this.createBooleanFieldConfig('forceResize', 'Force Resize', false)
    ]
  }
}