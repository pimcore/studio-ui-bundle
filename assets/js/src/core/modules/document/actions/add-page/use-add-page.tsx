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
import { Form } from '@Pimcore/components/form/form'
import { Input } from '@Pimcore/components/input/input'
import { type InputRef } from 'antd'
import { useDocumentHelper } from '../../hooks/use-document-helper'

interface UseAddPageHookReturn {
  addPageTreeContextMenuItem: (node: TreeNodeProps) => ItemType
}

export const useAddPage = (): UseAddPageHookReturn => {
  const { t } = useTranslation()
  const { data: documentTypes, isLoading, error } = useDocumentDocTypeListQuery({})
  const { openDocument } = useDocumentHelper()
  const [addDocumentMutation] = useDocumentAddMutation()
  const dispatch = useAppDispatch()
  const { isTreeActionAllowed } = useTreePermission()
  const { modal } = App.useApp()
  const [form] = Form.useForm()
  const firstInputRef = React.useRef<InputRef>(null)

  const getDocumentEntries = (node: TreeNodeProps): ItemType[] => {
    let documentHierarchy: ItemType[] = []

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

  const getDocumentEntry = (docType: DocType, node: TreeNodeProps): ItemType => {
    return {
      label: t(docType.name),
      key: docType.id,
      icon: <Icon
        subIconName='new'
        subIconVariant={ 'green' }
        value={ 'document' }
            />,
      onClick: () => {
        const parentId = parseInt(node.id)
        createDocument(docType, parentId)
      }
    }
  }

  const createDocument = (docType: DocType, parentId: number): void => {
    const submitForm = async (): Promise<void> => {
      await form.validateFields()
        .then(async () => {
          const values = form.getFieldsValue()
          const { title, navigationName, key } = values
          await createDocumentMutation(docType.id, key, title, navigationName, parentId)
        })
    }

    modal.confirm({
      icon: null,
      title: t('document.add-page', { docTypeName: docType.name }),
      content: (
        <Form
          form={ form }
          initialValues={ { title: '', navigationName: '', key: '' } }
          layout="vertical"
        >
          <Form.Item
            label={ t('title') }
            name="title"
          >
            <Input
              onChange={ e => {
                const value = e.target.value
                form.setFieldsValue({
                  title: value,
                  navigationName: value,
                  key: value
                })
              } }
              placeholder={ t('title') }
              ref={ firstInputRef }
            />
          </Form.Item>
          <Form.Item
            label={ t('navigation') }
            name="navigationName"
          >
            <Input placeholder={ t('navigation') } />
          </Form.Item>
          <Form.Item
            label={ t('key') }
            name="key"
            rules={ [{ required: true, message: t('form.validation.required') }] }
          >
            <Input placeholder={ t('key') } />
          </Form.Item>
        </Form>
      ),
      modalRender: (node) => {
        form.resetFields()

        if (firstInputRef.current !== null) {
          firstInputRef.current.focus()
        }
        return node
      },
      onOk: async () => {
        await submitForm()
      }
    })
  }

  const createDocumentMutation = async (
    docTypeId: string,
    key: string,
    title: string,
    navigationName: string,
    parentId: number
  ): Promise<void> => {
    const createDocumentTask = addDocumentMutation({
      parentId,
      documentAddParameters: {
        key,
        type: 'page',
        title,
        navigationName,
        docTypeId,
        language: null,
        translationsSourceId: null,
        inheritanceSourceId: null
      }
    })

    try {
      const response = await createDocumentTask

      if (response.error !== undefined) {
        trackError(new ApiError(response.error))
        return
      }

      const { id } = response.data
      void openDocument({ config: { id } })
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
