/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { injectable } from 'inversify'
import { DynamicTypeAbstract } from '@Pimcore/modules/element/dynamic-types/registry/dynamic-type-registry-abstract'
import { type TransformationDynamicTypeInterface, type FieldConfig } from './transformation-dynamic-type-interface'

@injectable()
export abstract class TransformationDynamicTypeAbstract extends DynamicTypeAbstract implements TransformationDynamicTypeInterface {
  abstract readonly id: string

  abstract getName (): string
  abstract getLabel (): string
  abstract getFieldConfig (): FieldConfig[]

  getId (): string {
    return this.id
  }

  validateConfig (config: any): boolean {
    return true
  }

  async configureTransformation (config: any): Promise<any | null> {
    return await Promise.resolve(this.createDefaultConfig())
  }

  createDefaultConfig (): any {
    return this.getFieldConfig().reduce<any>((config, field) => {
      config[field.name] = field.defaultValue
      return config
    }, {})
  }

  protected createFieldConfig (
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

  protected createSelectFieldConfig (
    name: string,
    label: string,
    options: Array<{ value: any, label: string }>,
    defaultValue?: any
  ): FieldConfig {
    return this.createFieldConfig(name, 'select', label, {
      options,
      defaultValue: defaultValue ?? options[0]?.value,
      props: { placeholder: `Select ${label.toLowerCase()}` }
    })
  }

  protected createNumberFieldConfig (
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

  protected createBooleanFieldConfig (
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
