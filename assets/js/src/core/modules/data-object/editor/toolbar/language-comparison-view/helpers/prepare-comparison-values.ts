/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isEmpty, isEqual, isNil } from 'lodash'
import { type FormInstance } from 'antd'
import { type DynamicTypeObjectDataRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-registry'
import { type ILocalizedFieldDescriptor } from './process-layout-data'

interface IPrepareComparisonValuesProps {
  values: Record<string, any>
  descriptors: ILocalizedFieldDescriptor[]
  locales: Array<string | null>
  objectDataRegistry: DynamicTypeObjectDataRegistry
}

/**
 * Lets every type that contributed a column make its value writable, see
 * prepareLanguageComparisonValue.
 */
export const prepareComparisonValues = ({ values, descriptors, locales, objectDataRegistry }: IPrepareComparisonValuesProps): Record<string, any> => {
  const descriptorsByType = new Map<string, ILocalizedFieldDescriptor[]>()

  descriptors.forEach(descriptor => {
    const typeId = descriptor.typeId

    if (isNil(typeId) || isEmpty(typeId) || !objectDataRegistry.hasDynamicType(typeId)) {
      return
    }

    descriptorsByType.set(typeId, [...(descriptorsByType.get(typeId) ?? []), descriptor])
  })

  let prepared = values

  descriptorsByType.forEach((typeDescriptors, typeId) => {
    prepared = objectDataRegistry.getDynamicType(typeId).prepareLanguageComparisonValue({
      value: prepared,
      descriptors: typeDescriptors,
      locales
    })
  })

  return prepared
}

/**
 * Writes the prepared fields with setFields rather than setFieldsValue: the merge of
 * setFieldsValue keeps an empty list where the prepared value holds an object, which is
 * the very coercion the preparation is for.
 */
export const applyComparisonValues = (
  form: Pick<FormInstance, 'setFields'>,
  values: Record<string, any>,
  prepared: Record<string, any>
): void => {
  const fields = Object.keys(prepared)
    .filter(name => !isEqual(prepared[name], values[name]))
    .map(name => ({ name: [name], value: prepared[name] }))

  if (fields.length === 0) {
    return
  }

  form.setFields(fields)
}

interface IApplyToEditFormProps {
  editForm: Pick<FormInstance, 'getFieldsValue' | 'setFields' | 'setFieldsValue'>
  changedValues: Record<string, any>
  descriptors: ILocalizedFieldDescriptor[]
  locales: Array<string | null>
  objectDataRegistry: DynamicTypeObjectDataRegistry
}

/**
 * Hands the comparison's changes to the editor form. The buckets it writes into are coerced
 * there as well, because the merge of setFieldsValue cannot replace an empty list with an
 * object: the editor would keep a bucket its own control reads as empty, and the value the
 * comparison just saved would be missing from the editor until the object is loaded again.
 */
export const applyChangedValuesToEditForm = ({
  editForm,
  changedValues,
  descriptors,
  locales,
  objectDataRegistry
}: IApplyToEditFormProps): void => {
  const values: Record<string, any> = editForm.getFieldsValue(true)

  applyComparisonValues(editForm, values, prepareComparisonValues({
    values,
    descriptors,
    locales,
    objectDataRegistry
  }))

  editForm.setFieldsValue(changedValues)
}
