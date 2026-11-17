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
import { cloneDeep, get, isArray, isEmpty, isNil, isPlainObject, isUndefined, mergeWith } from 'lodash'
import { type FormItemProps } from 'antd'
import {
  DynamicTypeObjectDataAbstract,
  type IMergeChangedValuesContext,
  type IPrepareLanguageComparisonValueProps
} from '../dynamic-type-object-data-abstract'
import { ClassificationStore, type ClassificationStoreProps } from '../components/classification-store/classification-store'
import { getKeyLabel, type KeyLabelKey } from '../components/classification-store/utils/key-label'
import { filterInheritedFields } from '../components/classification-store/utils/group-value'
import { type IExtractLocalizedFieldsProps, type ILocalizedFieldDescriptor } from '@Pimcore/modules/data-object/editor/toolbar/language-comparison-view/helpers/process-layout-data'
import {
  type IFormattedDataStructureData,
  type IProcessVersionFieldDataProps
} from '@Pimcore/modules/data-object/editor/shared-tab-manager/tabs/versions/types'
import { getBreadcrumbTitle } from '@Pimcore/modules/data-object/editor/shared-tab-manager/tabs/versions/details-functions'
import { type ClassificationStoreGroup } from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice.gen'
import { isEmptyValue } from '@Pimcore/utils/type-utils'

export const CLASSIFICATION_STORE_LANGUAGE_COMPARISON_DYNAMIC_LOCALE = 'language-comparison-locale'

const normalizeGroups = (value: unknown): any[] => {
  if (Array.isArray(value)) {
    return value
  }

  if (value != null && typeof value === 'object') {
    return Object.values(value)
  }

  return []
}

/**
 * Turns every level of a store path into a plain object: rc-field-form creates an array for
 * a numeric path segment and keeps an empty group an array, and an array that carries a key
 * id is lost on JSON.stringify.
 */
const coerceObjectPath = (target: Record<string, any>, path: string[]): void => {
  let node = target

  path.forEach(segment => {
    if (!isPlainObject(node[segment])) {
      node[segment] = {}
    }

    node = node[segment]
  })
}

/** A group without own values is encoded as an empty list, which must not win over keys. */
const preferKeys = (currentValue: unknown, incomingValue: unknown): unknown => {
  if (isArray(currentValue) && isPlainObject(incomingValue)) {
    return incomingValue
  }

  if (isPlainObject(currentValue) && isArray(incomingValue) && isEmpty(incomingValue)) {
    return currentValue
  }

  return undefined
}

export class DynamicTypeObjectDataClassificationStore extends DynamicTypeObjectDataAbstract {
  id: string = 'classificationstore'

  getObjectDataComponent (props: ClassificationStoreProps): React.ReactElement<ClassificationStoreProps> {
    return <ClassificationStore { ...props } />
  }

  getObjectDataFormItemProps (props: ClassificationStoreProps): FormItemProps {
    return {
      ...super.getObjectDataFormItemProps(props),
      label: null
    }
  }

  async extractLocalizedFields (props: IExtractLocalizedFieldsProps): Promise<ILocalizedFieldDescriptor[] | false> {
    const { item, fieldBreadcrumbTitle, formPath } = props

    // The key's own flag decides, a null or absent one inherits the field's, so a mixed store
    // lists exactly the keys that hold a value per language.
    const isFieldLocalized = item?.localized === true

    const activeGroupDefinitions = normalizeGroups(item.activeGroupDefinitions)

    if (activeGroupDefinitions.length === 0) return []

    const getTitle: string | undefined = !isEmptyValue(item?.title) ? item?.title : item?.name
    const breadcrumbTitle = getBreadcrumbTitle(fieldBreadcrumbTitle, getTitle ?? '')

    const processClassificationStoreData = ({
      data,
      updatedFieldBreadcrumbTitle = breadcrumbTitle,
      groupId
    }: {
      data: any[]
      updatedFieldBreadcrumbTitle?: string
      groupId?: number
    }): ILocalizedFieldDescriptor[] => {
      return normalizeGroups(data).flatMap((dataItem: any) => {
        const keys = normalizeGroups(dataItem.keys)

        if (keys.length > 0) {
          const currentTitle: string | undefined = !isEmptyValue(dataItem?.title) ? dataItem?.title : dataItem?.name
          const nextBreadcrumbTitle = getBreadcrumbTitle(updatedFieldBreadcrumbTitle, currentTitle ?? '')

          return processClassificationStoreData({
            data: keys,
            updatedFieldBreadcrumbTitle: nextBreadcrumbTitle,
            groupId: dataItem.id
          })
        }

        if (isEmpty(dataItem.definition) || isUndefined(groupId)) {
          return []
        }

        if ((dataItem.localized ?? isFieldLocalized) !== true) {
          return []
        }

        // The key id stays a string: a numeric path segment makes rc-field-form write the
        // value into an array instead of into the key bucket.
        return [{
          fieldBreadcrumbTitle: updatedFieldBreadcrumbTitle,
          fieldData: { ...dataItem.definition, name: String(dataItem.id), title: getKeyLabel(dataItem as KeyLabelKey) },
          formPath: [...formPath, item.name, String(groupId), CLASSIFICATION_STORE_LANGUAGE_COMPARISON_DYNAMIC_LOCALE, String(dataItem.id)],
          localeInFormPath: true
        }]
      })
    }

    return processClassificationStoreData({ data: activeGroupDefinitions })
  }

  /**
   * The store the backend sends leaves an empty group and an empty language out, as an empty
   * list or not at all. The normal editor writes its keys through Form.KeyedList, which creates
   * the missing levels as objects; a comparison column is a plain form item, so the buckets it
   * writes into are coerced here, before it can write.
   */
  prepareLanguageComparisonValue ({ value, descriptors, locales }: IPrepareLanguageComparisonValueProps): Record<string, any> {
    const renderedLocales = locales.filter((locale): locale is string => !isNil(locale) && !isEmpty(locale))

    const bucketPaths = descriptors.flatMap(descriptor => renderedLocales.map(
      locale => descriptor.formPath
        .slice(0, -1)
        .map(part => String(part === CLASSIFICATION_STORE_LANGUAGE_COMPARISON_DYNAMIC_LOCALE ? locale : part))
    ))

    if (bucketPaths.length === 0) {
      return value
    }

    const prepared = cloneDeep(value)

    bucketPaths.forEach(bucketPath => { coerceObjectPath(prepared, bucketPath) })

    return prepared
  }

  /**
   * The language comparison applies the whole store, the keys that still inherit included, so
   * the payload is rebuilt the way the editor's own save path builds it. Dropping the inherited
   * keys here also keeps them out of an auto save that follows a comparison change.
   *
   * Only a caller that knows the inheritance gets that treatment. A change of the editor's own
   * control arrives as the payload the control already built, which replaces the current value
   * as it always did - rebuilding it would encode its deleted groups as empty ones.
   */
  mergeChangedValues = (current: any, incoming: any, context?: IMergeChangedValuesContext): any => {
    if (isUndefined(context) || !isPlainObject(incoming)) {
      return incoming
    }

    const payload = filterInheritedFields(incoming, context.isInherited)

    return isPlainObject(current) ? mergeWith({}, current, payload, preferKeys) : payload
  }

  async processVersionFieldData (props: IProcessVersionFieldDataProps): Promise<IFormattedDataStructureData[]> {
    const { item, fieldBreadcrumbTitle, fieldValueByName, fieldPath, versionId, versionCount } = props

    const getFieldData = ({ fieldData, fieldValue, fieldBreadcrumbTitle, fieldPathValue }: { fieldData: any, fieldValue: any, fieldBreadcrumbTitle: string, fieldPathValue: string }): IFormattedDataStructureData => {
      return {
        fieldBreadcrumbTitle,
        versionId,
        versionCount,
        fieldData,
        fieldValue,
        fieldPath: fieldPathValue
      }
    }

    const processClassificationStoreData = ({ data, updatedFieldBreadcrumbTitle = fieldBreadcrumbTitle, groupId, fieldPathValue = fieldPath }: { data: ClassificationStoreGroup[], updatedFieldBreadcrumbTitle?: string, groupId?: number, fieldPathValue?: string }): IFormattedDataStructureData[] => {
      return normalizeGroups(data).flatMap((dataItem: any) => {
        const keys = normalizeGroups(dataItem.keys)

        if (keys.length > 0) {
          const breadcrumbField = dataItem.title ?? dataItem.name
          const breadcrumbTitle = getBreadcrumbTitle(updatedFieldBreadcrumbTitle, breadcrumbField as string)

          const getFieldPathValue = isEmptyValue(fieldPathValue) ? `${dataItem.id}` : `${fieldPathValue}.${dataItem.id}`

          return processClassificationStoreData({ data: keys, updatedFieldBreadcrumbTitle: breadcrumbTitle, groupId: dataItem.id, fieldPathValue: getFieldPathValue })
        }

        if (!isEmpty(dataItem.definition)) {
          if (isUndefined(groupId)) return []

          const fieldValue: object = get(fieldValueByName, groupId)

          if (isEmpty(fieldValue)) {
            const getFieldPathValue = isEmptyValue(fieldPathValue) ? `${dataItem.id}` : `${fieldPathValue}.${dataItem.id}`

            return getFieldData({ fieldData: { ...dataItem.definition, name: dataItem.id, title: getKeyLabel(dataItem as KeyLabelKey) }, fieldValue, fieldBreadcrumbTitle: updatedFieldBreadcrumbTitle, fieldPathValue: getFieldPathValue })
          }

          return Object.entries(fieldValue).map(([key, value]) => {
            const getFieldPathValue = isEmptyValue(fieldPathValue) ? `${key}` : `${fieldPathValue}.${key}.${dataItem.id}`

            return getFieldData({ fieldData: { ...dataItem.definition, name: dataItem.id, title: getKeyLabel(dataItem as KeyLabelKey), locale: key }, fieldValue: value?.[dataItem.id], fieldBreadcrumbTitle: updatedFieldBreadcrumbTitle, fieldPathValue: getFieldPathValue })
          })
        }

        return []
      })
    }

    async function handleClassificationStoreData (): Promise<IFormattedDataStructureData[]> {
      try {
        if (isEmpty(item)) return []

        const breadcrumbField: string = item.title ?? item.name
        const breadcrumbTitle = getBreadcrumbTitle(fieldBreadcrumbTitle, breadcrumbField)

        return processClassificationStoreData({
          data: item.activeGroupDefinitions,
          updatedFieldBreadcrumbTitle: breadcrumbTitle
        })
      } catch (e) {
        console.error('Error while handling Classification Store data:', e)

        return []
      }
    }

    return await handleClassificationStoreData()
  }
}
