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

import React from 'react'
import { type TransformationDynamicTypeInterface, type FieldConfig } from './transformation-dynamic-type-interface'


export abstract class TransformationDynamicTypeAbstract implements TransformationDynamicTypeInterface {
  abstract getName(): string
  abstract getLabel(): string  
  abstract getIcon(): React.ReactNode
  abstract getFieldConfig(): FieldConfig[]

  getGroup(): string { 
    return 'main' 
  }

  getSubGroup(): string { 
    return 'transformations' 
  }

  validateConfig(config: any): boolean { 
    return true 
  }

  configureTransformation(config: any): Promise<any | null> {
    return Promise.resolve(this.createDefaultConfig())
  }

  createDefaultConfig(): any {
    return this.getFieldConfig().reduce((config, field) => {
      config[field.name] = field.defaultValue
      return config
    }, {} as any)
  }

  protected createFieldConfig(
    name: string, 
    type: FieldConfig['type'], 
    label: string, 
    options?: Partial<FieldConfig>
  ): FieldConfig {
    return {
      name,
      type,
      label,
      defaultValue: undefined,
      required: false,
      ...options
    }
  }

  protected createSelectFieldConfig(
    name: string, 
    label: string, 
    options: Array<{ value: any; label: string }>, 
    defaultValue?: any
  ): FieldConfig {
    return this.createFieldConfig(name, 'select', label, {
      options,
      defaultValue: defaultValue ?? options[0]?.value,
      props: { placeholder: `Select ${label.toLowerCase()}` }
    })
  }

  protected createNumberFieldConfig(
    name: string, 
    label: string, 
    placeholder?: string, 
    defaultValue?: number
  ): FieldConfig {
    return this.createFieldConfig(name, 'number', label, {
      defaultValue,
      props: { 
        placeholder, 
        min: 1,
        style: { width: '100%' }
      }
    })
  }

  protected createBooleanFieldConfig(
    name: string, 
    label: string, 
    defaultValue: boolean = false
  ): FieldConfig {
    return this.createFieldConfig(name, 'boolean', label, {
      defaultValue,
      props: { labelRight: label }
    })
  }
}