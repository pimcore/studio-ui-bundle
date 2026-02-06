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

export interface TrimTransformationConfig {
  trim?: 'disabled' | 'left' | 'right' | 'both'
}

export class TrimTransformationType extends TransformationDynamicTypeAbstract implements TransformationDynamicTypeInterface {
  getSubGroup (): string {
    return 'trim'
  }

  getName (): string {
    return 'trim'
  }

  getLabel (): string {
    return 'Trim'
  }

  getIcon (): React.ReactNode {
    return <Icon value="cut" />
  }

  getFieldConfig (): FieldConfig[] {
    return [
      this.createSelectFieldConfig('trim', 'Trim Mode', [
        { value: 'disabled', label: 'Disabled' },
        { value: 'left', label: 'Left' },
        { value: 'right', label: 'Right' },
        { value: 'both', label: 'Both' }
      ], 'disabled')
    ]
  }
}