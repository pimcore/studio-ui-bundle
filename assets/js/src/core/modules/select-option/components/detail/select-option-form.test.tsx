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

const SELECT_OPTION = { id: 'Colors', group: 'old', isWriteable: true, selectOptions: [] }
const FRESH = { ...SELECT_OPTION, group: 'imported' }

const getSelectOptionById = jest.fn()
const updateSelectOption = jest.fn()
const setSelectOptions = jest.fn()
const setFieldsValue = jest.fn()

jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))

jest.mock('../../hooks/use-select-option-editor', () => ({
  useSelectOptionEditor: () => ({
    getSelectOptionById,
    updateSelectOption,
    removeWithConfirmation: jest.fn(),
    isLoading: false
  })
}))

jest.mock('../../context/hooks/use-select-option-editor-context', () => ({
  useSelectOptionEditorContext: () => ({ setSelectOptions, closeSelectOption: jest.fn() })
}))

jest.mock('@Pimcore/components/form/form', () => ({
  Form: { useForm: () => [{ setFieldsValue }] }
}))

jest.mock('@Pimcore/components/form/form-kit', () => ({
  FormKit: ({ children, formProps }: any) => (
    <div>
      <button onClick={ () => { void formProps.onFinish(formProps.initialValues) } }>finish</button>
      {children}
    </div>
  )
}))

jest.mock('../select-option-editor/general-settings-form-fields', () => ({
  SelectOptionGeneralSettingsFormFields: () => null
}))

jest.mock('./select-option-import-export-actions', () => ({
  SelectOptionImportExportActions: ({ onImported }: any) => <button onClick={ onImported }>imported</button>
}))

jest.mock('@Pimcore/components/button/button', () => ({ Button: ({ children }: any) => <button>{children}</button> }))
jest.mock('@Pimcore/components/content/content', () => ({ Content: ({ children }: any) => <div>{children}</div> }))
jest.mock('@Pimcore/components/flex/flex', () => ({ Flex: ({ children }: any) => <div>{children}</div> }))
jest.mock('@Pimcore/components/icon-button/icon-button', () => ({ IconButton: () => null }))
jest.mock('@Pimcore/components/toolbar/toolbar', () => ({ Toolbar: ({ children }: any) => <div>{children}</div> }))
jest.mock('@Pimcore/components/tooltip/tooltip', () => ({
  actionTooltipDelay: 0,
  Tooltip: ({ children }: any) => <>{children}</>
}))

const { SelectOptionForm } = jest.requireActual('./select-option-form')

const expectReloaded = async (): Promise<void> => {
  await waitFor(() => { expect(setFieldsValue).toHaveBeenCalledWith(FRESH) })

  expect(getSelectOptionById).toHaveBeenCalledWith(SELECT_OPTION.id)

  const updateTree = setSelectOptions.mock.calls[0][0]
  expect(updateTree([SELECT_OPTION, { id: 'Other' }])).toEqual([FRESH, { id: 'Other' }])
}

describe('SelectOptionForm', () => {
  beforeEach(() => {
    getSelectOptionById.mockReset().mockResolvedValue(FRESH)
    updateSelectOption.mockReset()
    setSelectOptions.mockClear()
    setFieldsValue.mockClear()
  })

  it('reloads the select option into the tree and the form after an import', async () => {
    render(<SelectOptionForm selectOption={ SELECT_OPTION } />)

    fireEvent.click(screen.getByText('imported'))

    await expectReloaded()
  })

  it('reloads it the same way after a save', async () => {
    updateSelectOption.mockImplementation(async (_id: string, _config: unknown, onFinish: () => void) => { onFinish() })
    render(<SelectOptionForm selectOption={ SELECT_OPTION } />)

    fireEvent.click(screen.getByText('finish'))

    await expectReloaded()
    expect(updateSelectOption).toHaveBeenCalledWith(SELECT_OPTION.id, expect.objectContaining({ group: 'old' }), expect.any(Function))
  })

  it('leaves the tree and the form alone when the reload finds nothing', async () => {
    getSelectOptionById.mockResolvedValue(undefined)
    render(<SelectOptionForm selectOption={ SELECT_OPTION } />)

    fireEvent.click(screen.getByText('imported'))

    await waitFor(() => { expect(getSelectOptionById).toHaveBeenCalledTimes(1) })
    expect(setSelectOptions).not.toHaveBeenCalled()
    expect(setFieldsValue).not.toHaveBeenCalled()
  })
})
