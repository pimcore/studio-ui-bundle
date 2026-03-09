/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { createContext, useContext } from 'react'
import { type VirtualValidationState } from './use-virtual-validation'

/**
 * A zero-argument function that runs all validation rules for one virtual field
 * against its current value and returns the resulting state.
 */
export type VirtualValidatorFn = () => Promise<VirtualValidationState>

/** Shape of one entry in the errorFields array — matches AntD's ValidateErrorEntity.errorFields item. */
export interface VirtualErrorField {
  name: Array<string | number>
  errors: string[]
  warnings: string[]
}

export interface VirtualValidateAllResult {
  hasErrors: boolean
  hasWarnings: boolean
  /** Structured per-field errors, compatible with AntD's errorFields shape. */
  errorFields: VirtualErrorField[]
}

interface RegistryEntry {
  namePath: Array<string | number>
  fn: VirtualValidatorFn
}

export interface VirtualValidatorRegistry {
  register: (key: string, namePath: Array<string | number>, fn: VirtualValidatorFn) => void
  unregister: (key: string) => void
  /** Run every registered validator and return the merged result. */
  validateAll: () => Promise<VirtualValidateAllResult>
}

export const VirtualValidatorRegistryContext = createContext<VirtualValidatorRegistry | null>(null)

/**
 * Creates a stable registry object backed by a Map stored in a plain object ref.
 * Call this once per Form instance (not inside a render cycle).
 */
export function createVirtualValidatorRegistry (): VirtualValidatorRegistry {
  const map = new Map<string, RegistryEntry>()

  return {
    register (key: string, namePath: Array<string | number>, fn: VirtualValidatorFn): void {
      map.set(key, { namePath, fn })
    },

    unregister (key: string): void {
      map.delete(key)
    },

    async validateAll (): Promise<VirtualValidateAllResult> {
      const entries = Array.from(map.entries())

      const results = await Promise.all(
        entries.map(async ([, { namePath, fn }]) => ({
          namePath,
          state: await fn()
        }))
      )

      const errorFields: VirtualErrorField[] = results
        .filter(r => r.state.validateStatus === 'error' || r.state.warnings.length > 0)
        .map(r => ({
          name: r.namePath,
          errors: r.state.errors,
          warnings: r.state.warnings
        }))

      const hasErrors = results.some(r => r.state.validateStatus === 'error')
      const hasWarnings = results.some(r => r.state.validateStatus === 'warning')

      return { hasErrors, hasWarnings, errorFields }
    }
  }
}

export const useVirtualValidatorRegistry = (): VirtualValidatorRegistry | null => {
  return useContext(VirtualValidatorRegistryContext)
}
