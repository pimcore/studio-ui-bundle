/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useEffect } from 'react'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import {
  type ClassDefinitionListItem,
  useClassDefinitionCollectionCreatableQuery
} from '@Pimcore/modules/class-definition/class-definition-slice.gen'
import { isAllowed } from '@Pimcore/modules/auth/permission-helper'
import { UserPermission } from '@Pimcore/modules/auth/enums/user-permission'
import { isNil } from 'lodash'

interface UseCreatableRelationClassesResult {
  classes: ClassDefinitionListItem[]
  isLoading: boolean
}

/**
 * Creatable classes narrowed to the ones the relation accepts.
 *
 * The collection is already restricted to what the current user may create, so a class the
 * relation allows but the user cannot create is filtered out here rather than failing later.
 *
 * `allowedClasses` is matched against both id and name: the plain object relation derives it
 * from the class-definition `classes` entries (names), while the advanced variant passes
 * `allowedClassId` straight through.
 */
export const useCreatableRelationClasses = (allowedClasses?: string[]): UseCreatableRelationClassesResult => {
  const { data, isLoading, error } = useClassDefinitionCollectionCreatableQuery({}, {
    skip: !isAllowed(UserPermission.Objects)
  })

  useEffect(() => {
    if (!isNil(error)) {
      trackError(new ApiError(error))
    }
  }, [error])

  const creatableClasses = data?.items ?? []

  if (allowedClasses === undefined || allowedClasses.length === 0) {
    return { classes: creatableClasses, isLoading }
  }

  return {
    classes: creatableClasses.filter(({ id, name }) => allowedClasses.includes(id) || allowedClasses.includes(name)),
    isLoading
  }
}
