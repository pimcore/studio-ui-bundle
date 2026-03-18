/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useCallback, useRef, useState } from 'react'
import { type FormInstance, type FormItemProps } from 'antd'
import { type Rule, type RuleObject } from 'rc-field-form/lib/interface'
import Schema from '@rc-component/async-validator'
import { type formInstanceType } from '@Pimcore/components/form/use-form'

export type ValidateStatus = '' | 'success' | 'warning' | 'error' | 'validating'

export interface VirtualValidationState {
  validateStatus: ValidateStatus
  errors: string[]
  warnings: string[]
}

export interface UseVirtualValidationReturn {
  validationState: VirtualValidationState
  validate: (value: unknown) => Promise<VirtualValidationState>
}

const DEFAULT_STATE: VirtualValidationState = {
  validateStatus: '',
  errors: [],
  warnings: []
}

function resolveRuleObject (rule: Rule, formInstance: formInstanceType | null): RuleObject | null {
  if (typeof rule === 'function') {
    if (formInstance === null) {
      return null
    }
    return rule(formInstance as unknown as FormInstance)
  }
  return rule
}

function normalizeTrigger (validateTrigger: FormItemProps['validateTrigger']): string[] {
  if (validateTrigger === undefined || validateTrigger === null || validateTrigger === false) {
    return ['onChange']
  }
  if (Array.isArray(validateTrigger)) {
    return validateTrigger
  }
  return [validateTrigger]
}

export function useVirtualValidation (
  rules: FormItemProps['rules'],
  validateTrigger: FormItemProps['validateTrigger'],
  fieldName: string,
  formInstance: formInstanceType | null
): UseVirtualValidationReturn {
  const [validationState, setValidationState] = useState<VirtualValidationState>(DEFAULT_STATE)

  // Track the current validation sequence to discard stale async results
  const validationSequence = useRef(0)

  const triggers = normalizeTrigger(validateTrigger)

  const validate = useCallback(async (value: unknown): Promise<VirtualValidationState> => {
    if (rules === undefined || rules === null || rules.length === 0) {
      setValidationState(DEFAULT_STATE)
      return DEFAULT_STATE
    }

    const currentSequence = ++validationSequence.current

    setValidationState(prev => ({ ...prev, validateStatus: 'validating' }))

    const errorMessages: string[] = []
    const warningMessages: string[] = []

    const resolvedRules: Array<{ ruleObj: RuleObject, warningOnly: boolean }> = []

    for (const rule of rules) {
      const ruleObj = resolveRuleObject(rule, formInstance)
      if (ruleObj === null) continue
      resolvedRules.push({
        ruleObj,
        warningOnly: ruleObj.warningOnly === true
      })
    }

    await Promise.all(
      resolvedRules.map(async ({ ruleObj, warningOnly }) => {
        const messages = await runSingleRule(fieldName, value, ruleObj)
        if (warningOnly) {
          warningMessages.push(...messages)
        } else {
          errorMessages.push(...messages)
        }
      })
    )

    // Discard stale results from a previous validation run
    if (currentSequence !== validationSequence.current) {
      return DEFAULT_STATE
    }

    const newState: VirtualValidationState = {
      validateStatus: errorMessages.length > 0
        ? 'error'
        : warningMessages.length > 0
          ? 'warning'
          : 'success',
      errors: errorMessages,
      warnings: warningMessages
    }

    setValidationState(newState)
    return newState
  }, [rules, triggers, fieldName, formInstance])

  return { validationState, validate }
}

async function runSingleRule (fieldName: string, value: unknown, rule: RuleObject): Promise<string[]> {
  // Handle function-style validator (validator: async (rule, value) => void)
  if ('validator' in rule && typeof rule.validator === 'function') {
    return await runValidatorFunction(rule, value)
  }

  // Handle schema-based rules via @rc-component/async-validator
  return await runSchemaRule(fieldName, value, rule)
}

async function runValidatorFunction (rule: RuleObject, value: unknown): Promise<string[]> {
  return await new Promise<string[]>((resolve) => {
    if (!('validator' in rule) || typeof rule.validator !== 'function') {
      resolve([])
      return
    }

    const callback = (error?: string | Error): void => {
      if (error !== undefined && error !== null && error !== '') {
        resolve([error instanceof Error ? error.message : String(error)])
      } else {
        resolve([])
      }
    }

    let hasPromise = false

    try {
      const result = (rule.validator as any)(rule, value, callback)
      hasPromise =
        result !== null &&
        result !== undefined &&
        typeof result.then === 'function' &&
        typeof result.catch === 'function'

      if (hasPromise) {
        ;(result as Promise<void>)
          .then(() => { resolve([]) })
          .catch((err: unknown) => {
            if (err !== null && err !== undefined && err !== '') {
              resolve([err instanceof Error ? err.message : String(err)])
            } else {
              resolve([])
            }
          })
      }
    } catch (err: unknown) {
      resolve([err instanceof Error ? err.message : String(err)])
    }
  })
}

async function runSchemaRule (fieldName: string, value: unknown, rule: RuleObject): Promise<string[]> {
  // Suppress the internal async-validator warning function to keep the console clean
  Schema.warning = () => undefined

  const validator = new Schema({ [fieldName]: [rule as any] })

  try {
    await validator.validate({ [fieldName]: value })
    return []
  } catch (err: any) {
    if (err?.errors !== undefined && Array.isArray(err.errors)) {
      return (err.errors as Array<{ message?: string }>)
        .map(e => (typeof e.message === 'string' ? e.message : String(e)))
        .filter(Boolean)
    }
    return []
  }
}
