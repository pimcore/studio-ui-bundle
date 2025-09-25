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
import { isEmpty, isNil, isUndefined } from 'lodash'
import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { type ContextMenuActionName } from '@Pimcore/modules/element/actions'
import { type DocType, useDocumentDocTypeListQuery, useDocumentAddMutation } from '../../document-api-slice.gen'
import { App } from 'antd'
import { Form } from '@Pimcore/components/form/form'
import { Input } from '@Pimcore/components/input/input'
import { type InputRef, type FormInstance } from 'antd'
import { useDocumentHelper } from '../../hooks/use-document-helper'
import { Spin } from '@Pimcore/components/spin/spin'

export enum AddDocumentFormType {
  FULL = 'full', // title, navigationName, key
  KEY_ONLY = 'key-only' // only key
}

export interface AddDocumentConfig {
  type: string
  iconValue: string
  contextMenuKey: ContextMenuActionName | string
  formType: AddDocumentFormType
  modalTitle: string
}

interface UseAddDocumentHookReturn {
  addDocumentTreeContextMenuItem: (node: TreeNodeProps) => ItemType
}

export const useAddDocument = (config: AddDocumentConfig): UseAddDocumentHookReturn => {
  const { type, iconValue, contextMenuKey, formType, modalTitle } = config
  const { t } = useTranslation()
  const { data: documentTypes, isLoading, error } = useDocumentDocTypeListQuery({ })
  const { openDocument } = useDocumentHelper()
  const [addDocumentMutation] = useDocumentAddMutation()
  const dispatch = useAppDispatch()
  const { isTreeActionAllowed } = useTreePermission()
  const { modal } = App.useApp()
  const [form] = Form.useForm()
  const firstInputRef = useRef<InputRef>(null)

  const getDocumentEntries = (node: TreeNodeProps): ItemType[] => {
    let documentHierarchy: ItemType[] = []

    if (isLoading) {
      return [{
        key: 'add-document-loading',
        type: 'custom',
        component: (<Spin type="classic" />)
      }]
    } else if (!isUndefined(error) || isNil(documentTypes) || isEmpty(documentTypes.items)) {
      return documentHierarchy // Return empty if empty or error occurs
    }

    const structuredDocumentTypes = [...(documentTypes.items)]
      .filter(docType => docType.type === type) // Filter for a certain docType
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
          key: 'add-document-group-' + type + group,
          icon: <Icon value={ 'folder' } />,
          children: docTypes.map(docType => getDocumentEntry(docType, node))
        })
      }
    }

    // add blank entry
    documentHierarchy.push({
      label: '> Blank',
      key: 'blank' + type,
      icon: <Icon
        subIconName='new'
        subIconVariant='green'
        value={ iconValue }
            />,
      onClick: () => {
        const parentId = parseInt(node.id)
        createDocument(null, parentId)
      }
    })

    return documentHierarchy
  }

  const getDocumentEntry = (docType: DocType, node: TreeNodeProps): ItemType => {
    return {
      label: t(docType.name),
      key: docType.id,
      icon: <Icon
        subIconName='new'
        subIconVariant={ 'green' }
        value={ iconValue }
            />,
      onClick: () => {
        const parentId = parseInt(node.id)
        createDocument(docType, parentId)
      }
    }
  }

  // Full form component (3 inputs: title, navigationName, key)
  const FullFormContent: React.FC<{ form: FormInstance<any>, firstInputRef: React.RefObject<InputRef>, t: any }> = ({ form, firstInputRef, t }) => {
    useEffect(() => {
      if (firstInputRef.current !== null) {
        firstInputRef.current.focus()
      }
    }, [firstInputRef])

    return (
      <Form
        form={ form }
        initialValues={ { title: '', navigationName: '', key: '' } }
        layout="vertical"
      >
        <Form.Item
          label={ t('add-document-form.label.title') }
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
            ref={ firstInputRef }
          />
        </Form.Item>
        <Form.Item
          label={ t('add-document-form.label.navigation) }
          name="navigationName"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={ t('add-document-form.label.key') }
          name="key"
          rules={ [{ required: true, message: t('form.validation.required') }] }
        >
          <Input />
        </Form.Item>
      </Form>
    )
  }

  // Key-only form component (1 input: key)
  const KeyOnlyFormContent: React.FC<{ form: FormInstance<any>, firstInputRef: React.RefObject<InputRef>, t: any }> = ({ form, firstInputRef, t }) => {
    useEffect(() => {
      if (firstInputRef.current !== null) {
        firstInputRef.current.focus()
      }
    }, [firstInputRef])

    return (
      <Form
        form={ form }
        initialValues={ { key: '' } }
        layout="vertical"
      >
        <Form.Item
          label={ t('form.label.new-item') }
          name="key"
          rules={ [{ required: true, message: t('form.validation.required') }] }
        >
          <Input
            ref={ firstInputRef }
          />
        </Form.Item>
      </Form>
    )
  }

  // Modal form content component for document creation
  const ModalFormContent: React.FC<{ form: FormInstance<any>, firstInputRef: React.RefObject<InputRef>, t: any }> = ({ form, firstInputRef, t }) => {
    return formType === AddDocumentFormType.FULL
      ? (
        <FullFormContent
          firstInputRef={ firstInputRef }
          form={ form }
          t={ t }
        />
        )
      : (
        <KeyOnlyFormContent
          firstInputRef={ firstInputRef }
          form={ form }
          t={ t }
        />
        )
  }

  const createDocument = (docType: DocType | null, parentId: number): void => {
    // Reset form with appropriate initial values based on form type
    // const initialValues = formType === AddDocumentFormType.FULL
    //   ? { title: '', navigationName: '', key: '' }
    //   : { key: '' }

    form.resetFields()
    // form.setFieldsValue(initialValues)
    const submitForm = async (): Promise<void> => {
      await form.validateFields()
        .then(async () => {
          const values = form.getFieldsValue()

          // For key-only forms, use the key as title and navigationName
          const title = formType === AddDocumentFormType.FULL ? values.title : values.key
          const navigationName = formType === AddDocumentFormType.FULL ? values.navigationName : values.key
          const key = values.key

          await createDocumentMutation(!isNil(docType) ? docType.id : null, key as string, title as string, navigationName as string, parentId)
        })
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    modal.confirm({
      icon: null,
      title: modalTitle,
      content: <ModalFormContent
        firstInputRef={ firstInputRef }
        form={ form }
        t={ t }
               />,
      onOk: async () => {
        await submitForm()
      }
    })
  }

  const createDocumentMutation = async (
    docTypeId: string | null,
    key: string,
    title: string,
    navigationName: string,
    parentId: number
  ): Promise<void> => {
    const createDocumentTask = addDocumentMutation({
      parentId,
      documentAddParameters: {
        key,
        type,
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

  const isAddDocumentHidden = (node: TreeNodeProps): boolean => {
    return !isTreeActionAllowed(TreePermission.Add) ||
      !checkElementPermission(node.permissions, 'create') ||
      isEmpty(getDocumentEntries(node))
  }

  const addDocumentTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t(`document.action.add-${type}`),
      key: contextMenuKey,
      icon: <Icon value={ iconValue } />,
      hidden: isAddDocumentHidden(node),
      children: getDocumentEntries(node)
    }
  }

  return {
    addDocumentTreeContextMenuItem
  }
}
