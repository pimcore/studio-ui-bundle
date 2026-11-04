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
import { render, screen } from '@testing-library/react'
import { DataComponent, type DataComponentProps } from './data-component'

let mockFormList: { getComputedFieldName: () => Array<string | number> } | undefined
let mockGroup: { name: string } | undefined
let mockLocalizedFields: { locales: string[] } | undefined

jest.mock('@Pimcore/components/form/form', () => ({ Form: { useFormInstance: () => ({}) } }))
jest.mock('@Pimcore/app/depency-injection', () => ({
  useInjection: () => ({
    hasDynamicType: () => true,
    getDynamicType: () => ({ isCollectionType: false, handleDefaultValue: () => {} })
  })
}))
jest.mock('@Pimcore/app/config/services/service-ids', () => ({ serviceIds: {} }))
jest.mock('@Pimcore/modules/app/error-boundary/error-boundary', () => ({
  __esModule: true,
  default: ({ children }: { children?: React.ReactNode }) => <>{ children }</>
}))
jest.mock('../providers/form-list-provider/use-form-list', () => ({ useFormList: () => mockFormList }))
jest.mock('@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/inheritance-state-provider/use-inheritance-state', () => ({
  useInheritanceState: () => undefined
}))
jest.mock('@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/edit-form-provider/edit-form-provider', () => ({
  useEditFormContext: () => ({ disabled: false })
}))
jest.mock('@Pimcore/components/form/group/provider/use-form-group-optional', () => ({ useFormGroupOptional: () => mockGroup }))
jest.mock('@Pimcore/components/form/localisation/localized-fields/provider/localized-fields-provider/use-localized-fields', () => ({
  useLocalizedFields: () => mockLocalizedFields
}))
jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width', () => ({
  useFieldWidth: () => ({})
}))
jest.mock('../providers/combined-field-name-provider/use-combined-field-name', () => ({ useCombinedFieldName: () => undefined }))
jest.mock('@Pimcore/components/form/controls/keyed-list/provider/keyed-list/use-keyed-list-optional', () => ({
  useKeyedListOptional: () => undefined
}))
jest.mock('@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/data-component/form-item', () => ({
  __esModule: true,
  default: ({ _props, formFieldName, technicalName }: { _props: Record<string, unknown>, formFieldName: unknown[], technicalName: string }) => (
    <span
      data-form-field-name={ JSON.stringify(formFieldName) }
      data-passes-technical-name-on={ String('technicalName' in _props) }
      data-technical-name={ technicalName }
      data-testid="form-item"
    />
  )
}))

const renderField = (props: Partial<DataComponentProps>): HTMLElement => {
  render(
    <DataComponent
      datatype="data"
      fieldtype="input"
      name="description"
      { ...props }
    />
  )

  return screen.getByTestId('form-item')
}

describe('DataComponent', () => {
  beforeEach(() => {
    mockFormList = undefined
    mockGroup = undefined
    mockLocalizedFields = undefined
  })

  it('names a field in a block item by its plain key, not by its form path', () => {
    mockFormList = { getComputedFieldName: () => ['contentBlock', 0] }
    const item = renderField({})

    expect(item).toHaveAttribute('data-form-field-name', JSON.stringify(['contentBlock', 0, 'description']))
    expect(item).toHaveAttribute('data-technical-name', 'description')
  })

  it('names a localized field by its plain key, without the locale', () => {
    mockGroup = { name: 'localizedfields' }
    mockLocalizedFields = { locales: ['en'] }

    expect(renderField({})).toHaveAttribute('data-technical-name', 'description')
  })

  it('names a classification store key by its key name instead of its id', () => {
    const item = renderField({ name: 12, technicalName: 'weight' })

    expect(item).toHaveAttribute('data-form-field-name', JSON.stringify([12]))
    expect(item).toHaveAttribute('data-technical-name', 'weight')
    expect(item).toHaveAttribute('data-passes-technical-name-on', 'false')
  })
})
