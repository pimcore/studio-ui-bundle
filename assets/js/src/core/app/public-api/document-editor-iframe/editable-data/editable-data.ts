/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

export interface DocumentEditableApi {
  getValues: () => Record<string, any>
  getValue: (key: string) => any
  updateValue: (key: string, value: any) => void
  initializeValues: (initialValues: Record<string, any>) => void
}

class DocumentEditableApiImpl implements DocumentEditableApi {
  private values: Record<string, any> = {}

  getValues (): Record<string, any> {
    return { ...this.values }
  }

  getValue (key: string): any {
    return this.values[key]
  }

  updateValue (key: string, value: any): void {
    this.values[key] = value
  }

  initializeValues (initialValues: Record<string, any>): void {
    Object.assign(this.values, initialValues)
  }
}

export const documentEditableApi = new DocumentEditableApiImpl()
