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
  type ClassDefinition,
  type ClassDefinitionListItem
} from '@Pimcore/modules/class-definition/class-definition-slice.gen'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'
import { useTreePermission } from '@Pimcore/components/element-tree/provider/tree-permission-provider/use-tree-permission'
import { TreePermission } from '@Pimcore/modules/perspectives/enums/tree-permission'
import { isEmpty, isNil } from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDataObjectAddMutation } from '../../data-object-api-slice.gen'
import { useDataObjectHelper } from '../../hooks/use-data-object-helper'
import { useClassDefinitions } from '../../utils/provider/class-defintions/use-class-definitions'
import { ContextMenuActionName } from '@Pimcore/modules/element/actions'

interface ClassDefinitionListItemPartial extends Pick<ClassDefinition, 'id' | 'name'> {}

interface UseAddVariantHookReturn {
  addVariantTreeContextMenuItem: (node: TreeNodeProps) => ItemType
  createDataObjectVariant: (
    classDefinition: ClassDefinitionListItemPartial,
    parentId: number,
    onFinish?: (newName: string) => void
  ) => void
}

export const useAddVariant = (): UseAddVariantHookReturn => {
  const { t } = useTranslation()
  const modal = useFormModal()
  const [addDataObjectMutation] = useDataObjectAddMutation()
  const dispatch = useAppDispatch()
  const { openDataObject } = useDataObjectHelper()
  const { isTreeActionAllowed } = useTreePermission()
  const { getClassDefinitionsForCurrentUser } = useClassDefinitions()

  const findClassDefinitionByName = (name?: string): ClassDefinitionListItem | undefined => {
    if (isNil(name)) {
      return undefined
    }

    return getClassDefinitionsForCurrentUser().find((classDefinition) => classDefinition.name === name)
  }

  const createDataObjectVariantFromListItem = (
    classDefinition: ClassDefinitionListItem,
    parentId: number,
    onFinish?: (newName: string) => void
  ): void => {
    modal.input({
      title: t('data-object.create-variant', { className: classDefinition.name }),
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

  const createDataObjectVariant = (
    classDefinition: ClassDefinitionListItemPartial,
    parentId: number,
    onFinish?: (newName: string) => void
  ): void => {
    modal.input({
      title: t('data-object.create-variant', { className: classDefinition.name }),
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
        type: 'variant'
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
    return !isTreeActionAllowed(TreePermission.AddVariant) ||
      !checkElementPermission(node.permissions, 'create') ||
      isEmpty(getClassDefinitionsForCurrentUser())
  }

  const addVariantTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('data-object.tree.context-menu.add-variant'),
      key: ContextMenuActionName.addVariant,
      icon: <Icon value={ 'data-object-variant' } />,
      hidden: isAddObjectHidden(node),
      onClick: () => {
        createDataObjectVariantFromListItem(
          findClassDefinitionByName(node.metaData.dataObject.className as string)!,
          parseInt(node.id)
        )
      }
    }
  }

  return {
    addVariantTreeContextMenuItem,
    createDataObjectVariant
  }
}
