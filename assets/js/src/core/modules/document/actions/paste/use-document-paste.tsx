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
import type { TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'
import type { ItemType } from '@Pimcore/components/dropdown/dropdown'
import type { Element } from '@Pimcore/modules/element/element-helper'
import { useCopyPaste } from '@Pimcore/modules/element/actions/copy-paste/use-copy-paste'
import { Icon } from '@Pimcore/components/icon/icon'
import { setNodeFetching, refreshNodeChildren } from '@Pimcore/components/element-tree/element-tree-slice'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '@sdk/app'
import { store } from '@Pimcore/app/store'
import { useTreeId } from '@Pimcore/modules/element/tree/provider/tree-id-provider/use-tree-id'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { ContextMenuActionName } from '@Pimcore/modules/element/actions'
import { useTreeCopyPasteContext, type StoreNode } from '@Pimcore/modules/element/actions/copy-paste/tree-copy-paste-context'
import { usePasteVisibility } from '@Pimcore/modules/element/actions/copy-paste/use-paste-visibility'
import { Modal, Select, Form } from 'antd'
import { type DocumentCloneParameters, api, type DocumentCloneApiArg } from '@Pimcore/modules/document/document-api-slice.gen'
import { isNil } from 'lodash'
import { useSettings } from '@Pimcore/modules/app/settings/hooks/use-settings'
import { useGlobalMessageBus } from '@Pimcore/modules/background-processor'
import { StepBasedProgressJobHandler } from '@Pimcore/modules/execution-engine/message-handlers/step-based-progress-job-handler'
import { type DocumentCloneJobConfig } from '@Pimcore/modules/execution-engine/jobs/document-clone-background/types'
import { topics } from '@Pimcore/modules/execution-engine/topics'
import { elementTypes } from '@Pimcore/types/enums/element/element-type'

export interface UseDocumentPasteHookReturn {
  pasteTreeContextMenuItem: (node: TreeNodeProps) => ItemType
  pasteInheritanceTreeContextMenuItem: (node: TreeNodeProps) => ItemType
  pasteAsChildRecursiveTreeContextMenuItem: (node: TreeNodeProps) => ItemType
  pasteRecursiveUpdatingReferencesTreeContextMenuItem: (node: TreeNodeProps) => ItemType
  pasteAsChildTreeContextMenuItem: (node: TreeNodeProps) => ItemType
  pasteAsNewLanguageVariantTreeContextMenuItem: (node: TreeNodeProps) => ItemType
  pasteAsNewLanguageVariantRecursiveTreeContextMenuItem: (node: TreeNodeProps) => ItemType
  pasteLanguageRecursiveUpdatingReferencesTreeContextMenuItem: (node: TreeNodeProps) => ItemType
  pasteOnlyContentsTreeContextMenuItem: (node: TreeNodeProps) => ItemType
  pasteAsChildRecursiveInheritanceTreeContextMenuItem: (node: TreeNodeProps) => ItemType
  pasteRecursiveUpdatingReferencesInheritanceTreeContextMenuItem: (node: TreeNodeProps) => ItemType
  pasteAsChildInheritanceTreeContextMenuItem: (node: TreeNodeProps) => ItemType
  pasteAsNewLanguageVariantInheritanceTreeContextMenuItem: (node: TreeNodeProps) => ItemType
  pasteAsNewLanguageVariantRecursiveInheritanceTreeContextMenuItem: (node: TreeNodeProps) => ItemType
  pasteLanguageRecursiveUpdatingReferencesInheritanceTreeContextMenuItem: (node: TreeNodeProps) => ItemType
  isPasteMenuHidden: (node: Element | TreeNodeProps) => boolean
  isPasteInheritanceMenuHidden: (node: Element | TreeNodeProps) => boolean
  LanguageModal: React.ComponentType<Record<string, unknown>>
}

export const useDocumentPaste = (): UseDocumentPasteHookReturn => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { paste } = useCopyPaste('document')
  const { treeId } = useTreeId(true)
  const { getStoredNode } = useTreeCopyPasteContext('document')
  const { isPasteHidden } = usePasteVisibility('document')
  const settings = useSettings()
  const messageRegistry = useGlobalMessageBus()

  const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false)
  const [languageForm] = Form.useForm()
  const [currentLanguageAction, setCurrentLanguageAction] = useState<{
    node: TreeNodeProps
    type: 'child' | 'recursive' | 'recursive-update-references'
    enableInheritance?: boolean
  } | null>(null)

  // Get available languages from settings
  const availableLanguages = (settings.validLanguages ?? []).map((locale: string) => ({
    value: locale,
    label: `${locale.toUpperCase()} [${locale}]`
  }))

  const cloneDocument = async (
    sourceNode: StoreNode,
    targetNode: TreeNodeProps,
    parameters: DocumentCloneParameters
  ): Promise<void> => {
    if (isNil(sourceNode)) {
      return
    }

    const sourceId = typeof sourceNode.id === 'string' ? parseInt(sourceNode.id) : sourceNode.id
    const targetId = typeof targetNode.id === 'string' ? parseInt(targetNode.id) : targetNode.id

    dispatch(setNodeFetching({ treeId, nodeId: String(targetId), isFetching: true }))

    try {
      const cloneParams: DocumentCloneApiArg = {
        id: sourceId,
        parentId: targetId,
        documentCloneParameters: parameters ?? {}
      }
      
      const result = await dispatch(
        api.endpoints.documentClone.initiate(cloneParams)
      ).unwrap()

      const jobRunId = result?.jobRunId

      // If no jobRunId, operation completed immediately
      if (isNil(jobRunId)) {
        // Refresh the tree
        dispatch(refreshNodeChildren({
          nodeId: targetId.toString(),
          elementType: elementTypes.document
        }))
        return
      }

      // Register job handler for background processing
      const config: DocumentCloneJobConfig = {
        title: t('document.tree.copy-paste.cloning-folder'),
        progress: 0,
        parentFolderId: targetId,
        parentFolderType: elementTypes.document
      }

      const handler = new StepBasedProgressJobHandler({ 
        jobRunId, 
        config,
        jobType: 'document-clone-background',
        additionalTopics: [topics['cloning-finished']],
        onJobCompletion: async (data: any) => {
          store.dispatch(refreshNodeChildren({
            elementType: elementTypes.document,
            nodeId: targetId.toString()
          }))
        }
      })
      messageRegistry.registerHandler(handler)
    } catch (error: any) {
      trackError(new GeneralError(error.message as string))
    } finally {
      dispatch(setNodeFetching({ treeId, nodeId: String(targetId), isFetching: false }))
    }
  }

  const replaceDocumentContent = async (
    sourceNode: StoreNode,
    targetNode: TreeNodeProps
  ): Promise<void> => {
    if (isNil(sourceNode)) {
      return
    }

    const sourceId = typeof sourceNode.id === 'string' ? parseInt(sourceNode.id) : sourceNode.id
    const targetId = typeof targetNode.id === 'string' ? parseInt(targetNode.id) : targetNode.id

    dispatch(setNodeFetching({ treeId, nodeId: String(targetId), isFetching: true }))

    try {
      // Replace content operations don't trigger background jobs - execute directly
      await dispatch(
        api.endpoints.documentReplaceContent.initiate({
          sourceId,
          targetId
        })
      ).unwrap()
    } catch (error: any) {
      trackError(new GeneralError(error.message as string))
    } finally {
      dispatch(setNodeFetching({ treeId, nodeId: String(targetId), isFetching: false }))
    }
  }

  const showLanguageModal = (node: TreeNodeProps, type: 'child' | 'recursive' | 'recursive-update-references'): void => {
    setCurrentLanguageAction({ node, type, enableInheritance: false })
    setIsLanguageModalVisible(true)
  }

  const showLanguageModalWithInheritance = (node: TreeNodeProps, type: 'child' | 'recursive' | 'recursive-update-references'): void => {
    setCurrentLanguageAction({ node, type, enableInheritance: true })
    setIsLanguageModalVisible(true)
  }

  const handleLanguageModalOk = async (): Promise<void> => {
    if (isNil(currentLanguageAction)) {
      return
    }

    try {
      const values = await languageForm.validateFields()
      const { language } = values
      const { node, type, enableInheritance = false } = currentLanguageAction

      let parameters: DocumentCloneParameters
      switch (type) {
        case 'child':
          parameters = {
            language,
            enableInheritance,
            recursive: false,
            updateReferences: false
          }
          break
        case 'recursive':
          parameters = {
            language,
            enableInheritance,
            recursive: true,
            updateReferences: false
          }
          break
        case 'recursive-update-references':
          parameters = {
            language,
            enableInheritance,
            recursive: true,
            updateReferences: true
          }
          break
        default:
          return
      }

      await cloneDocument(getStoredNode(), node, parameters)

      setIsLanguageModalVisible(false)
      languageForm.resetFields()
      setCurrentLanguageAction(null)
    } catch (error) {
      // Form validation failed
    }
  }

  const handleLanguageModalCancel = (): void => {
    setIsLanguageModalVisible(false)
    languageForm.resetFields()
    setCurrentLanguageAction(null)
  }

  const isPasteOptionHidden = (node: Element | TreeNodeProps): boolean => {
    return isPasteHidden(node, 'copy')
  }

  const isPasteOnlyContentsHidden = (node: Element | TreeNodeProps): boolean => {
    const storedNode = getStoredNode()
    return isPasteOptionHidden(node) ||
      node.type === 'folder' ||
      node.isLocked ||
      storedNode?.type !== node.type
  }

  const isPasteMenuHidden = (node: Element | TreeNodeProps): boolean => {
    return isPasteOptionHidden(node)
  }

  const isPasteInheritanceMenuHidden = (node: Element | TreeNodeProps): boolean => {
    return isPasteOptionHidden(node)
  }

  // Standard paste options
  const pasteTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('element.tree.paste'),
      key: ContextMenuActionName.paste,
      icon: <Icon value={ 'paste' } />,
      hidden: isPasteOptionHidden(node),
      onClick: async () => {
        await paste(parseInt(node.id))
      }
    }
  }

  const pasteAsChildRecursiveTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('element.tree.paste-as-child-recursive'),
      key: ContextMenuActionName.pasteAsChildRecursive,
      icon: <Icon value={ 'paste' } />,
      hidden: isPasteOptionHidden(node),
      onClick: async () => {
        await cloneDocument(getStoredNode(), node, {
          language: null,
          enableInheritance: false,
          recursive: true,
          updateReferences: false
        })
      }
    }
  }

  const pasteRecursiveUpdatingReferencesTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('element.tree.paste-recursive-updating-references'),
      key: ContextMenuActionName.pasteRecursiveUpdatingReferences,
      icon: <Icon value={ 'paste' } />,
      hidden: isPasteOptionHidden(node),
      onClick: async () => {
        await cloneDocument(getStoredNode(), node, {
          language: null,
          enableInheritance: false,
          recursive: true,
          updateReferences: true
        })
      }
    }
  }

  const pasteAsChildTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('element.tree.paste-as-child'),
      key: ContextMenuActionName.pasteAsChild,
      icon: <Icon value={ 'paste' } />,
      hidden: isPasteOptionHidden(node),
      onClick: async () => {
        await cloneDocument(getStoredNode(), node, {
          language: null,
          enableInheritance: false,
          recursive: false,
          updateReferences: false
        })
      }
    }
  }

  const pasteOnlyContentsTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('element.tree.paste-only-contents'),
      key: ContextMenuActionName.pasteOnlyContents,
      icon: <Icon value={ 'paste' } />,
      hidden: isPasteOnlyContentsHidden(node),
      onClick: async () => {
        // Use the replace content operation to replace only the content
        await replaceDocumentContent(getStoredNode(), node)
      }
    }
  }

  // Inheritance paste options
  const pasteInheritanceTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('element.tree.paste'),
      key: `${ContextMenuActionName.paste}-inheritance`,
      icon: <Icon value={ 'paste' } />,
      hidden: isPasteOptionHidden(node),
      onClick: async () => {
        await cloneDocument(getStoredNode(), node, {
          language: null,
          enableInheritance: true,
          recursive: true,
          updateReferences: true
        })
      }
    }
  }

  const pasteAsChildRecursiveInheritanceTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('element.tree.paste-as-child-recursive'),
      key: `${ContextMenuActionName.pasteAsChildRecursive}-inheritance`,
      icon: <Icon value={ 'paste' } />,
      hidden: isPasteOptionHidden(node),
      onClick: async () => {
        await cloneDocument(getStoredNode(), node, {
          language: null,
          enableInheritance: true,
          recursive: true,
          updateReferences: false
        })
      }
    }
  }

  const pasteRecursiveUpdatingReferencesInheritanceTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('element.tree.paste-recursive-updating-references'),
      key: `${ContextMenuActionName.pasteRecursiveUpdatingReferences}-inheritance`,
      icon: <Icon value={ 'paste' } />,
      hidden: isPasteOptionHidden(node),
      onClick: async () => {
        await cloneDocument(getStoredNode(), node, {
          language: null,
          enableInheritance: true,
          recursive: true,
          updateReferences: true
        })
      }
    }
  }

  const pasteAsChildInheritanceTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('element.tree.paste-as-child'),
      key: `${ContextMenuActionName.pasteAsChild}-inheritance`,
      icon: <Icon value={ 'paste' } />,
      hidden: isPasteOptionHidden(node),
      onClick: async () => {
        await cloneDocument(getStoredNode(), node, {
          language: null,
          enableInheritance: true,
          recursive: false,
          updateReferences: false
        })
      }
    }
  }

  // Language variant inheritance paste options
  const pasteAsNewLanguageVariantInheritanceTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('document.paste-as-new-language-variant'),
      key: 'pasteAsNewLanguageVariant-inheritance',
      icon: <Icon value={ 'paste' } />,
      hidden: isPasteOptionHidden(node),
      onClick: () => {
        showLanguageModalWithInheritance(node, 'child')
      }
    }
  }

  const pasteAsNewLanguageVariantRecursiveInheritanceTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('document.paste-as-new-language-variant-recursive'),
      key: 'pasteAsNewLanguageVariantRecursive-inheritance',
      icon: <Icon value={ 'paste' } />,
      hidden: isPasteOptionHidden(node),
      onClick: () => {
        showLanguageModalWithInheritance(node, 'recursive')
      }
    }
  }

  const pasteLanguageRecursiveUpdatingReferencesInheritanceTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('document.paste-language-recursive-updating-references'),
      key: 'pasteLanguageRecursiveUpdatingReferences-inheritance',
      icon: <Icon value={ 'paste' } />,
      hidden: isPasteOptionHidden(node),
      onClick: () => {
        showLanguageModalWithInheritance(node, 'recursive-update-references')
      }
    }
  }

  // Language variant paste options
  const pasteAsNewLanguageVariantTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('document.paste-as-new-language-variant'),
      key: 'pasteAsNewLanguageVariant',
      icon: <Icon value={ 'paste' } />,
      hidden: isPasteOptionHidden(node),
      onClick: () => {
        showLanguageModal(node, 'child')
      }
    }
  }

  const pasteAsNewLanguageVariantRecursiveTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('document.paste-as-new-language-variant-recursive'),
      key: 'pasteAsNewLanguageVariantRecursive',
      icon: <Icon value={ 'paste' } />,
      hidden: isPasteOptionHidden(node),
      onClick: () => {
        showLanguageModal(node, 'recursive')
      }
    }
  }

  const pasteLanguageRecursiveUpdatingReferencesTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('document.paste-language-recursive-updating-references'),
      key: 'pasteLanguageRecursiveUpdatingReferences',
      icon: <Icon value={ 'paste' } />,
      hidden: isPasteOptionHidden(node),
      onClick: () => {
        showLanguageModal(node, 'recursive-update-references')
      }
    }
  }

  const LanguageModal: React.ComponentType<Record<string, unknown>> = () => (
    <Modal
      cancelText={ t('cancel') }
      okText={ t('apply') }
      onCancel={ handleLanguageModalCancel }
      onOk={ handleLanguageModalOk }
      open={ isLanguageModalVisible }
      title={ t('document.paste-as-new-language-variant') }
    >
      <Form
        form={ languageForm }
        layout="vertical"
      >
        <Form.Item
          label={ t('language') }
          name="language"
          rules={ [{ required: true, message: t('document.language-required') }] }
        >
          <Select
            options={ availableLanguages }
            placeholder={ t('document.select-language-for-new-document') }
          />
        </Form.Item>
      </Form>
    </Modal>
  )

  return {
    pasteTreeContextMenuItem,
    pasteInheritanceTreeContextMenuItem,
    pasteAsChildRecursiveTreeContextMenuItem,
    pasteRecursiveUpdatingReferencesTreeContextMenuItem,
    pasteAsChildTreeContextMenuItem,
    pasteAsNewLanguageVariantTreeContextMenuItem,
    pasteAsNewLanguageVariantRecursiveTreeContextMenuItem,
    pasteLanguageRecursiveUpdatingReferencesTreeContextMenuItem,
    pasteOnlyContentsTreeContextMenuItem,
    pasteAsChildRecursiveInheritanceTreeContextMenuItem,
    pasteRecursiveUpdatingReferencesInheritanceTreeContextMenuItem,
    pasteAsChildInheritanceTreeContextMenuItem,
    pasteAsNewLanguageVariantInheritanceTreeContextMenuItem,
    pasteAsNewLanguageVariantRecursiveInheritanceTreeContextMenuItem,
    pasteLanguageRecursiveUpdatingReferencesInheritanceTreeContextMenuItem,
    isPasteMenuHidden,
    isPasteInheritanceMenuHidden,
    LanguageModal
  }
}
