/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

export interface ValueType { type: string, data: any }

export interface DocumentEditableApi {
  getValues: () => Record<string, ValueType>
  getValue: (key: string) => ValueType
  updateValue: (key: string, value: ValueType) => void
  initializeValues: (initialValues: Record<string, ValueType>) => void
}

class DocumentEditableApiImpl implements DocumentEditableApi {
  private values: Record<string, ValueType> = {}

  getValues (): Record<string, ValueType> {
    return { ...this.values }
  }

  getValue (key: string): ValueType {
    return this.values[key]
  }

  updateValue (key: string, value: ValueType): void {
    this.values[key] = value
  }

  initializeValues (initialValues: Record<string, ValueType>): void {
    Object.assign(this.values, initialValues)
  }
}

export const documentEditableApi = new DocumentEditableApiImpl()
