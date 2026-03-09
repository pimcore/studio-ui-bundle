/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type FormItemProps } from 'antd'
import React, { useCallback, useEffect, useId, useMemo, useRef } from 'react'
import { ItemProvider } from './provider/item/item-provider'
import { useStyles } from './virtual-item.styles'
import { Space } from '@Pimcore/components/space/space'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import { Icon } from '@Pimcore/components/icon/icon'
import { useVirtualValidation } from './hooks/use-virtual-validation'
import { useFormInstance } from '@Pimcore/components/form/use-form'
import { useVirtualValidatorRegistry } from './hooks/use-virtual-validator-registry'

export interface VirtualItemProps extends FormItemProps {
  children?: React.ReactNode
}

function nameToString (name: FormItemProps['name']): string {
  if (name === undefined || name === null) return ''
  if (Array.isArray(name)) return name.join('.')
  return String(name)
}

function toNamePath (name: FormItemProps['name']): Array<string | number> {
  if (name === undefined || name === null) return []
  if (Array.isArray(name)) return name
  return [name]
}

export const VirtualItem = ({ children, ...props }: VirtualItemProps): React.JSX.Element => {
  const { label, className, hidden, id, rules, validateTrigger, name } = props
  const { styles } = useStyles()
  const formInstance = useFormInstance()
  const registry = useVirtualValidatorRegistry()
  const mountId = useId()

  const fieldName = useMemo(() => nameToString(name), [name])

  const { validationState, validate } = useVirtualValidation(
    rules,
    validateTrigger,
    fieldName,
    formInstance
  )

  // Keep a ref to the latest validate fn so the registry entry never goes stale
  const validateRef = useRef(validate)
  validateRef.current = validate

  // Keep a ref to the current field value. Seeded from the live form store at mount time so
  // that submit-time validation sees the initial/default value even if the user never touched
  // the field. Updated on every subsequent change via onUpdateCurrentValue.
  const currentValueRef = useRef<unknown>(
    formInstance !== null ? formInstance.getFieldValue(toNamePath(name)) : undefined
  )

  const onUpdateCurrentValue = useCallback((value: unknown): void => {
    currentValueRef.current = value
  }, [])

  // Register this virtual field in the registry so submit-time validateAll() can reach it.
  // The registry key combines the field name with a stable per-mount id so two items with
  // the same name (e.g. inside different list rows) are tracked independently.
  useEffect(() => {
    if (registry === null || rules == null || rules.length === 0) {
      return
    }

    const registryKey = `${fieldName}::${mountId}`

    registry.register(registryKey, toNamePath(name), async () => await validateRef.current(currentValueRef.current))

    return () => {
      registry.unregister(registryKey)
    }
  }, [registry, fieldName, mountId, rules])

  const isRequired = useMemo(() => {
    if (rules !== undefined && Array.isArray(rules)) {
      return rules.some(rule => 'required' in rule && rule.required)
    }
    return false
  }, [rules])

  const wrapperClassName = [
    className,
    styles.virtualItem,
    validationState.validateStatus !== '' ? `virtual-item--${validationState.validateStatus}` : ''
  ].filter(Boolean).join(' ')

  const itemWithValidation = useMemo(() => ({
    ...props,
    validationState,
    onValidate: validate,
    onUpdateCurrentValue
  }), [props, validationState, validate, onUpdateCurrentValue])

  return (
    <ItemProvider item={ itemWithValidation }>
      <div
        className={ wrapperClassName }
        style={ { display: hidden === true ? 'none' : 'block' } }
      >
        {label !== undefined && (
          <div className="virtual-item__label">
            <Space size="mini">
              <label htmlFor={ id }>
                <Space size="extra-small">
                  {label}

                  {props.tooltip !== undefined && props.tooltip !== null && (
                    <Tooltip
                      className='virtual-item__tooltip'
                      title={ typeof props.tooltip === 'object' && 'title' in props.tooltip ? props.tooltip.title : undefined }
                    >
                      {typeof props.tooltip === 'object' && 'icon' in props.tooltip
                        ? props.tooltip.icon
                        : (
                          <Icon
                            options={ { width: 14, height: 14 } }
                            value="info-circle"
                          />
                          )}
                    </Tooltip>
                  )}
                </Space>
              </label>
              {isRequired && <span className="required-indicator">*</span>}
            </Space>
          </div>
        )}

        <div>
          {children}
        </div>

        {validationState.errors.length > 0 && (
          <div className="virtual-item__explain virtual-item__explain--error">
            {validationState.errors.map((error, index) => (
              <div
                className="virtual-item__explain-item"
                key={ index }
              >
                {error}
              </div>
            ))}
          </div>
        )}

        {validationState.errors.length === 0 && validationState.warnings.length > 0 && (
          <div className="virtual-item__explain virtual-item__explain--warning">
            {validationState.warnings.map((warning, index) => (
              <div
                className="virtual-item__explain-item"
                key={ index }
              >
                {warning}
              </div>
            ))}
          </div>
        )}
      </div>
    </ItemProvider>
  )
}
