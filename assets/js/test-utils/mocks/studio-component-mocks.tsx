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
 * Plain HTML stand-ins for Studio components whose style hooks pull in untranspiled ESM (antd-style).
 * Use them from a jest.mock factory: jest.mock('@Pimcore/components/tag/tag', () => jest.requireActual('@test-utils/mocks/studio-component-mocks')).
 */

import React from 'react'

interface ChildrenProps {
  children?: React.ReactNode
}

interface ClickableProps extends ChildrenProps {
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  title?: string
}

export const Button = ({ children, onClick, disabled, title }: ClickableProps): React.JSX.Element => (
  <button
    disabled={ disabled === true }
    onClick={ onClick }
    title={ title }
    type="button"
  >{children}</button>
)

export const IconButton = Button
export const IconTextButton = Button

export const Content = ({ children, loading, none }: ChildrenProps & { loading?: boolean, none?: boolean }): React.JSX.Element => (
  <div data-testid={ loading === true ? 'content-loading' : none === true ? 'content-none' : 'content' }>{children}</div>
)

export const ContentLayout = ({ children, renderToolbar }: ChildrenProps & { renderToolbar?: React.ReactNode }): React.JSX.Element => (
  <div>{renderToolbar}{children}</div>
)

export const Toolbar = ({ children }: ChildrenProps): React.JSX.Element => <div role="toolbar">{children}</div>
export const Flex = ({ children }: ChildrenProps): React.JSX.Element => <div>{children}</div>
export const Text = ({ children }: ChildrenProps): React.JSX.Element => <span>{children}</span>
export const Tag = ({ children }: ChildrenProps): React.JSX.Element => <span data-testid="tag">{children}</span>
export const Alert = ({ message, description }: { message?: React.ReactNode, description?: React.ReactNode }): React.JSX.Element => (
  <div role="alert">{message}{description}</div>
)

export const FormattedDateTime = ({ timestamp }: { timestamp: number }): React.JSX.Element => (
  <span>{`date:${timestamp}`}</span>
)

interface InputProps {
  value?: string | null
  placeholder?: string
  readOnly?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input = ({ value, placeholder, readOnly, onChange }: InputProps): React.JSX.Element => (
  <input
    aria-label={ placeholder }
    onChange={ onChange }
    readOnly={ readOnly }
    value={ value ?? '' }
  />
)

export const SearchInput = Input

export const InputNumber = ({ value, placeholder, onChange }: {
  value?: number | null
  placeholder?: string
  onChange?: (value: number | null) => void
}): React.JSX.Element => (
  <input
    aria-label={ placeholder }
    onChange={ (event) => { onChange?.(event.target.value === '' ? null : Number(event.target.value)) } }
    type="number"
    value={ value ?? '' }
  />
)

interface SelectProps {
  value?: unknown
  placeholder?: string
  mode?: string
  options?: Array<{ value: string | number, label: React.ReactNode }>
  onChange?: (value: unknown) => void
}

export const Select = ({ value, placeholder, mode, options = [], onChange }: SelectProps): React.JSX.Element => {
  const multiple = mode === 'multiple'
  const selected = multiple ? (value as Array<string | number> ?? []).map(String) : String(value ?? '')

  return (
    <select
      aria-label={ placeholder }
      multiple={ multiple }
      onChange={ (event) => {
        const values = Array.from(event.target.selectedOptions).map((option) => {
          const match = options.find((item) => String(item.value) === option.value)
          return match?.value
        })
        onChange?.(multiple ? values : values[0])
      } }
      value={ selected }
    >
      {!multiple && <option value="" />}
      {options.map((option) => (
        <option
          key={ String(option.value) }
          value={ String(option.value) }
        >{option.label}</option>
      ))}
    </select>
  )
}

interface ModalProps extends ChildrenProps {
  open?: boolean
  title?: React.ReactNode
  footer?: React.ReactNode
  okText?: React.ReactNode
  cancelText?: React.ReactNode
  okButtonProps?: { disabled?: boolean, loading?: boolean }
  onOk?: () => void
  onCancel?: () => void
}

export const Modal = ({ open, title, children, footer, okText, cancelText, okButtonProps, onOk, onCancel }: ModalProps): React.JSX.Element | null => {
  if (open !== true) {
    return null
  }

  return (
    <div role="dialog">
      <div>{title}</div>
      {children}
      {footer ?? (
        <>
          <button
            onClick={ onCancel }
            type="button"
          >{cancelText ?? 'cancel'}</button>
          <button
            disabled={ okButtonProps?.disabled === true }
            onClick={ onOk }
            type="button"
          >{okText ?? 'ok'}</button>
        </>
      )}
    </div>
  )
}

export const Tabs = ({ items = [] }: { items?: Array<{ key: string, label: React.ReactNode, children?: React.ReactNode }> }): React.JSX.Element => (
  <div>
    {items.map((item) => (
      <section
        aria-label={ String(item.key) }
        key={ item.key }
      >
        <h3>{item.label}</h3>
        {item.children}
      </section>
    ))}
  </div>
)
