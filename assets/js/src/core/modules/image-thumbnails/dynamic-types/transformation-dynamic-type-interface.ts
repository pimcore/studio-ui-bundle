/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { DynamicTypeAbstract } from '@Pimcore/modules/element/dynamic-types/registry/dynamic-type-registry-abstract'

export interface FieldConfig {
  name: string
  type: 'number' | 'select' | 'boolean' | 'text' | 'slider' | 'color-picker' | 'image-picker'
  label: string
  defaultValue?: any
  required?: boolean
  props?: Record<string, any>
  options?: Array<{ value: any, label: string }>
}

export interface TransformationDynamicTypeInterface extends DynamicTypeAbstract {
  getId: () => string
  getName: () => string
  getLabel: () => string
  getFieldConfig: () => FieldConfig[]
  createDefaultConfig: () => any
  validateConfig: (config: any) => boolean
  configureTransformation: (config: any) => Promise<any | null>
}
