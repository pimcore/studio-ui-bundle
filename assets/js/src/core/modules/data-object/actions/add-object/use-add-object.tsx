/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { useAppDispatch } from '@Pimcore/app/store'
import { type ItemType } from '@Pimcore/components/dropdown/dropdown'
import { refreshNodeChildren } from '@Pimcore/components/element-tree/element-tree-slice'
import { type TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'
import { Icon } from '@Pimcore/components/icon/icon'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import trackError, { ApiError, GeneralError } from '@Pimcore/modules/app/error-handler'
import {
  type ClassDefinitionListItem
} from '@Pimcore/modules/class-definition/class-definition-slice.gen'
import { useClassDefinitions } from '@Pimcore/modules/class-definition/hooks/use-class-definitions'
import _ from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDataObjectAddMutation } from '../../data-object-api-slice.gen'
import { useDataObjectHelper } from '../../hooks/use-data-object-helper'

interface UseAddObjectHookReturn {
  addObjectTreeContextMenuItem: (node: TreeNodeProps) => ItemType
}

export const useAddObject = (): UseAddObjectHookReturn => {
  const { t } = useTranslation()
  const modal = useFormModal()
  const [addDataObjectMutation] = useDataObjectAddMutation()
  const dispatch = useAppDispatch()
  const { openDataObject } = useDataObjectHelper()
  const { loadClassDefinitions, getClassDefinitions } = useClassDefinitions()

  void loadClassDefinitions()

  const getClassEntries = (node: TreeNodeProps): ItemType[] => {
    let classHirachy: ItemType[] = []
    const classDefintions = getClassDefinitions()

    const structuredClassDefinitions = [...classDefintions]
      .sort((a, b) => a.name.localeCompare(b.name))
      .reduce<Record<string, ClassDefinitionListItem[]>>((acc, classDefinition) => {
      const groupName = _.isEmpty(classDefinition.group)
        ? 'undefined'
        : classDefinition.group

      if (acc[groupName] === undefined) {
        acc[groupName] = []
      }

      acc[groupName].push(classDefinition)

      return acc
    }, {})

    if (structuredClassDefinitions.undefined !== undefined) {
      classHirachy = structuredClassDefinitions.undefined.map(classDefinition => getDataObjectEntry(classDefinition, node))
    }

    for (const [group, classDefinitions] of Object.entries(structuredClassDefinitions)) {
      if (group !== 'undefined') {
        classHirachy.push({
          label: t(group),
          key: 'add-object-group-' + group,
          icon: <Icon value={ 'folder' } />,
          children: classDefinitions.map(classDefinition => getDataObjectEntry(classDefinition, node))
        })
      }
    }

    return classHirachy
  }

  const getDataObjectEntry = (classDefinition: ClassDefinitionListItem, node: TreeNodeProps): ItemType => {
    return {
      label: t(classDefinition.name),
      key: classDefinition.id,
      icon: <Icon { ...classDefinition.icon } />,
      onClick: () => {
        const parentId = parseInt(node.id)
        createDataObject(classDefinition, parentId)
      }
    }
  }

  const createDataObject = (
    classDefinition: ClassDefinitionListItem,
    parentId: number,
    onFinish?: (newName: string) => void
  ): void => {
    modal.input({
      title: t('data-object.create-data-object', { className: classDefinition.name }),
      label: t('form.label.new-item'),
      rule: {
        required: true,
        message: t('form.validation.required')
      },
      onOk: async (value: string) => {
        await createDataObjectMutation(classDefinition.id, value, parentId)
        onFinish?.(value)
      }
    })
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
      openDataObject({ config: { id } })
      dispatch(refreshNodeChildren({ nodeId: String(parentId), elementType: 'data-object' }))
    } catch (error) {
      trackError(new GeneralError('Error creating data object'))
    }
  }

  const addObjectTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('data-object.tree.context-menu.add-object'),
      key: 'add-object',
      icon: <Icon value={ 'folder' } />,
      children: getClassEntries(node)
    }
  }

  return {
    addObjectTreeContextMenuItem
  }
}
