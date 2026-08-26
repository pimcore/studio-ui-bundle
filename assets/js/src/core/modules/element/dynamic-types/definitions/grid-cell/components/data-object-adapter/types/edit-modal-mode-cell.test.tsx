/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo, useState } from 'react'
import { isEmpty } from 'lodash'
import type { FormInstance } from 'antd'
import type { NamePath } from 'rc-field-form/es/interface'
import { fireEvent, render, screen } from '@testing-library/react'
import { EditableCellContext } from '@Pimcore/components/grid/edit-mode/editable-cell-context'
import { EditModalCell } from './edit-modal-mode-cell'
import { type WithEditModalGridCellDefinition } from '../../../../objects/data-related/dynamic-type-object-data-abstract'
import { type DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'

// The Pimcore form barrel transitively imports the whole app graph (untranspiled
// `antd/es` deep imports included). The behaviour under test lives in rc-field-form's
// store/`initialValues` handling, so plain AntD form primitives are enough here.
jest.mock('@Pimcore/components/form/form', () => {
  const { Form: AntForm } = jest.requireActual('antd')

  return { Form: AntForm }
})

// `*.styles.*` files import antd-style, which ships untranspiled ESM that jest does not
// transform - stub the purely presentational wrappers that pull it in.
jest.mock('@Pimcore/components/flex/flex', () => ({
  Flex: ({ children }: { children: React.ReactNode }) => <div>{ children }</div>
}))

// Keeps the mount/unmount semantics of the real modal (it is rendered conditionally by
// the cell) without pulling in the draggable modal and its styles.
jest.mock('@Pimcore/components/modal/window-modal/window-modal', () => ({
  WindowModal: (props: any) => (
    <div>
      { props.children }
      <button
        onClick={ props.onCancel }
        type='button'
      >
        discard
      </button>
      <button
        onClick={ props.onOk }
        type='button'
      >
        apply
      </button>
    </div>
  )
}))

jest.mock('@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns', () => ({
  useSelectedColumns: () => ({ decodeColumnIdentifier: () => ({ key: 'quantity' }) })
}))

jest.mock('@Pimcore/components/language-selection', () => ({
  useLanguageSelection: () => ({ currentLanguage: 'en' })
}))

jest.mock('@Pimcore/modules/data-object/data-object-provider', () => ({
  DataObjectProvider: ({ children }: { children: React.ReactNode }) => <>{ children }</>
}))

jest.mock('../../../../objects/data-related/components/field-collection/providers/field-collection-provider', () => ({
  FieldCollectionProvider: ({ children }: { children: React.ReactNode }) => <>{ children }</>
}))

jest.mock('../inheritance-layer', () => ({
  InheritanceLayer: ({ children }: { children: React.ReactNode }) => <>{ children }</>
}))

interface TestValue {
  // The class editor stores a quantity value default as a string ('5'), the object itself
  // delivers a number — both shapes occur, so both are covered here.
  value: number | string | null
  unitId: string | null
}

/**
 * Stand-in for a compound edit component (e.g. quantity value). It renders the value
 * it receives from the form so the test can assert what the modal was initialised with.
 */
const TestEditComponent = (props: { value?: TestValue | null, defaultValue?: number | string | null, defaultUnit?: string | null }): React.JSX.Element => (
  <span data-testid='editor-value'>{ JSON.stringify(props.value ?? null) }</span>
)

/**
 * Mirrors DynamicTypeObjectDataQuantityValue.handleDefaultValue: seed the configured
 * default only while the field is still empty.
 */
const handleDefaultValue = (props: any, form: FormInstance, fieldName: NamePath): void => {
  if (isEmpty(props.defaultValue) && isEmpty(props.defaultUnit)) {
    return
  }

  if (isEmpty(form.getFieldValue(fieldName))) {
    form.setFieldValue(fieldName, { value: props.defaultValue ?? null, unitId: props.defaultUnit ?? null })
  }
}

const getObjectCellDefinition = (editComponent: React.ReactElement): WithEditModalGridCellDefinition => ({
  mode: 'edit-modal',
  previewComponent: <span>preview</span>,
  editComponent,
  formItemProps: {},
  editModalSettings: { modalSize: 'M', formLayout: 'vertical' },
  handleDefaultValue,
  supportsBatchAppendModes: false
} as unknown as WithEditModalGridCellDefinition)

const getCellProps = (getValue: () => TestValue | null): DefaultCellProps => ({
  getValue,
  row: { index: 0, original: { id: 1 } },
  column: { id: 'quantity' },
  table: { options: { meta: { onUpdateCellData: jest.fn() } } }
} as unknown as DefaultCellProps)

interface HarnessProps {
  cellValue: TestValue | null
  editComponent: React.ReactElement
  /** Value the cell reports after the modal has been closed once. */
  nextCellValue?: TestValue | null
}

/**
 * Renders the cell the way the grid does: the cell exists (and renders its preview)
 * before edit mode is ever enabled, and the modal is toggled through the context.
 */
const Harness = (props: HarnessProps): React.JSX.Element => {
  const [isInEditMode, setIsInEditMode] = useState(false)
  const [wasClosed, setWasClosed] = useState(false)

  const cellValue = wasClosed && props.nextCellValue !== undefined ? props.nextCellValue : props.cellValue

  const editModeContext = useMemo(() => ({
    isInEditMode,
    setIsInEditMode: (value: boolean) => {
      setIsInEditMode(value)

      if (!value) {
        setWasClosed(true)
      }
    }
  }), [isInEditMode])

  return (
    <EditableCellContext.Provider value={ editModeContext }>
      <button
        onClick={ () => { setIsInEditMode(true) } }
        type='button'
      >
        open
      </button>

      <EditModalCell
        cellProps={ getCellProps(() => cellValue) }
        objectCellDefinition={ getObjectCellDefinition(props.editComponent) }
      />
    </EditableCellContext.Provider>
  )
}

describe('EditModalCell', () => {
  it('shows the current cell value on the first open when the field type has a default unit', async () => {
    render(
      <Harness
        cellValue={ { value: 100, unitId: 'kg' } }
        editComponent={ (
          <TestEditComponent
            defaultUnit='kg'
            defaultValue={ null }
          />
        ) }
      />
    )

    fireEvent.click(screen.getByRole('button', { name: 'open' }))

    expect(await screen.findByTestId('editor-value')).toHaveTextContent(
      JSON.stringify({ value: 100, unitId: 'kg' })
    )
  })

  it('shows the current cell value on the first open when the field type has a default value', async () => {
    render(
      <Harness
        cellValue={ { value: 100, unitId: 'kg' } }
        editComponent={ (
          <TestEditComponent
            defaultUnit={ null }
            defaultValue='5'
          />
        ) }
      />
    )

    fireEvent.click(screen.getByRole('button', { name: 'open' }))

    expect(await screen.findByTestId('editor-value')).toHaveTextContent(
      JSON.stringify({ value: 100, unitId: 'kg' })
    )
  })

  it('applies the field type default value when the cell is empty', async () => {
    render(
      <Harness
        cellValue={ null }
        editComponent={ (
          <TestEditComponent
            defaultUnit='kg'
            defaultValue={ null }
          />
        ) }
      />
    )

    fireEvent.click(screen.getByRole('button', { name: 'open' }))

    expect(await screen.findByTestId('editor-value')).toHaveTextContent(
      JSON.stringify({ value: null, unitId: 'kg' })
    )
  })

  it('shows the up to date cell value when the modal is opened again', async () => {
    render(
      <Harness
        cellValue={ { value: 100, unitId: 'kg' } }
        editComponent={ (
          <TestEditComponent
            defaultUnit='kg'
            defaultValue={ null }
          />
        ) }
        nextCellValue={ { value: 300, unitId: 'g' } }
      />
    )

    fireEvent.click(screen.getByRole('button', { name: 'open' }))
    fireEvent.click(await screen.findByRole('button', { name: 'discard' }))
    fireEvent.click(screen.getByRole('button', { name: 'open' }))

    expect(await screen.findByTestId('editor-value')).toHaveTextContent(
      JSON.stringify({ value: 300, unitId: 'g' })
    )
  })
})
