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

import type { DynamicTypeAbstract } from '@Pimcore/modules/element/dynamic-types/registry/dynamic-type-registry-abstract'

export interface FieldConfig {
  name: string
  type: 'number' | 'select' | 'boolean' | 'text' | 'slider' | 'color-picker' | 'image-picker'
  label: string
  defaultValue?: any
  required?: boolean
  props?: Record<string, any>
  options?: Array<{ value: any; label: string }>
}

export interface TransformationDynamicTypeInterface extends DynamicTypeAbstract {
  getId(): string
  getName(): string
  getLabel(): string
  getFieldConfig(): FieldConfig[]
  createDefaultConfig(): any
  validateConfig(config: any): boolean
  configureTransformation(config: any): Promise<any | null>
}