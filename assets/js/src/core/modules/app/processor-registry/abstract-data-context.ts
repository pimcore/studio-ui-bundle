/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/**
 * Abstract base class for contexts that need to manipulate data objects
 * Provides generic field manipulation methods that work with any object type
 */
export abstract class AbstractDataContext<TData extends Record<string, any>> {
  constructor (protected data: TData) {}

  /**
   * Add or update a field in the data
   */
  setField<K extends keyof TData>(
    key: K,
    value: TData[K]
  ): void {
    this.data[key] = value
  }

  /**
   * Get a field from the data
   */
  getField<K extends keyof TData>(
    key: K
  ): TData[K] {
    return this.data[key]
  }

  /**
   * Check if a field exists in the data
   */
  hasField<K extends keyof TData>(key: K): boolean {
    return key in this.data
  }

  /**
   * Get the entire data object
   */
  getData (): TData {
    return this.data
  }
}
