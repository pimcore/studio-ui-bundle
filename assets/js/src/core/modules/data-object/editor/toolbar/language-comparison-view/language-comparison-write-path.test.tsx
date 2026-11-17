/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect } from 'react'
import { Form, type FormInstance } from 'antd'
import { act, render } from '@testing-library/react'
import {
  CLASSIFICATION_STORE_LANGUAGE_COMPARISON_DYNAMIC_LOCALE,
  DynamicTypeObjectDataClassificationStore
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-classification-store'
import { type DynamicTypeObjectDataRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-registry'
import { mergeFormChanges } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/edit-form-provider/utils/merge-form-changes'
import { type ILocalizedFieldDescriptor } from './helpers/process-layout-data'
import { applyComparisonValues, prepareComparisonValues } from './helpers/prepare-comparison-values'

jest.mock('@Pimcore/app/depency-injection', () => ({ container: { get: jest.fn() } }))
jest.mock('@Pimcore/app/config/services/service-ids', () => ({ serviceIds: {} }))
jest.mock('@Pimcore/components/icon/icon', () => ({ Icon: () => null }))
jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/label/field-label', () => ({ FieldLabel: () => null }))
jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/field-width-provider', () => ({ defaultFieldWidthValues: {} }))
jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/grid-cells/image/default-preview', () => ({ DefaultPreview: () => null }))
jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/classification-store', () => ({ ClassificationStore: () => null }))
jest.mock('@sdk/utils', () => ({ isNonEmptyString: () => false }))
jest.mock('@Pimcore/utils/helpers', () => ({ respectLineBreak: (value: string) => value }))
jest.mock('@Pimcore/modules/data-object/editor/shared-tab-manager/tabs/versions/details-functions', () => ({
  getBreadcrumbTitle: (first: string, second: string) => [first, second].filter(Boolean).join('/')
}))

const FIELD_NAME = 'classificationStore'
const GROUP_ID = 123
const EDITED_KEY_ID = 456
const OTHER_KEY_ID = 457
const TYPE_ID = 'classificationstore'
const EDITED_LOCALE = 'de'
const TYPED_VALUE = 'typed'

const classificationStoreType = new DynamicTypeObjectDataClassificationStore()

const objectDataRegistry = {
  hasDynamicType: (typeId: string) => typeId === TYPE_ID,
  getDynamicType: () => classificationStoreType
} as unknown as DynamicTypeObjectDataRegistry

const layoutItem = {
  name: FIELD_NAME,
  title: 'Classification store',
  datatype: 'data',
  fieldtype: TYPE_ID,
  localized: true,
  activeGroupDefinitions: [{
    id: GROUP_ID,
    name: 'group',
    keys: [EDITED_KEY_ID, OTHER_KEY_ID].map(keyId => ({
      id: keyId,
      name: `key-${keyId}`,
      localized: true,
      definition: { name: `key-${keyId}`, datatype: 'data', fieldtype: 'input' }
    }))
  }]
}

const extractDescriptors = async (): Promise<ILocalizedFieldDescriptor[]> => {
  const descriptors = await classificationStoreType.extractLocalizedFields({
    objectId: 1,
    item: layoutItem,
    objectData: {},
    fieldBreadcrumbTitle: '',
    formPath: [],
    objectDataRegistry,
    layoutsList: [],
    setLayoutsList: () => {}
  })

  if (descriptors === false) {
    throw new Error('the classification store contributed no comparison column')
  }

  // process-layout-data stamps the contributing type on every descriptor
  return descriptors.map(descriptor => ({ ...descriptor, typeId: TYPE_ID }))
}

/** The name path language-comparison-content renders the key at: resolved group + key name. */
const getFieldPath = (descriptor: ILocalizedFieldDescriptor, locale: string): Array<string | number> => [
  ...descriptor.formPath
    .slice(0, -1)
    .map(part => part === CLASSIFICATION_STORE_LANGUAGE_COMPARISON_DYNAMIC_LOCALE ? locale : part),
  descriptor.fieldData.name as string | number
]

const findDescriptor = (descriptors: ILocalizedFieldDescriptor[], keyId: number): ILocalizedFieldDescriptor => {
  const descriptor = descriptors.find(item => String(item.fieldData.name) === String(keyId))

  if (descriptor === undefined) {
    throw new Error(`no comparison column for key ${keyId}`)
  }

  return descriptor
}

const renderComparisonForm = (): FormInstance => {
  let formInstance: FormInstance | undefined

  const Harness = ({ onReady }: { onReady: (form: FormInstance) => void }): React.JSX.Element => {
    const [form] = Form.useForm()

    useEffect(() => { onReady(form) }, [form])

    return <Form form={ form } />
  }

  render(<Harness onReady={ (form) => { formInstance = form } } />)

  if (formInstance === undefined) {
    throw new Error('the comparison form was not created')
  }

  return formInstance
}

interface IEditResult {
  payload: Record<string, any>
  serializedPayload: Record<string, any>
}

/**
 * Drives the comparison dialog's write path for one edit: seed the form from the editor,
 * let the types prepare the buckets, write the key the way the rendered item does, and
 * hand the whole field to the editor form's merge the way Apply does.
 */
const editInComparison = async ({
  initialValues,
  keyId = EDITED_KEY_ID,
  locales = [EDITED_LOCALE, 'en'],
  isInherited = () => false
}: {
  initialValues: Record<string, any>
  keyId?: number
  locales?: string[]
  isInherited?: (fieldName: string) => boolean
}): Promise<IEditResult> => {
  const descriptors = await extractDescriptors()
  const form = renderComparisonForm()

  act(() => { form.setFieldsValue(initialValues) })

  act(() => {
    const values: Record<string, any> = form.getFieldsValue(true)

    applyComparisonValues(form, values, prepareComparisonValues({
      values,
      descriptors,
      locales,
      objectDataRegistry
    }))
  })

  act(() => {
    form.setFieldValue(getFieldPath(findDescriptor(descriptors, keyId), EDITED_LOCALE), TYPED_VALUE)
  })

  const payload = mergeFormChanges(
    {},
    { [FIELD_NAME]: form.getFieldValue(FIELD_NAME) },
    objectDataRegistry,
    new Map([[FIELD_NAME, TYPE_ID]]),
    { isInherited }
  )

  return { payload, serializedPayload: JSON.parse(JSON.stringify(payload)) }
}

describe('the language comparison saves what was typed into it', () => {
  it('keeps the value when the whole group is loaded as an empty list', async () => {
    const { serializedPayload } = await editInComparison({
      initialValues: { [FIELD_NAME]: { [GROUP_ID]: [] } }
    })

    expect(serializedPayload).toEqual({
      [FIELD_NAME]: { [GROUP_ID]: { [EDITED_LOCALE]: { [EDITED_KEY_ID]: TYPED_VALUE } } }
    })
  })

  it('keeps the value when the edited language bucket is missing from the group', async () => {
    const { payload, serializedPayload } = await editInComparison({
      initialValues: { [FIELD_NAME]: { [GROUP_ID]: { default: { [OTHER_KEY_ID]: 'language independent' } } } }
    })

    expect(Array.isArray(payload[FIELD_NAME][GROUP_ID][EDITED_LOCALE])).toBe(false)
    expect(serializedPayload[FIELD_NAME][GROUP_ID][EDITED_LOCALE]).toEqual({ [EDITED_KEY_ID]: TYPED_VALUE })
  })

  it('does not write an inherited key as an own value', async () => {
    const { serializedPayload } = await editInComparison({
      initialValues: {
        [FIELD_NAME]: {
          [GROUP_ID]: {
            [EDITED_LOCALE]: {
              [EDITED_KEY_ID]: 'own value',
              [OTHER_KEY_ID]: 'inherited value'
            }
          }
        }
      },
      // named like the inheritance state of the editor: the full form path of the key
      isInherited: (fieldName) => fieldName === `${FIELD_NAME}.${GROUP_ID}.${EDITED_LOCALE}.${OTHER_KEY_ID}`
    })

    expect(serializedPayload).toEqual({
      [FIELD_NAME]: { [GROUP_ID]: { [EDITED_LOCALE]: { [EDITED_KEY_ID]: TYPED_VALUE } } }
    })
  })
})

describe('a change of the classification store control itself', () => {
  it('keeps the payload the control built, its deleted groups included', () => {
    // what ClassificationStore.buildPayload emits: own values, a marker for a deleted group
    const controlPayload = { 5: { action: 'deleted' }, 7: { [EDITED_LOCALE]: { 9: 'own value' } } }

    const payload = mergeFormChanges(
      { [FIELD_NAME]: { 7: { [EDITED_LOCALE]: { 9: 'earlier value' } } } },
      { [FIELD_NAME]: controlPayload },
      objectDataRegistry,
      new Map([[FIELD_NAME, TYPE_ID]])
    )

    expect(payload[FIELD_NAME]).toEqual(controlPayload)
  })
})
