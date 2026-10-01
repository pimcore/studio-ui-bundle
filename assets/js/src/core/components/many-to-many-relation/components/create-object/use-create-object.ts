/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import trackError, { ApiError, GeneralError } from '@Pimcore/modules/app/error-handler'
import { useDataObjectAddMutation } from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import { type ClassDefinitionListItem } from '@Pimcore/modules/class-definition/class-definition-slice.gen'
import { type ManyToManyRelationValueItem } from '../../hooks/use-value'
import { type CreateObjectFormValues } from './create-object-form'
import { buildCreatedRelationItem } from './utils'

interface UseCreateObjectProps {
  classes: ClassDefinitionListItem[]
  onCreated: (item: ManyToManyRelationValueItem) => void
  onSuccess: () => void
}

interface UseCreateObjectResult {
  createObject: (values: CreateObjectFormValues) => Promise<void>
  isCreating: boolean
}

/**
 * Creates the object and hands the resulting row to the relation.
 *
 * Kept out of the modal so the request payload and both outcomes can be covered without
 * mounting the form.
 */
export const useCreateObject = ({ classes, onCreated, onSuccess }: UseCreateObjectProps): UseCreateObjectResult => {
  const [addDataObject, { isLoading: isCreating }] = useDataObjectAddMutation()

  const createObject = async (values: CreateObjectFormValues): Promise<void> => {
    const classDefinition = classes.find(({ id }) => id === values.classId)

    if (classDefinition === undefined) {
      trackError(new GeneralError('No creatable class selected for the new related object'))
      return
    }

    try {
      const response = await addDataObject({
        parentId: values.parent.id,
        dataObjectAddParameters: { key: values.key, classId: classDefinition.id, type: 'object' }
      })

      if (response.error !== undefined) {
        trackError(new ApiError(response.error))
        return
      }

      onCreated(buildCreatedRelationItem({
        id: response.data.id,
        key: values.key,
        className: classDefinition.name,
        parentPath: values.parent.fullPath
      }))

      onSuccess()
    } catch (error) {
      trackError(new GeneralError(`Error creating the related data object: ${String(error)}`))
    }
  }

  return { createObject, isCreating }
}
