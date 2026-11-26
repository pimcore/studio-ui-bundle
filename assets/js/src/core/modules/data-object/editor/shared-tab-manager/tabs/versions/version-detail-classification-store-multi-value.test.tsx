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
 * A Classification Store key in the version detail view: the published group layout through the real
 * `processVersionFieldData`, its row handed to the real version `DataComponent` the way the rendered
 * field list hands it over. A `multiValue` key is the case; an `input` key is the control.
 */

// the form barrel reaches antd-style's untranspiled ESM; the editor control needs the list and its group only
jest.mock('@Pimcore/components/form/form', () => ({
  // getters, because the list itself imports this barrel while it is being loaded
  Form: {
    get Group () { return jest.requireActual('@Pimcore/components/form/group/group').Group },
    get NumberedList () { return jest.requireActual('@Pimcore/components/form/controls/numbered-list/numbered-list').NumberedList }
  }
}))

jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))

jest.mock('@Pimcore/components/flex/flex', () => ({ Flex: ({ children }: any) => <div>{children}</div> }))
jest.mock('@Pimcore/components/tag/tag', () => ({ Tag: ({ children }: any) => <em>{children}</em> }))
jest.mock('@Pimcore/components/text/text', () => ({ Text: ({ children }: any) => <p>{children}</p> }))
jest.mock('@Pimcore/components/title/title', () => ({ Title: ({ children }: any) => <h5>{children}</h5> }))
jest.mock('@Pimcore/components/icon/icon', () => ({ Icon: () => null }))
jest.mock('@Pimcore/components/icon-button/icon-button', () => ({ IconButton: () => <button type='button' /> }))
jest.mock('@Pimcore/components/input/input', () => ({
  Input: ({ value }: any) => (
    <input
      readOnly
      value={ value ?? '' }
    />
  )
}))

jest.mock('@Pimcore/app/config/services/service-ids', () => ({
  serviceIds: { 'DynamicTypes/ObjectDataRegistry': 'DynamicTypes/ObjectDataRegistry' }
}))

jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/label/field-label', () => ({ FieldLabel: () => null }))
jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/field-width-provider', () => ({
  FieldWidthContext: jest.requireActual('react').createContext(undefined),
  defaultFieldWidthValues: {}
}))
jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/grid-cells/image/default-preview', () => ({ DefaultPreview: () => null }))
jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/classification-store', () => ({ ClassificationStore: () => null }))
jest.mock('@sdk/utils', () => ({ isNonEmptyString: () => false }))
jest.mock('@Pimcore/utils/helpers', () => ({ respectLineBreak: (value: string) => value }))
jest.mock('./details-functions', () => ({
  getBreadcrumbTitle: (first: string, second: string) => [first, second].filter(Boolean).join('/')
}))

// the editor's own form and save plumbing, which the version path mounts the editor control inside of
jest.mock('@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/save-provider/save-provider', () => ({
  SaveProvider: ({ children }: any) => <>{children}</>
}))
jest.mock('@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/edit-form-provider/edit-form-provider', () => ({
  EditFormProvider: ({ children }: any) => <>{children}</>
}))

jest.mock('@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/data-component', () => {
  const { useEffect } = jest.requireActual('react')
  const { useFormGroupOptional } = jest.requireActual('@Pimcore/components/form/group/provider/use-form-group-optional')
  const { useNumberedList } = jest.requireActual('@Pimcore/components/form/controls/numbered-list/provider/numbered-list/use-numbered-list')

  // binds to the `v` member of the entry its group names, registering null as the form item does
  const DataComponent = (props: any): React.JSX.Element => {
    const path = [...(useFormGroupOptional().name as string[]), props.name]
    const { operations } = useNumberedList()
    const current = operations.getValue(path)

    useEffect(() => {
      if (current === undefined) {
        operations.update(path, null, true)
      }
    }, [current])

    return (
      <input
        onChange={ (event) => { operations.update(path, event.target.value) } }
        readOnly={ props.noteditable === true }
        value={ current ?? '' }
      />
    )
  }

  return { DataComponent }
})

// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { render, screen } from '@testing-library/react'
// eslint-disable-next-line import/first
import { DataComponent } from './components/data-component/data-component'
// eslint-disable-next-line import/first
import { DynamicTypeObjectDataClassificationStore } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-classification-store'
// eslint-disable-next-line import/first
import { DynamicTypeObjectDataMultiValue } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-multi-value'
// eslint-disable-next-line import/first
import { DynamicTypeObjectDataAbstractInput } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/abstract/dynamic-type-object-data-abstract-input'
// eslint-disable-next-line import/first
import { type DynamicTypeObjectDataRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-registry'
// eslint-disable-next-line import/first
import { type IFormattedDataStructureData } from './types'

const GROUP_ID = 3
const MULTI_VALUE_KEY_ID = 4873
const INPUT_KEY_ID = 4870
const DEFAULT_HEADING = 'classification-store.multi-value.default-variant'
const CONTEXT_ERROR = 'useItem must be used within a ItemProvider'

class InputType extends DynamicTypeObjectDataAbstractInput {
  id: string = 'input'
}

// declared before the types, which reach the container while they are being constructed
const objectDataRegistry = {
  hasDynamicType: (id: string) => id in types,
  getDynamicType: (id: string) => types[id]
} as unknown as DynamicTypeObjectDataRegistry

const types: Record<string, unknown> = {
  classificationstore: new DynamicTypeObjectDataClassificationStore(),
  multiValue: new DynamicTypeObjectDataMultiValue(),
  input: new InputType()
}

jest.mock('@Pimcore/app/depency-injection', () => ({
  container: { get: () => objectDataRegistry },
  useInjection: () => objectDataRegistry
}))

interface IVariantRow { name: string, label?: string }

/** The stored `definition` blob of a `multiValue` key, which names the default variant `unqualifiedValue`. */
const multiValueBlob = (blob: { variants?: IVariantRow[], unqualifiedValue?: boolean }): Record<string, any> => ({
  name: 'testVariants',
  datatype: 'data',
  fieldtype: 'multiValue',
  delegateDatatype: 'input',
  delegate: null,
  ...blob
})

/** One key of a group as the object endpoint publishes it: the blob, and the layout members beside it. */
const keyLayout = (
  id: number,
  title: string,
  definition: Record<string, any>,
  layoutMembers: Record<string, any> = {}
): Record<string, any> => ({ id, name: definition.name, title, definition, ...layoutMembers })

const multiValueKey = (
  blob: { variants?: IVariantRow[], unqualifiedValue?: boolean },
  layoutMembers: Record<string, any> = {}
): Record<string, any> =>
  keyLayout(MULTI_VALUE_KEY_ID, 'Test Variants', multiValueBlob(blob), layoutMembers)

const inputKey = (): Record<string, any> => keyLayout(INPUT_KEY_ID, 'Rim Material', {
  name: 'rimMaterial',
  datatype: 'data',
  fieldtype: 'input'
})

const storeItem = (keys: Array<Record<string, any>>): Record<string, any> => ({
  name: 'technicalAttributes',
  title: 'Technical Attributes',
  datatype: 'data',
  fieldtype: 'classificationstore',
  activeGroupDefinitions: [{ id: GROUP_ID, name: 'Rims', keys }]
})

const classificationStoreType = types.classificationstore as DynamicTypeObjectDataClassificationStore

/** The version rows of the store field, through the real processing the version detail runs. */
const versionRows = async (
  keys: Array<Record<string, any>>,
  storedValue: Record<string, any>
): Promise<IFormattedDataStructureData[]> =>
  await classificationStoreType.processVersionFieldData({
    objectId: 377,
    item: storeItem(keys),
    fieldBreadcrumbTitle: '',
    fieldValueByName: storedValue as any,
    fieldPath: '',
    versionId: 1,
    versionCount: 1,
    layoutsList: [],
    setLayoutsList: () => {}
  })

const rowOf = (rows: IFormattedDataStructureData[], keyId: number): IFormattedDataStructureData => {
  const row = rows.find((candidate) => (candidate.fieldData as any).name === keyId)

  if (row === undefined) {
    throw new Error(`the classification store contributed no version row for key ${keyId}`)
  }

  return row
}

/** What the rendered version field list mounts for one row (ObjectVersionsFieldsView). */
const renderVersionField = (row: IFormattedDataStructureData): void => {
  const fieldData = row.fieldData as any

  render(
    <DataComponent
      datatype='data'
      fieldType={ fieldData.fieldtype }
      name={ fieldData.name }
      value={ row.fieldValue }
      { ...fieldData }
    />
  )
}

const headings = (): Array<string | null> => screen.queryAllByRole('heading').map((heading) => heading.textContent)

const inputs = (): HTMLInputElement[] => screen.queryAllByRole('textbox')

const values = (): Array<string | null> => inputs().map((input) => input.value)

const TWO_VARIANTS: IVariantRow[] = [{ name: 'Metric' }, { name: 'Imperial' }]

/** The demo case: key 4873, two named variants, one value in each. */
const twoValues = {
  [GROUP_ID]: { default: { [MULTI_VALUE_KEY_ID]: [{ var: 'Metric', v: '22' }, { var: 'Imperial', v: '17' }] } }
}

describe('the version detail view renders a Classification Store key', () => {
  // the control: every other key type already renders here, and must keep doing so
  it('renders an input key with its stored value', async () => {
    const rows = await versionRows([inputKey()], { [GROUP_ID]: { default: { [INPUT_KEY_ID]: 'Alloy' } } })

    renderVersionField(rowOf(rows, INPUT_KEY_ID))

    expect(screen.queryByText(CONTEXT_ERROR)).toBeNull()
    expect(values()).toEqual(['Alloy'])
  })

  it('renders a multiValue key, its declared variants and their stored values', async () => {
    const rows = await versionRows([multiValueKey({ variants: TWO_VARIANTS, unqualifiedValue: false })], twoValues)

    renderVersionField(rowOf(rows, MULTI_VALUE_KEY_ID))

    expect(screen.queryByText(CONTEXT_ERROR)).toBeNull()
    expect(headings()).toEqual(expect.arrayContaining(['Metric', 'Imperial']))
    expect(values()).toEqual(expect.arrayContaining(['22', '17']))
  })

  it('renders a multiValue key that holds no value at all', async () => {
    const rows = await versionRows([multiValueKey({ variants: TWO_VARIANTS, unqualifiedValue: false })], {})

    renderVersionField(rowOf(rows, MULTI_VALUE_KEY_ID))

    expect(screen.queryByText(CONTEXT_ERROR)).toBeNull()
    expect(headings()).toEqual(expect.arrayContaining(['Metric', 'Imperial']))
  })
})

describe('the version detail view offers a multiValue key the slots the key declares', () => {
  it('offers only the declared variants for a key that declines the unqualified value', async () => {
    const rows = await versionRows([multiValueKey({ variants: TWO_VARIANTS, unqualifiedValue: false })], twoValues)

    renderVersionField(rowOf(rows, MULTI_VALUE_KEY_ID))

    expect(headings()).toEqual(['Metric', 'Imperial'])
    expect(screen.queryByText(DEFAULT_HEADING)).toBeNull()
  })

  // the flag can arrive on either half of the published key, so each is asserted to be read on its own
  it('reads the flag off the key layout where the blob carries none', async () => {
    const rows = await versionRows(
      [multiValueKey({ variants: TWO_VARIANTS }, { variants: TWO_VARIANTS, defaultVariant: false })],
      twoValues
    )

    renderVersionField(rowOf(rows, MULTI_VALUE_KEY_ID))

    expect(headings()).toEqual(['Metric', 'Imperial'])
  })

  it('still offers the unqualified value beside them where the key permits it', async () => {
    const rows = await versionRows([multiValueKey({ variants: TWO_VARIANTS, unqualifiedValue: true })], twoValues)

    renderVersionField(rowOf(rows, MULTI_VALUE_KEY_ID))

    expect(headings()).toEqual(['Metric', 'Imperial', DEFAULT_HEADING])
  })
})
