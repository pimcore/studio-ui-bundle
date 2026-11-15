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
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import ApiError from '@Pimcore/modules/app/error-handler/classes/api-error'
import { ClassDefinitionsAddModal } from './add-modal'

const createClassDefinition = jest.fn()
const closeModal = jest.fn()
const openConfiguration = jest.fn()
const trackError = jest.fn()
const resetFields = jest.fn()

jest.mock('@sdk/api/class-definition', () => ({
  useClassDefinitionGetIdentifierDataQuery: () => ({
    data: { suggestedId: '1', existingIds: [] },
    isLoading: false,
    error: undefined
  }),
  useClassDefinitionCreateMutation: () => [createClassDefinition]
}))

jest.mock('@sdk/modules/app', () => ({
  ApiError: jest.requireActual('@Pimcore/modules/app/error-handler/classes/api-error').default,
  trackError: (error: unknown) => trackError(error)
}))

jest.mock('@Pimcore/modules/field-definitions/components/editor/items/provider', () => ({
  useItems: () => ({ openConfiguration })
}))

jest.mock('@Pimcore/modules/field-definitions/components/editor/items/sidebar/add-modal', () => ({
  AddModal: ({ children }: any) => <div>{children}</div>,
  useAddModal: () => ({ closeModal })
}))

jest.mock('@Pimcore/components/text/text', () => ({
  Text: ({ children }: any) => <span>{children}</span>
}))

// the components barrel pulls antd-style (untranspiled ESM); the form stand-in submits
// the values a user would have entered, which is what the create flow reacts to
jest.mock('@sdk/components', () => {
  const Form: any = ({ onFinish, children }: any) => (
    <div>
      {children}
      <button onClick={ () => onFinish({ className: 'var', uniqueIdentifier: '1' }) }>submit</button>
    </div>
  )
  Form.useForm = () => [{ resetFields, setFieldValue: jest.fn(), submit: jest.fn() }]
  const FormItem = ({ children }: any): React.JSX.Element => <>{children}</>
  Form.Item = FormItem

  return {
    Content: ({ children }: any) => <div>{children}</div>,
    Form,
    Input: () => <input />
  }
})

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

describe('ClassDefinitionsAddModal', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('surfaces the backend validation message and keeps the modal open when creating fails', async () => {
    const message = 'Failed to save new element: Invalid name for class definition: `var` is a reserved word and cannot be used as a class name'

    // RTK Query resolves with `error` instead of rejecting
    createClassDefinition.mockResolvedValue({
      error: { status: 500, data: { message, errorKey: 'error_something_generic_went_wrong' } }
    })

    render(<ClassDefinitionsAddModal />)
    fireEvent.click(screen.getByText('submit'))

    await waitFor(() => { expect(trackError).toHaveBeenCalledTimes(1) })

    const reported = trackError.mock.calls[0][0] as ApiError
    expect(reported).toBeInstanceOf(ApiError)
    expect(reported.getContent()).toBe(message)
    expect(closeModal).not.toHaveBeenCalled()
    expect(resetFields).not.toHaveBeenCalled()
    expect(openConfiguration).not.toHaveBeenCalled()
  })

  it('opens the created class definition on success', async () => {
    createClassDefinition.mockResolvedValue({ data: { id: '1', name: 'Product' } })

    render(<ClassDefinitionsAddModal />)
    fireEvent.click(screen.getByText('submit'))

    await waitFor(() => { expect(openConfiguration).toHaveBeenCalledWith(expect.objectContaining({ id: '1', name: 'Product' })) })
    expect(closeModal).toHaveBeenCalled()
    expect(trackError).not.toHaveBeenCalled()
  })
})
