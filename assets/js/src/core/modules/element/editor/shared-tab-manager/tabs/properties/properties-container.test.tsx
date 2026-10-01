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
import { act, fireEvent, render, screen } from '@testing-library/react'
import trackError, { ApiError, GeneralError } from '@Pimcore/modules/app/error-handler'
import { PropertiesContainer } from './properties-container'

interface MockSelectProps {
  options?: Array<{ label: string, value: string }>
  onDropdownVisibleChange?: (open: boolean) => void
}

let queryResult: { data?: { items: Array<Record<string, unknown>> }, isFetching: boolean, refetch: jest.Mock }

jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: {}, cx: (...classNames: unknown[]) => classNames.filter(Boolean).join(' '), theme: {} })
}))

jest.mock('@Pimcore/components/icon/icon', () => ({
  Icon: (): null => null
}))

jest.mock('@Pimcore/modules/app/error-handler', () => {
  class ApiError { constructor (public readonly errorData: unknown) {} }
  class GeneralError { constructor (public readonly message: string) {} }

  return {
    __esModule: true,
    default: jest.fn(),
    ApiError,
    GeneralError,
    isApiErrorData: (error: unknown) => typeof error === 'object' && error !== null && 'status' in error
  }
})

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('./properties-api-slice-enhanced', () => ({
  usePropertyGetCollectionQuery: () => queryResult
}))

jest.mock('@Pimcore/modules/element/hooks/use-element-context', () => ({
  useElementContext: () => ({ id: 1, elementType: 'document' })
}))

jest.mock('@Pimcore/modules/element/hooks/use-element-draft', () => ({
  useElementDraft: () => ({
    element: { permissions: { publish: true, save: true } },
    addProperty: jest.fn(),
    properties: []
  })
}))

jest.mock('@Pimcore/modules/element/editor/shared-tab-manager/tabs/properties/components/table/table', () => ({
  Table: () => null
}))

jest.mock('@Pimcore/components/modal/useModal', () => ({
  useModal: () => ({ showModal: jest.fn(), closeModal: jest.fn(), renderModal: () => null })
}))

jest.mock('@Pimcore/components/select/select', () => ({
  Select: ({ options, onDropdownVisibleChange }: MockSelectProps) => (
    <div>
      <button onClick={ () => { onDropdownVisibleChange?.(true) } }>open</button>
      <button onClick={ () => { onDropdownVisibleChange?.(false) } }>close</button>
      { options?.map((option) => <span key={ option.value }>{ option.label }</span>) }
    </div>
  )
}))

const createQueryResult = (name: string, reload: () => Promise<unknown> = async () => ({})): typeof queryResult => ({
  data: { items: [{ id: 'abc', key: 'nofollow', name }] },
  isFetching: false,
  refetch: jest.fn(() => ({ unwrap: reload }))
})

describe('PropertiesContainer predefined properties select', () => {
  beforeEach(() => {
    jest.mocked(trackError).mockClear()
  })

  it('reloads the predefined properties when the select is opened', () => {
    queryResult = createQueryResult('Old name')
    render(<PropertiesContainer />)

    fireEvent.click(screen.getByText('open'))

    expect(queryResult.refetch).toHaveBeenCalledTimes(1)
  })

  it('does not reload the predefined properties when the select is closed', () => {
    queryResult = createQueryResult('Old name')
    render(<PropertiesContainer />)

    fireEvent.click(screen.getByText('close'))

    expect(queryResult.refetch).not.toHaveBeenCalled()
  })

  it('shows the renamed property once the reloaded data arrives', () => {
    queryResult = createQueryResult('Old name')
    const { rerender } = render(<PropertiesContainer />)
    expect(screen.getByText('Old name')).toBeInTheDocument()

    fireEvent.click(screen.getByText('open'))
    queryResult = createQueryResult('New name')
    rerender(<PropertiesContainer />)

    expect(screen.getByText('New name')).toBeInTheDocument()
    expect(screen.queryByText('Old name')).not.toBeInTheDocument()
  })

  it('tracks an API error when reloading the predefined properties fails', async () => {
    const apiErrorData = { status: 500, data: { message: 'Server error' } }
    queryResult = createQueryResult('Old name', async () => await Promise.reject(apiErrorData))
    render(<PropertiesContainer />)

    await act(async () => {
      fireEvent.click(screen.getByText('open'))
    })

    expect(trackError).toHaveBeenCalledTimes(1)
    expect(jest.mocked(trackError).mock.calls[0][0]).toEqual(new ApiError(apiErrorData))
  })

  it('tracks a translated general error when reloading fails without API error data', async () => {
    queryResult = createQueryResult('Old name', async () => await Promise.reject(new Error('Network down')))
    render(<PropertiesContainer />)

    await act(async () => {
      fireEvent.click(screen.getByText('open'))
    })

    expect(trackError).toHaveBeenCalledTimes(1)
    expect(jest.mocked(trackError).mock.calls[0][0]).toEqual(new GeneralError('properties.predefined-properties.reload-error'))
  })
})
