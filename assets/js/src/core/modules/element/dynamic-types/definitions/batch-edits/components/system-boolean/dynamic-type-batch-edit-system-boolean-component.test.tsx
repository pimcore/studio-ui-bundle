/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Form as AntForm } from 'antd'
import { DynamicTypeBatchEditSystemBooleanComponent } from './dynamic-type-batch-edit-system-boolean-component'

// The Pimcore form and select wrappers pull in the whole component library; the plain antd ones behave the same here.
jest.mock('@Pimcore/components/form/form', () => ({ Form: jest.requireActual('antd').Form }))
// A plain list of option buttons stands in for the Select: it keeps the options, the shown value and onChange testable.
jest.mock('@Pimcore/components/select/select', () => ({
  Select: ({ options, onChange, value }: { options: Array<{ value: string, label: string }>, onChange?: (value: string) => void, value?: string }) => (
    <>
      <span data-testid='select-value'>{ value ?? '' }</span>
      { options.map(({ value: optionValue, label }) => (
        <button
          key={ label }
          onClick={ () => { onChange?.(optionValue) } }
          type='button'
        >
          { label }
        </button>
      )) }
    </>
  )
}))
jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))

/**
 * Regression test for platform-version#622: the "published" batch edit used a bare checkbox that was
 * unchecked by default, so "Apply changes" silently unpublished every selected object.
 */
describe('DynamicTypeBatchEditSystemBooleanComponent', () => {
  const batchEdit: any = { key: 'published', type: 'system.boolean', frontendType: 'checkbox' }

  const setup = (): { form: ReturnType<typeof AntForm.useForm>[0] } => {
    let formInstance: any
    const Wrapper = (): React.JSX.Element => {
      const [form] = AntForm.useForm()
      formInstance = form
      return (
        <AntForm form={ form }>
          <DynamicTypeBatchEditSystemBooleanComponent batchEdit={ batchEdit } />
        </AntForm>
      )
    }
    render(<Wrapper />)
    return { form: formInstance }
  }

  it('has no preselected value, so nothing is sent until a choice is made', async () => {
    const { form } = setup()

    expect(form.getFieldValue('published')).toBeUndefined()
    expect(screen.getByTestId('select-value')).toBeEmptyDOMElement()
    await act(async () => { await expect(form.validateFields()).rejects.toBeDefined() })
  })

  it('offers Publish and Unpublish', () => {
    setup()

    expect(screen.getByText('batch-edit.system-boolean.publish')).toBeInTheDocument()
    expect(screen.getByText('batch-edit.system-boolean.unpublish')).toBeInTheDocument()
  })

  it.each([
    ['batch-edit.system-boolean.publish', true],
    ['batch-edit.system-boolean.unpublish', false]
  ])('stores the boolean for %s and then validates', async (label, expected) => {
    const { form } = setup()
    await userEvent.click(screen.getByText(label))

    await waitFor(() => { expect(form.getFieldValue('published')).toBe(expected) })
    expect(screen.getByTestId('select-value')).toHaveTextContent(expected ? 'publish' : 'unpublish')
    await act(async () => { await expect(form.validateFields()).resolves.toEqual({ published: expected }) })
  })
})
