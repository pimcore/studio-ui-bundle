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
 * The version detail view mounts the object editor's `DataComponent` for the delegate of a wrapped
 * field: `multiValue` does it per entry, `encryptedField` for the field itself. Neither path renders
 * a `Form`, so `Form.useFormInstance()` has no instance to hand out, and a delegate that declares a
 * `defaultValue` made that component seed the default into it.
 *
 * The whole path is the real one here, the form barrel included: what is mocked is what the barrel
 * and the form item reach around it — styles, the SDK barrels, i18n, the redux-backed hooks — and the
 * delegate's own widget. `Form.useFormInstance`, the effect that calls `handleDefaultValue` and the
 * delegate type's `handleDefaultValue` are all real.
 */

// antd-style ships untranspiled ESM, which is what the form barrel reaches for its styles
jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => jest.requireActual('@test-utils/mocks/create-styles-mock'))
// the barrel's own two routes into the application graph: the localisation item and the router
jest.mock('@Pimcore/components/form/localisation/localized-fields/form-item/with-localized-fields-locale', () => ({
  withLocalizedFieldsLocale: (Component: unknown) => Component
}))
jest.mock('@Pimcore/app/router/router', () => ({ router: {} }))
jest.mock('@sdk/components', () => ({
  ...jest.requireActual('@test-utils/mocks/sdk-barrel-mock').sdkComponentsMock,
  Form: { useForm: jest.requireActual('@Pimcore/components/form/use-form').useForm }
}))
jest.mock('@sdk/app', () => ({
  ...jest.requireActual('@test-utils/mocks/sdk-barrel-mock').sdkAppMock,
  useAppSelector: () => undefined
}))
jest.mock('@sdk/modules/app', () => jest.requireActual('@test-utils/mocks/sdk-barrel-mock').sdkModulesAppMock)

jest.mock('@Pimcore/app/i18n', () => ({ __esModule: true, default: { t: (key: string) => key } }))
jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))
jest.mock('@Pimcore/modules/auth/hooks/use-user', () => ({ useUser: () => ({ user: { isAdmin: false } }) }))

// the delegate's own widget and the store's editor widget, neither of which is on the path under test
jest.mock('@Pimcore/components/input/input', () => ({
  Input: ({ value }: { value?: unknown }) => (
    <input
      readOnly
      value={ (value ?? '') as string }
    />
  )
}))
jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/classification-store', () => ({ ClassificationStore: () => null }))
jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/grid-cells/image/default-preview', () => ({ DefaultPreview: () => null }))

// what the real EditFormProvider reaches for: the provider itself stays real, because what matters
// about it is that it publishes its form in its own context and in no FormInstanceProvider
jest.mock('@Pimcore/modules/element/hooks/use-element-context', () => ({ useElementContext: () => ({ id: 1 }) }))
jest.mock('@Pimcore/modules/data-object/hooks/use-data-object-draft', () => ({
  useDataObjectDraft: () => ({ dataObject: { permissions: { save: true, publish: true } }, markObjectDataAsModified: () => {} })
}))
jest.mock('@Pimcore/modules/data-object/actions/save/use-save', () => ({
  SaveTaskType: { AutoSave: 'auto-save' },
  useSave: () => ({ save: async () => {}, isError: false })
}))
jest.mock('@Pimcore/components/message/useMessage', () => ({ useMessage: () => ({ error: () => {} }) }))
jest.mock('@Pimcore/modules/app/settings/hooks/use-settings', () => ({ useSettings: () => ({ object_auto_save_interval: 0 }) }))

// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { render, screen } from '@testing-library/react'
// eslint-disable-next-line import/first
import { FormInstanceProvider, useForm } from '@Pimcore/components/form/use-form'
// eslint-disable-next-line import/first
import { DataComponent } from './components/data-component/data-component'
// eslint-disable-next-line import/first
import { DynamicTypeObjectDataClassificationStore } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-classification-store'
// eslint-disable-next-line import/first
import { DynamicTypeObjectDataMultiValue } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-multi-value'
// eslint-disable-next-line import/first
import { DynamicTypeObjectDataEncryptedField } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-encrypted-field'
// eslint-disable-next-line import/first
import { DynamicTypeObjectDataInput } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-input'
// eslint-disable-next-line import/first
import { type DynamicTypeObjectDataRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-registry'
// eslint-disable-next-line import/first
import { type IFormattedDataStructureData } from './types'

const GROUP_ID = 3
const KEY_ID = 4873
const STORED_VALUE = '22'
const VARIANT = 'Metric'
const DEFAULT_VALUE = '50'

// declared before the types, which reach the container while they are being constructed
const objectDataRegistry = {
  hasDynamicType: (id: string) => id in types,
  getDynamicType: (id: string) => types[id]
} as unknown as DynamicTypeObjectDataRegistry

const types: Record<string, unknown> = {}

jest.mock('@Pimcore/app/depency-injection', () => ({
  container: { get: () => objectDataRegistry },
  useInjection: () => objectDataRegistry
}))

types.classificationstore = new DynamicTypeObjectDataClassificationStore()
types.multiValue = new DynamicTypeObjectDataMultiValue()
types.encryptedField = new DynamicTypeObjectDataEncryptedField()
types.input = new DynamicTypeObjectDataInput()

/** A `multiValue` key of one group, as the object endpoint publishes it. */
const multiValueKey = (delegate: Record<string, unknown> | null): Record<string, unknown> => ({
  id: KEY_ID,
  name: 'testVariants',
  title: 'Test Variants',
  definition: {
    name: 'testVariants',
    datatype: 'data',
    fieldtype: 'multiValue',
    delegateDatatype: 'input',
    delegate,
    variants: [{ name: VARIANT }],
    unqualifiedValue: false
  }
})

/** The version rows of the store field, through the real processing the version detail runs. */
const versionRows = async (delegate: Record<string, unknown> | null): Promise<IFormattedDataStructureData[]> =>
  await (types.classificationstore as DynamicTypeObjectDataClassificationStore).processVersionFieldData({
    objectId: 377,
    item: {
      name: 'technicalAttributes',
      title: 'Technical Attributes',
      datatype: 'data',
      fieldtype: 'classificationstore',
      activeGroupDefinitions: [{ id: GROUP_ID, name: 'Rims', keys: [multiValueKey(delegate)] }]
    } as any,
    fieldBreadcrumbTitle: '',
    fieldValueByName: { [GROUP_ID]: { default: { [KEY_ID]: [{ var: VARIANT, v: STORED_VALUE }] } } } as any,
    fieldPath: '',
    versionId: 1,
    versionCount: 1,
    layoutsList: [],
    setLayoutsList: () => {}
  })

/** A real form instance in a FormInstanceProvider: what the version view does not render. */
const WithFormInstance = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  const [formInstance] = useForm()

  return <FormInstanceProvider formInstance={ formInstance }>{children}</FormInstanceProvider>
}

const Plain = ({ children }: { children: React.ReactNode }): React.JSX.Element => <>{children}</>

/** What the rendered version field list mounts for one row (ObjectVersionsFieldsView). */
const renderVersionField = (row: IFormattedDataStructureData, Wrapper = Plain): void => {
  const fieldData = row.fieldData as any

  render(
    <Wrapper>
      <DataComponent
        datatype='data'
        fieldType={ fieldData.fieldtype }
        name={ fieldData.name }
        value={ row.fieldValue }
        { ...fieldData }
      />
    </Wrapper>
  )
}

const renderEncryptedField = (delegate: Record<string, unknown> | null): void => {
  render(
    <DataComponent
      datatype='data'
      delegate={ delegate }
      delegateDatatype='input'
      fieldType='encryptedField'
      name='secret'
      title='Secret'
      value={ STORED_VALUE }
    />
  )
}

/** The ErrorBoundary of the version DataComponent renders the message of whatever the field threw. */
const thrownMessage = (): string | null =>
  screen.queryByText(/Cannot read properties of null/)?.textContent ?? null

describe('a multiValue key in the version detail view, whose delegate declares a default value', () => {
  it('renders the key rather than seeding the default into a form instance it has none of', async () => {
    const rows = await versionRows({ defaultValue: DEFAULT_VALUE })

    renderVersionField(rows[0])

    expect(thrownMessage()).toBeNull()
    expect(screen.getByRole('heading')).toHaveTextContent(VARIANT)
    expect(screen.getByRole('textbox')).toHaveValue(STORED_VALUE)
  })

  // the control: a delegate that declares no default never reaches the dereference
  it('renders the key where the delegate declares no default value', async () => {
    const rows = await versionRows(null)

    renderVersionField(rows[0])

    expect(thrownMessage()).toBeNull()
    expect(screen.getByRole('heading')).toHaveTextContent(VARIANT)
    expect(screen.getByRole('textbox')).toHaveValue(STORED_VALUE)
  })

  // the same tree with a form instance in it: what the missing one, and nothing else, accounts for
  it('renders the key where a form instance is provided', async () => {
    const rows = await versionRows({ defaultValue: DEFAULT_VALUE })

    renderVersionField(rows[0], WithFormInstance)

    expect(thrownMessage()).toBeNull()
    expect(screen.getByRole('heading')).toHaveTextContent(VARIANT)
  })
})

// the other wrapped field that mounts the editor's DataComponent in the version view
describe('an encryptedField in the version detail view, whose delegate declares a default value', () => {
  it('renders the field rather than seeding the default into a form instance it has none of', () => {
    renderEncryptedField({ defaultValue: DEFAULT_VALUE })

    expect(thrownMessage()).toBeNull()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders the field where the delegate declares no default value', () => {
    renderEncryptedField(null)

    expect(thrownMessage()).toBeNull()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })
})
