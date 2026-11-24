/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type DynamicTypeObjectDataRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-registry'
import { DynamicTypesList } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/constants/typesList'
import { type IExtractLocalizedFieldsProps, type ILocalizedFieldDescriptor, processNestedLayoutData } from './process-layout-data'

const STORE_FIELD = 'store'
const WRAPPER_FIELD = 'blockItems'
const GROUP_ID = '7'
const KEY_ID = '11'

const storeLayoutItem = { name: STORE_FIELD, datatype: 'data', fieldtype: DynamicTypesList.CLASSIFICATION_STORE }

/**
 * A wrapper type - an object brick, a block, a field collection - resolves its members through
 * processNestedLayoutData, so what it returns is already stamped with the type that contributed
 * the column. Only its own item index is added to the path.
 */
const wrapperLayoutItem = {
  name: WRAPPER_FIELD,
  datatype: 'data',
  fieldtype: DynamicTypesList.BLOCK,
  children: [storeLayoutItem]
}

const storeType = {
  extractLocalizedFields: async (props: IExtractLocalizedFieldsProps): Promise<ILocalizedFieldDescriptor[]> => [{
    fieldBreadcrumbTitle: '',
    fieldData: { name: KEY_ID } as unknown as ILocalizedFieldDescriptor['fieldData'],
    formPath: [...props.formPath, props.item.name, GROUP_ID, 'locale', KEY_ID]
  }]
}

const wrapperType = {
  extractLocalizedFields: async (props: IExtractLocalizedFieldsProps): Promise<ILocalizedFieldDescriptor[]> => await processNestedLayoutData({
    ...props,
    data: [storeLayoutItem],
    formPath: [...props.formPath, props.item.name, 0]
  })
}

const types: Record<string, unknown> = {
  [DynamicTypesList.CLASSIFICATION_STORE]: storeType,
  [DynamicTypesList.BLOCK]: wrapperType
}

const objectDataRegistry = {
  hasDynamicType: (typeId: string) => typeId in types,
  getDynamicType: (typeId: string) => types[typeId]
} as unknown as DynamicTypeObjectDataRegistry

const extract = async (data: unknown[]): Promise<ILocalizedFieldDescriptor[]> => await processNestedLayoutData({
  objectId: 1,
  data: data as any,
  objectData: {},
  objectDataRegistry,
  fieldBreadcrumbTitle: '',
  formPath: [],
  layoutsList: [],
  setLayoutsList: () => {}
})

describe('the type a comparison column is stamped with', () => {
  it('is the type that created the descriptor itself', async () => {
    const descriptors = await extract([storeLayoutItem])

    expect(descriptors.map(descriptor => descriptor.typeId)).toEqual([DynamicTypesList.CLASSIFICATION_STORE])
  })

  it('stays the contributing type for a column inside a wrapper field', async () => {
    const descriptors = await extract([wrapperLayoutItem])

    expect(descriptors.map(descriptor => descriptor.formPath)).toEqual([
      [WRAPPER_FIELD, 0, STORE_FIELD, GROUP_ID, 'locale', KEY_ID]
    ])
    expect(descriptors.map(descriptor => descriptor.typeId)).toEqual([DynamicTypesList.CLASSIFICATION_STORE])
  })

  it('is the type of a localized field child', async () => {
    const descriptors = await extract([{
      name: 'localizedfields',
      datatype: 'data',
      fieldtype: DynamicTypesList.LOCALIZED_FIELDS,
      children: [{ name: 'title' }]
    }])

    expect(descriptors.map(descriptor => descriptor.typeId)).toEqual([DynamicTypesList.LOCALIZED_FIELDS])
  })
})
