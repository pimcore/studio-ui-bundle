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
import { Icon } from '@Pimcore/components/icon/icon'
import { setNodeFetching } from '@Pimcore/components/element-tree/element-tree-slice'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '@sdk/app'
import { useTreeId } from '@Pimcore/components/element-tree/provider/tree-id-provider/use-tree-id'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { ContextMenuActionName } from '@Pimcore/modules/element/actions'
import { useTreeCopyPasteContext, type StoreNode } from '@Pimcore/modules/element/actions/copy-paste/tree-copy-paste-context'
import { usePasteVisibility } from '@Pimcore/modules/element/actions/copy-paste/use-paste-visibility'
import { App } from 'antd'
import { Select } from '@Pimcore/components/select/select'
import { Form } from '@Pimcore/components/form/form'
import { type DocumentCloneParameters, api } from '@Pimcore/modules/document/document-api-slice.gen'
import { isNil } from 'lodash'
import { useSettings } from '@Pimcore/modules/app/settings/hooks/use-settings'
import { useExecutionEngine } from '@Pimcore/modules/execution-engine/hooks/use-execution-engine'
import { useLanguageLookup } from '@Pimcore/modules/translations/hooks/use-language-lookup'
import { DocumentCloneJob } from '@Pimcore/modules/execution-engine/jobs/clone/document-clone-job'

export interface LanguageOption {
  value: string
  label: string
}

export type LanguageModalType = 'child' | 'recursive' | 'recursive-update-references'

export interface UsePasteHookReturn {
  pasteMenuTreeContextMenuItem: (node: TreeNodeProps) => ItemType
  pasteInheritanceTreeContextMenuItem: (node: TreeNodeProps) => ItemType
}

export const usePaste = (): UsePasteHookReturn => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { treeId } = useTreeId(true)
  const { getStoredNode } = useTreeCopyPasteContext('document')
  const { isPasteHidden } = usePasteVisibility('document')
  const settings = useSettings()
  const executionEngine = useExecutionEngine()
  const { getDisplayName } = useLanguageLookup()
  const { modal } = App.useApp()

  const [languageForm] = Form.useForm()

  const availableLanguages: LanguageOption[] = (settings.validLanguages ?? []).map((locale: string) => ({
    value: locale,
    label: `${getDisplayName(locale)} [${locale}]`
  }))

  const cloneDocument = async (
    sourceNode: StoreNode,
    targetNode: TreeNodeProps,
    parameters: DocumentCloneParameters
  ): Promise<void> => {
    if (isNil(sourceNode)) {
      throw new Error('Source node is null')
    }

    const sourceId = typeof sourceNode.id === 'string' ? parseInt(sourceNode.id) : sourceNode.id
    const targetId = typeof targetNode.id === 'string' ? parseInt(targetNode.id) : targetNode.id

    const job = new DocumentCloneJob({
      sourceId,
      targetId,
      parameters,
      treeId,
      nodeId: String(targetId)
    })

    await executionEngine.runJob(job)
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

  const showLanguageModal = (node: TreeNodeProps, type: LanguageModalType): void => {
    showLanguageModalDialog(node, type, false)
  }

  const showLanguageModalWithInheritance = (node: TreeNodeProps, type: LanguageModalType): void => {
    showLanguageModalDialog(node, type, true)
  }

  const showLanguageModalDialog = (node: TreeNodeProps, type: LanguageModalType, enableInheritance: boolean): void => {
    void modal.confirm({
      title: t('document.language-required'),
      content: (
        <Form form={ languageForm }>
          <Form.Item
            label={ t('language') }
            name="language"
            rules={ [{ required: true, message: t('form.validation.required') }] }
          >
            <Select options={ availableLanguages } />
          </Form.Item>
        </Form>
      ),
      onOk: async () => { await handleLanguageModalOk(node, type, enableInheritance) },
      onCancel: handleLanguageModalCancel,
      okText: t('paste'),
      cancelText: t('cancel')
    })
  }

  const handleLanguageModalOk = async (node: TreeNodeProps, type: LanguageModalType, enableInheritance: boolean): Promise<void> => {
    const formValues = await languageForm.validateFields()
    const { language } = formValues

    try {
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
      languageForm.resetFields()
    } catch (error) {
      console.error('Clone operation failed:', error)
    }
  }

  const handleLanguageModalCancel = (): void => {
    languageForm.resetFields()
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
        await replaceDocumentContent(getStoredNode(), node)
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

  const pasteMenuTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('element.tree.paste'),
      key: 'paste',
      icon: <Icon value="paste" />,
      hidden: isPasteMenuHidden(node),
      children: [
        pasteAsChildRecursiveTreeContextMenuItem(node),
        pasteRecursiveUpdatingReferencesTreeContextMenuItem(node),
        pasteAsChildTreeContextMenuItem(node),
        pasteAsNewLanguageVariantTreeContextMenuItem(node),
        pasteAsNewLanguageVariantRecursiveTreeContextMenuItem(node),
        pasteLanguageRecursiveUpdatingReferencesTreeContextMenuItem(node),
        pasteOnlyContentsTreeContextMenuItem(node)
      ]
    }
  }

  const pasteInheritanceTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('document.paste-inheritance'),
      key: 'paste-inheritance',
      icon: <Icon value="paste" />,
      hidden: isPasteInheritanceMenuHidden(node),
      children: [
        pasteAsChildRecursiveInheritanceTreeContextMenuItem(node),
        pasteRecursiveUpdatingReferencesInheritanceTreeContextMenuItem(node),
        pasteAsChildInheritanceTreeContextMenuItem(node),
        pasteAsNewLanguageVariantInheritanceTreeContextMenuItem(node),
        pasteAsNewLanguageVariantRecursiveInheritanceTreeContextMenuItem(node),
        pasteLanguageRecursiveUpdatingReferencesInheritanceTreeContextMenuItem(node)
      ]
    }
  }

  return {
    pasteMenuTreeContextMenuItem,
    pasteInheritanceTreeContextMenuItem
  }
}
