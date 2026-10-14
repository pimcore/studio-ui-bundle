/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))
jest.mock('@Pimcore/components/form/form', () => ({ Form: jest.requireActual('antd').Form }))
jest.mock('./two-factor-code-field.styles', () => ({ useStyles: () => ({ styles: {} }) }))

// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
// eslint-disable-next-line import/first
import { Form } from 'antd'
// eslint-disable-next-line import/first
import { TwoFactorCodeField, type TwoFactorCodeFormValues } from './two-factor-code-field'

const CodeForm = ({ onSubmit }: { onSubmit: (code: string) => Promise<void> }): React.JSX.Element => {
  const [form] = Form.useForm<TwoFactorCodeFormValues>()

  const handleFinish = async (values: TwoFactorCodeFormValues): Promise<void> => {
    try {
      await onSubmit(values.code)
    } catch {
      form.resetFields()
    }
  }

  return (
    <Form
      form={ form }
      onFinish={ handleFinish }
    >
      <TwoFactorCodeField />
      <button type="submit">verify</button>
    </Form>
  )
}

const hasFieldError = (): boolean => document.querySelector('.ant-form-item-has-error') !== null

const boxes = (): HTMLInputElement[] => Array.from(screen.getByRole('group').querySelectorAll('input'))

const typeCode = (code: string): void => {
  code.split('').forEach((digit, index) => {
    fireEvent.input(boxes()[index], { target: { value: digit } })
  })
}

describe('TwoFactorCodeField', () => {
  it('does not validate while the code is typed, only on submit', async () => {
    const onSubmit = jest.fn(async () => {})
    render(<CodeForm onSubmit={ onSubmit } />)

    typeCode('123')
    await act(async () => { await new Promise((resolve) => setTimeout(resolve, 100)) })
    expect(hasFieldError()).toBe(false)

    fireEvent.click(screen.getByText('verify'))

    expect(await screen.findByText('two-factor-form.code.invalid-format')).toBeTruthy()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('clears a shown error on the next keystroke', async () => {
    render(<CodeForm onSubmit={ jest.fn(async () => {}) } />)

    fireEvent.click(screen.getByText('verify'))
    expect(await screen.findByText('two-factor-form.code.required')).toBeTruthy()

    typeCode('1')

    await waitFor(() => { expect(hasFieldError()).toBe(false) })
  })

  it('submits on its own once all six digits are entered', async () => {
    const onSubmit = jest.fn(async () => {})
    render(<CodeForm onSubmit={ onSubmit } />)

    typeCode('123456')

    await waitFor(() => { expect(onSubmit).toHaveBeenCalledWith('123456') })
  })

  it('submits a pasted code', async () => {
    const onSubmit = jest.fn(async () => {})
    render(<CodeForm onSubmit={ onSubmit } />)

    fireEvent.input(boxes()[0], { target: { value: '654321' } })

    await waitFor(() => { expect(onSubmit).toHaveBeenCalledWith('654321') })
  })

  it('submits what is in the boxes after a digit is deleted and retyped', async () => {
    const onSubmit = jest.fn(async () => {})
    render(<CodeForm onSubmit={ onSubmit } />)

    typeCode('12345')
    fireEvent.input(boxes()[4], { target: { value: '' } })
    fireEvent.input(boxes()[4], { target: { value: '9' } })
    fireEvent.input(boxes()[5], { target: { value: '0' } })

    await waitFor(() => { expect(onSubmit).toHaveBeenCalledWith('123490') })
  })

  it('empties the boxes and focuses the first one after the form resets', async () => {
    const onSubmit = jest.fn(async () => { throw new Error('wrong code') })
    render(<CodeForm onSubmit={ onSubmit } />)

    typeCode('111111')

    await waitFor(() => { expect(onSubmit).toHaveBeenCalled() })
    await waitFor(() => { expect(boxes().map((box) => box.value).join('')).toBe('') })
    expect(document.activeElement).toBe(boxes()[0])
  })

  it('leaves the focus alone when another element has it', () => {
    const Page = ({ showCode }: { showCode: boolean }): React.JSX.Element => (
      <div>
        <input aria-label="other" />
        {showCode && <CodeForm onSubmit={ jest.fn(async () => {}) } />}
      </div>
    )
    const { rerender } = render(<Page showCode={ false } />)
    screen.getByLabelText('other').focus()

    rerender(<Page showCode />)

    expect(document.activeElement).toBe(screen.getByLabelText('other'))
  })
})
