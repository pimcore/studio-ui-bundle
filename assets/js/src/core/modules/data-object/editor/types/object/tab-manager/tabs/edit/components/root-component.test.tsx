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
import { act, render, screen } from '@testing-library/react'
import { isUndefined } from 'lodash'
import { InheritanceStateProvider } from '../providers/inheritance-state-provider/inheritance-state-provider'
import { useInheritanceState } from '../providers/inheritance-state-provider/use-inheritance-state'
import { RootComponent } from './root-component'
import { type DataObjectGetLayoutByIdApiResponse } from '@Pimcore/modules/data-object/data-object-api-slice.gen'

type ValuesChangeHandler = (changedValues: Record<string, any>, allValues: any) => void

// The form keeps the change handler of its first render, like the real one does.
let firstValuesChangeHandler: ValuesChangeHandler | undefined

// The real Form, layout and content components import antd-style (untranspiled ESM),
// which jest cannot load.
jest.mock('@Pimcore/components/form/form', () => ({
  Form: ({ children, onValuesChange }: { children: React.ReactNode, onValuesChange: ValuesChangeHandler }) => {
    if (isUndefined(firstValuesChangeHandler)) {
      firstValuesChangeHandler = onValuesChange
    }

    return <>{children}</>
  }
}))

jest.mock('antd', () => ({
  ConfigProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>
}))

jest.mock('./object-component', () => ({ ObjectComponent: () => null }))

jest.mock('@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/root-component/draft-alert', () => ({
  DraftAlert: () => null
}))

jest.mock('../../../../../../../../element/dynamic-types/definitions/objects/data-related/providers/field-width/field-width-provider', () => ({
  FieldWidthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>
}))

jest.mock('@Pimcore/components/content-layout/content-layout', () => ({
  ContentLayout: ({ children }: { children: React.ReactNode }) => <>{children}</>
}))

jest.mock('@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/edit-form-provider/utils/build-field-type-map', () => ({
  buildFieldTypeMap: () => new Map()
}))

jest.mock('@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/edit-form-provider/edit-form-provider', () => ({
  useEditFormContext: () => ({
    form: {},
    setFieldTypeMap: () => {},
    updateModifiedDataObjectAttributes: () => {},
    updateDraft: async () => {},
    getChangedFieldName: (changedValues: Record<string, unknown>) => Object.keys(changedValues)[0],
    disabled: false
  })
}))

jest.mock('@Pimcore/modules/data-object/data-object-provider', () => ({
  DataObjectContext: jest.requireActual<typeof React>('react').createContext({ id: 42 })
}))

// sku was overridden in an earlier session
jest.mock('@Pimcore/modules/data-object/hooks/use-data-object-draft', () => ({
  useDataObjectDraft: () => ({
    dataObject: {
      inheritanceData: {
        metaData: {
          sku: { objectId: 42, inherited: false, inheritable: true, inheritedValue: 'SKU-PARENT' }
        }
      }
    }
  })
}))

const SkuState = (): React.JSX.Element => {
  const inheritanceState = useInheritanceState()

  return (
    <>
      <span data-testid="state">{ String(inheritanceState?.getInheritanceState('sku')?.inherited) }</span>
      <button
        onClick={ () => { inheritanceState?.restoreInheritance('sku') } }
        type="button"
      >
        restore
      </button>
    </>
  )
}

beforeEach(() => {
  firstValuesChangeHandler = undefined
})

describe('RootComponent', () => {
  /**
   * The regression this guards: the form only knows its first change handler, which
   * saw sku as broken. After a restore sku reads as inherited, and a change has to
   * break it again, or the field shows as inherited with no Restore while its own
   * value is saved.
   */
  it('breaks a field restored after the first render when its value changes', () => {
    render(
      <InheritanceStateProvider>
        <RootComponent
          data={ {} }
          layout={ {} as unknown as DataObjectGetLayoutByIdApiResponse }
        />
        <SkuState />
      </InheritanceStateProvider>
    )

    expect(screen.getByTestId('state')).toHaveTextContent('broken')

    act(() => { screen.getByRole('button', { name: 'restore' }).click() })
    expect(screen.getByTestId('state')).toHaveTextContent('true')

    act(() => { firstValuesChangeHandler?.({ sku: 'Own again' }, {}) })
    expect(screen.getByTestId('state')).toHaveTextContent('broken')
  })
})
