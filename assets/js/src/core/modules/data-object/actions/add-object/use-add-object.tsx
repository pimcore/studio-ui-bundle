/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useAppDispatch } from '@sdk/app'
import { type ItemType } from '@Pimcore/components/dropdown/dropdown'
import { refreshNodeChildren } from '@Pimcore/components/element-tree/element-tree-slice'
import { type TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'
import { Icon } from '@Pimcore/components/icon/icon'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import trackError, { ApiError, GeneralError } from '@Pimcore/modules/app/error-handler'
import {
  type ClassDefinitionListItem,
  useClassDefinitionCollectionCreatableQuery
} from '@Pimcore/modules/class-definition/class-definition-slice.gen'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'
import { useTreePermission } from '@Pimcore/components/element-tree/provider/tree-permission-provider/use-tree-permission'
import { useTreeFilter } from '@Pimcore/components/element-tree/provider/tree-filter-provider/use-tree-filter'
import { TreePermission } from '@Pimcore/modules/perspectives/enums/tree-permission'
import { isAllowed } from '@Pimcore/modules/auth/permission-helper'
import { UserPermission } from '@Pimcore/modules/auth/enums/user-permission'
import { isEmpty, isNil } from 'lodash'
import React, { useEffect } from 'react'
import { Spin } from '@Pimcore/components/spin/spin'
import { useTranslation } from 'react-i18next'
import { useDataObjectAddMutation } from '../../data-object-api-slice.gen'
import { useDataObjectHelper } from '../../hooks/use-data-object-helper'
import { ContextMenuActionName } from '@Pimcore/modules/element/actions'

interface UseAddObjectHookReturn {
  addObjectTreeContextMenuItem: (node: TreeNodeProps) => ItemType
  addObject: (className: string, classId: string, parentId: number, onFinish?: (newName: string) => void) => void
}

export const useAddObject = (): UseAddObjectHookReturn => {
  const { t } = useTranslation()
  const modal = useFormModal()
  const [addDataObjectMutation] = useDataObjectAddMutation()
  const dispatch = useAppDispatch()
  const { openDataObject } = useDataObjectHelper()
  const { isTreeActionAllowed } = useTreePermission()
  const { classIds: allowedClassIds } = useTreeFilter()
  // the creatable collection only contains the classes the current user may create
  const { data: creatableClasses, isLoading, error } = useClassDefinitionCollectionCreatableQuery({}, {
    skip: !isAllowed(UserPermission.Objects)
  })

  useEffect(() => {
    if (!isNil(error)) {
      trackError(new ApiError(error))
    }
  }, [error])

  // element tree widgets can additionally restrict the creatable classes via their `classes` allowlist
  const getAvailableClassDefinitions = (): ClassDefinitionListItem[] => {
    const classDefinitions = creatableClasses?.items ?? []

    if (allowedClassIds === undefined || allowedClassIds.length === 0) {
      return classDefinitions
    }

    return classDefinitions.filter((classDefinition) => allowedClassIds.includes(classDefinition.id))
  }

  const getClassEntries = (node: TreeNodeProps): ItemType[] => {
    if (isLoading) {
      return [{
        key: 'add-object-loading',
        type: 'custom',
        component: (<Spin type="classic" />)
      }]
    }

    let classHierarchy: ItemType[] = []
    const classDefinitions = getAvailableClassDefinitions()

    const structuredClassDefinitions = [...classDefinitions]
      .sort((a, b) => t(a.name).localeCompare(t(b.name), undefined, { sensitivity: 'base' }))
      .reduce<Record<string, ClassDefinitionListItem[]>>((acc, classDefinition) => {
        const groupName = isNil(classDefinition.group) || isEmpty(classDefinition.group)
          ? 'undefined'
          : classDefinition.group

        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        if (acc[groupName] === undefined) {
          acc[groupName] = []
        }

        acc[groupName].push(classDefinition)

        return acc
      }, {})

    if (structuredClassDefinitions.undefined !== undefined) {
      classHierarchy = structuredClassDefinitions.undefined.map(classDefinition => getDataObjectEntry(classDefinition, node))
    }

    const sortedGroups = Object.entries(structuredClassDefinitions)
      .sort(([groupA], [groupB]) => t(groupA).localeCompare(t(groupB), undefined, { sensitivity: 'base' }))

    for (const [group, classDefinitions] of sortedGroups) {
      if (group !== 'undefined') {
        classHierarchy.push({
          label: t(group),
          key: 'add-object-group-' + group,
          icon: <Icon value={ 'folder' } />,
          children: classDefinitions.map(classDefinition => getDataObjectEntry(classDefinition, node))
        })
      }
    }

    return classHierarchy
  }

  const getDataObjectEntry = (classDefinition: ClassDefinitionListItem, node: TreeNodeProps): ItemType => {
    return {
      label: t(classDefinition.name),
      key: classDefinition.id,
      icon: classDefinition.icon.value === 'class'
        ? (
          <Icon
            subIconName='new'
            subIconVariant={ 'green' }
            value='data-object'
          />
          )
        : (
          <Icon
            subIconName='new'
            subIconVariant={ 'green' }
            { ...classDefinition.icon }
          />
          ),
      onClick: () => {
        const parentId = parseInt(node.id)
        createDataObject(classDefinition, parentId)
      }
    }
  }

  const addObject = (
    className: string,
    classId: string,
    parentId: number,
    onFinish?: (newName: string) => void
  ): void => {
    modal.input({
      title: t('data-object.create-data-object', { className }),
      label: t('form.label.new-item'),
      rule: {
        required: true,
        message: t('form.validation.required')
      },
      onOk: async (value: string) => {
        await createDataObjectMutation(classId, value, parentId)
        onFinish?.(value)
      }
    })
  }

  const createDataObject = (
    classDefinition: ClassDefinitionListItem,
    parentId: number,
    onFinish?: (newName: string) => void
  ): void => {
    addObject(classDefinition.name, classDefinition.id, parentId, onFinish)
  }

  const createDataObjectMutation = async (
    classId: string,
    name: string,
    parentId: number
  ): Promise<void> => {
    const createDataObjectTask = addDataObjectMutation({
      parentId,
      dataObjectAddParameters: {
        key: name,
        classId,
        type: 'object'
      }
    })

    try {
      const response = await createDataObjectTask

      if (response.error !== undefined) {
        trackError(new ApiError(response.error))
        return
      }

      const { id } = response.data
      void openDataObject({ config: { id } })
      dispatch(refreshNodeChildren({ nodeId: String(parentId), elementType: 'data-object' }))
    } catch (error) {
      trackError(new GeneralError('Error creating data object'))
    }
  }

  const isAddObjectHidden = (node: TreeNodeProps): boolean => {
    return !isTreeActionAllowed(TreePermission.AddObject) ||
      !checkElementPermission(node.permissions, 'create') ||
      (!isLoading && isEmpty(getAvailableClassDefinitions()))
  }

  const addObjectTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('data-object.tree.context-menu.add-object'),
      key: ContextMenuActionName.addObject,
      icon: <Icon value={ 'folder' } />,
      hidden: isAddObjectHidden(node),
      children: getClassEntries(node)
    }
  }

  return {
    addObjectTreeContextMenuItem,
    addObject
  }
}
