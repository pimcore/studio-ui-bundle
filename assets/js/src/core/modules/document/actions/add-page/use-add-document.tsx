/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/* eslint-disable max-lines */
import { useAppDispatch } from '@sdk/app'
import { type ItemType } from '@Pimcore/components/dropdown/dropdown'
import { refreshNodeChildren } from '@Pimcore/components/element-tree/element-tree-slice'
import { type TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'
import { Icon } from '@Pimcore/components/icon/icon'
import trackError, { ApiError, GeneralError } from '@Pimcore/modules/app/error-handler'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'
import { useTreePermission } from '@Pimcore/components/element-tree/provider/tree-permission-provider/use-tree-permission'
import { type TreePermission } from '@Pimcore/modules/perspectives/enums/tree-permission'
import { isEmpty, isNil, isNull, isUndefined } from 'lodash'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { type ContextMenuActionName } from '@Pimcore/modules/element/actions'
import { type DocType, useDocumentDocTypeListQuery, useDocumentAddMutation } from '../../document-api-slice.gen'
import { App } from 'antd'
import { Form, type formInstanceType } from '@Pimcore/components/form/form'
import { Input } from '@Pimcore/components/input/input'
import { type InputRef } from 'antd'
import { useDocumentHelper } from '../../hooks/use-document-helper'
import { Spin } from '@Pimcore/components/spin/spin'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { uuid } from '@sdk/utils'

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
  hasNoChildren?: boolean // If true, item has onClick instead of children dropdown
  perspectiveTreePermission?: TreePermission | string
}

interface UseAddDocumentHookReturn {
  addDocumentTreeContextMenuItem: (node: TreeNodeProps) => ItemType
}

export const useAddDocument = (config: AddDocumentConfig): UseAddDocumentHookReturn => {
  const { type, iconValue, contextMenuKey, formType, modalTitle, hasNoChildren } = config
  const { t } = useTranslation()
  const { data: documentTypes, isLoading, error } = useDocumentDocTypeListQuery({ })
  const { openDocument } = useDocumentHelper()
  const [addDocumentMutation] = useDocumentAddMutation()
  const dispatch = useAppDispatch()
  const { isTreeActionAllowed } = useTreePermission()
  const { modal } = App.useApp()
  const formModal = useFormModal()
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
    } else if (!isUndefined(error) || isNil(documentTypes)) {
      return documentHierarchy // Return empty on error or missing data
    }

    if (!isEmpty(documentTypes.items)) {
      const structuredDocumentTypes = [...(documentTypes.items)]
        .filter(docType => docType.type === type) // Filter for a certain docType
        .sort((a, b) => a.name.localeCompare(b.name))
        .reduce<Record<string, DocType[]>>((acc, docType) => {
          const groupName = isNil(docType.group) || isEmpty(docType.group) ? 'undefined' : docType.group

          // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
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
    }

    // add blank entry
    documentHierarchy.push({
      label: `> ${t('blank')}`,
      key: 'blank' + type,
      icon: <Icon
        subIconName='new'
        subIconVariant='green'
        value={ iconValue }
            />,
      onClick: () => {
        const parentId = Number.parseInt(node.id)
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
        const parentId = Number.parseInt(node.id)
        createDocument(docType, parentId)
      }
    }
  }

  // Full form component (3 inputs: title, navigationName, key)
  const FullFormContent: React.FC<{ form: formInstanceType<any>, firstInputRef: React.RefObject<InputRef>, buttonId: string }> = ({ form, firstInputRef, buttonId }) => {
    const handleEnterPress = (): void => {
      // Click the OK button using the unique ID
      const okButton = document.getElementById(buttonId) as HTMLButtonElement
      if (!isNull(okButton) && !okButton.disabled) {
        okButton.click()
      }
    }

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
            onPressEnter={ handleEnterPress }
            ref={ firstInputRef }
          />
        </Form.Item>
        <Form.Item
          label={ t('add-document-form.label.navigation') }
          name="navigationName"
        >
          <Input onPressEnter={ handleEnterPress } />
        </Form.Item>
        <Form.Item
          label={ t('add-document-form.label.key') }
          name="key"
          rules={ [{ required: true, message: t('form.validation.required') }] }
        >
          <Input onPressEnter={ handleEnterPress } />
        </Form.Item>
      </Form>
    )
  }

  const createDocument = (docType: DocType | null, parentId: number): void => {
    if (formType === AddDocumentFormType.KEY_ONLY) {
      // Use formModal.input for key-only forms (like in use-add-object)
      formModal.input({
        title: modalTitle,
        label: t('form.label.new-item'),
        rule: {
          required: true,
          message: t('form.validation.required')
        },
        onOk: async (key: string) => {
          await createDocumentMutation(
            isNil(docType) ? null : docType.id,
            key,
            key, // Use key as title for key-only forms
            key, // Use key as navigationName for key-only forms
            parentId
          )
        }
      })
    } else {
      // Use existing modal.confirm for full forms
      form.resetFields() // Always reset before opening

      const submitForm = async (): Promise<void> => {
        await form.validateFields()
          .then(async () => {
            const values = form.getFieldsValue()
            const title = values.title
            const navigationName = values.navigationName
            const key = values.key

            await createDocumentMutation(isNil(docType) ? null : docType.id, key as string, title as string, navigationName as string, parentId)
          })
      }

      const buttonId = uuid()

       
      modal.confirm({
        icon: null,
        title: modalTitle,
        content: <FullFormContent
          buttonId={ buttonId }
          firstInputRef={ firstInputRef }
          form={ form }
                 />,
        modalRender: (node) => {
          if (firstInputRef.current !== null) {
            firstInputRef.current.focus()
          }
          return node
        },
        okButtonProps: {
          id: buttonId
        },
        onOk: async () => {
          await submitForm()
        }
      })
    }
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
        inheritanceSourceId: null,
        template: null
      }
    })

    try {
      const response = await createDocumentTask

      if (!isUndefined(response.error)) {
        trackError(new ApiError(response.error))
      } else if (!isUndefined(response.data)) {
        const { id } = response.data
        void openDocument({ config: { id } })
        dispatch(refreshNodeChildren({ nodeId: String(parentId), elementType: 'document' }))
      }
    } catch {
      trackError(new GeneralError('Error creating document'))
    }
  }

  const isAddDocumentHidden = (node: TreeNodeProps): boolean => {
    return !isTreeActionAllowed(config.perspectiveTreePermission) ||
      !checkElementPermission(node.permissions, 'create') ||
      isEmpty(getDocumentEntries(node))
  }

  const addDocumentTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    const baseItem = {
      label: t(`document.tree.context-menu.add-${type}`),
      key: contextMenuKey,
      icon: <Icon value={ iconValue } />,
      hidden: isAddDocumentHidden(node)
    }

    // If hasNoChildren is true, add onClick instead of children
    if (hasNoChildren === true) {
      return {
        ...baseItem,
        onClick: () => {
          createDocument(null, Number.parseInt(node.id))
        }
      }
    }

    // Default behavior: add children dropdown
    return {
      ...baseItem,
      children: getDocumentEntries(node)
    }
  }

  return {
    addDocumentTreeContextMenuItem
  }
}
