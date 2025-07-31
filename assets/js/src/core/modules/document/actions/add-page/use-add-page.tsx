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
import trackError, { ApiError, GeneralError } from '@Pimcore/modules/app/error-handler'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'
import { useTreePermission } from '@Pimcore/modules/element/tree/provider/tree-permission-provider/use-tree-permission'
import { TreePermission } from '@Pimcore/modules/perspectives/enums/tree-permission'
import { isEmpty, isNil } from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ContextMenuActionName } from '@Pimcore/modules/element/actions'
import { type DocType, useDocumentDocTypeListQuery, useDocumentAddMutation } from '../../document-api-slice.gen'
import { App } from 'antd'
import { Flex } from '@Pimcore/components/flex/flex'
import { Spin } from '@Pimcore/components/spin/spin'
import { Box } from '@Pimcore/components/box/box'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'

interface UseAddPageHookReturn {
  addPageTreeContextMenuItem: (node: TreeNodeProps) => ItemType
}

export const useAddPage = (): UseAddPageHookReturn => {
  const { t } = useTranslation()
  const { modal } = App.useApp()
  // const [addDataObjectMutation] = useDataObjectAddMutation()
  const [addDocumentMutation] = useDocumentAddMutation()
  const dispatch = useAppDispatch()
  // const { openDataObject } = useDataObjectHelper()
  const { isTreeActionAllowed } = useTreePermission()
  // const { getClassDefinitionsForCurrentUser } = useClassDefinitions()

  const getDocumentEntries = (node: TreeNodeProps): ItemType[] => {
    let documentHierarchy: ItemType[] = []
    const { data: documentTypes, isLoading, error } = useDocumentDocTypeListQuery({})

    if (isLoading || error || !documentTypes?.items) {
      return documentHierarchy // Return empty if loading or error occurs
    }

    const structuredDocumentTypes = [...documentTypes.items]
      .sort((a, b) => a.name.localeCompare(b.name))
      .reduce<Record<string, DocType[]>>((acc, docType) => {
      const groupName = isNil(docType.group) || isEmpty(docType.group) ? 'undefined' : docType.group

      if (acc[groupName] === undefined) {
        acc[groupName] = []
      }

      acc[groupName].push(docType)

      return acc
    }, {})

    if (structuredDocumentTypes.undefined !== undefined) {
      documentHierarchy = structuredDocumentTypes.undefined.map(docType => getDocumentEntry(docType, node))
    }

    for (const [group, docTypes] of Object.entries(structuredDocumentTypes)) {
      if (group !== 'undefined') {
        documentHierarchy.push({
          label: t(group),
          key: 'add-page-group-' + group,
          icon: <Icon value={ 'folder' } />,
          children: docTypes.map(docType => getDocumentEntry(docType, node))
        })
      }
    }

    return documentHierarchy
  }

  // const getDataObjectEntry = (classDefinition: ClassDefinitionListItem, node: TreeNodeProps): ItemType => {
  //   return {
  //     label: t(classDefinition.name),
  //     key: classDefinition.id,
  //     icon: classDefinition.icon.value === 'class'
  //       ? (
  //         <Icon
  //           subIconName='new'
  //           subIconVariant={ 'green' }
  //           value='data-object'
  //         />
  //         )
  //       : (
  //         <Icon
  //           subIconName='new'
  //           subIconVariant={ 'green' }
  //           { ...classDefinition.icon }
  //         />
  //         ),
  //     onClick: () => {
  //       const parentId = parseInt(node.id)
  //       createDataObject(classDefinition, parentId)
  //     }
  //   }
  // }
  const getDocumentEntry = (docType: DocType, node: TreeNodeProps): ItemType => {
    return {
      label: t(docType.name),
      key: docType.id,
      icon: <Icon value={ 'document' } />,
      onClick: () => {
        const parentId = parseInt(node.id)
        createDocument(docType, parentId)
      }
    }
  }

  // const createDataObject = (
  //   classDefinition: ClassDefinitionListItem,
  //   parentId: number,
  //   onFinish?: (newName: string) => void
  // ): void => {
  //   modal.input({
  //     title: t('document.create-page', { className: classDefinition.name }),
  //     label: t('form.label.new-item'),
  //     rule: {
  //       required: true,
  //       message: t('form.validation.required')
  //     },
  //     onOk: async (value: string) => {
  //       await createDataObjectMutation(classDefinition.id, value, parentId)
  //       onFinish?.(value)
  //     }
  //   })
  // }

  const createDocument = (docType: DocType, parentId: number): void => {
    const switchModal = modal.confirm({
      title: <Flex
        align="center"
        gap="small"
             >
        {t('document.add-page')}
      </Flex>,
      content: <div>
        <Box margin={ { bottom: 'small' } }>
          {t('perspective.switching.description')}:
        </Box>
      </div>
    })

    // modal.input({
    //   title: t('document.add-page', { docTypeName: docType.name }),
    //   label: t('form.label.new-item'),
    //   rule: {
    //     required: true,
    //     message: t('form.validation.required'),
    //   },
    //   onOk: async (value: string) => {
    //     await createDocumentMutation(docType.id, value, parentId);
    //   },
    // });
  }

  // const createDataObjectMutation = async (
  //   classId: string,
  //   name: string,
  //   parentId: number
  // ): Promise<void> => {
  //   const createDataObjectTask = addDataObjectMutation({
  //     parentId,
  //     dataObjectAddParameters: {
  //       key: name,
  //       classId,
  //       type: 'object'
  //     }
  //   })
  //
  //   try {
  //     const response = await createDataObjectTask
  //
  //     if (response.error !== undefined) {
  //       trackError(new ApiError(response.error))
  //       return
  //     }
  //
  //     const { id } = response.data
  //     void openDataObject({ config: { id } })
  //     dispatch(refreshNodeChildren({ nodeId: String(parentId), elementType: 'data-object' }))
  //   } catch (error) {
  //     trackError(new GeneralError('Error creating data object'))
  //   }
  // }

  const createDocumentMutation = async (docTypeId: string, name: string, parentId: number): Promise<void> => {
    const createDocumentTask = addDocumentMutation({
      parentId,
      documentAddParameters: {
        key: name,
        type: 'page',
        docTypeId
      }
    })

    try {
      const response = await createDocumentTask

      if (response.error !== undefined) {
        trackError(new ApiError(response.error))
        return
      }

      const { id } = response.data
      dispatch(refreshNodeChildren({ nodeId: String(parentId), elementType: 'document' }))
    } catch (error) {
      trackError(new GeneralError('Error creating document'))
    }
  }

  const isAddPageHidden = (node: TreeNodeProps): boolean => {
    return !isTreeActionAllowed(TreePermission.Add) ||
      !checkElementPermission(node.permissions, 'create') ||
      isEmpty(getDocumentEntries(node))
  }

  const addPageTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('document.action.add-page'),
      key: ContextMenuActionName.addPage,
      icon: <Icon value={ 'folder' } />,
      hidden: isAddPageHidden(node),
      children: getDocumentEntries(node)
    }
  }

  return {
    addPageTreeContextMenuItem
  }
}
