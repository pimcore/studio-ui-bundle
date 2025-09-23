/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect } from 'react'
import type { TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'
import type { ItemType } from '@Pimcore/components/dropdown/dropdown'
import { Icon } from '@Pimcore/components/icon/icon'
import { App } from 'antd'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { useDocumentDeleteSiteMutation, useDocumentUpdateSiteMutation, useLazyDocumentGetSiteQuery, type UpdateSite } from '@Pimcore/modules/document/document-api-slice-enhanced'
import { TreePermission } from '@Pimcore/modules/perspectives/enums/tree-permission'
import { useTreePermission } from '@Pimcore/modules/element/tree/provider/tree-permission-provider/use-tree-permission'
import { isAllowed } from '@Pimcore/modules/auth/permission-helper'
import { useAppDispatch } from '@sdk/app'
import { useTreeId } from '@Pimcore/modules/element/tree/provider/tree-id-provider/use-tree-id'
import { setDocumentNodeSiteStatus, setNodeFetching } from '@Pimcore/components/element-tree/element-tree-slice'
import { isNil, isUndefined, toNumber, isObject, has } from 'lodash'
import { useTranslation } from 'react-i18next'
import { type SiteFormValues } from './site-form'
import { useSiteModal } from './hooks/use-site-modal'
import { isNonEmptyString } from '@Pimcore/utils/type-utils'

export interface UseSiteActionsHookReturn {
  removeSiteTreeContextMenuItem: (node: TreeNodeProps) => ItemType
  useAsSiteTreeContextMenuItem: (node: TreeNodeProps) => ItemType
  editSiteTreeContextMenuItem: (node: TreeNodeProps) => ItemType
}

export const useSiteActions = (): UseSiteActionsHookReturn => {
  const { t } = useTranslation()
  const [documentDeleteSite, { error: deleteError }] = useDocumentDeleteSiteMutation()
  const [documentUpdateSite, { error: updateError }] = useDocumentUpdateSiteMutation()
  const [fetchSiteData, { error: fetchError }] = useLazyDocumentGetSiteQuery()
  const { modal } = App.useApp()
  const dispatch = useAppDispatch()
  const { isTreeActionAllowed } = useTreePermission()
  const { treeId } = useTreeId()
  const { openModal, currentDocumentId } = useSiteModal()

  const setNodeLoading = (id: number): void => {
    dispatch(setNodeFetching({ treeId, nodeId: String(id), isFetching: true }))
  }

  const clearNodeLoading = (id: number): void => {
    dispatch(setNodeFetching({ treeId, nodeId: String(id), isFetching: false }))
  }

  const getNodeId = (node: TreeNodeProps): number => {
    return toNumber(node.id)
  }

  useEffect(() => {
    if (!isUndefined(deleteError)) {
      trackError(new ApiError(deleteError))
    }
  }, [deleteError])

  useEffect(() => {
    if (!isUndefined(updateError)) {
      trackError(new ApiError(updateError))
    }
  }, [updateError])

  useEffect(() => {
    if (!isUndefined(fetchError)) {
      trackError(new ApiError(fetchError))
    }
  }, [fetchError])

  const removeSite = async (id: number): Promise<void> => {
    const response = await documentDeleteSite({ id })

    if (!isUndefined(response.error)) {
      return
    }

    dispatch(setDocumentNodeSiteStatus({ nodeId: String(id), isSite: false }))
  }

  const submitSiteData = async (id: number, values: SiteFormValues): Promise<void> => {
    const domains = isNonEmptyString(values.domains)
      ? values.domains.split(/\r?\n/).map(d => d.trim()).filter(d => d)
      : []

    const localizedErrorDocuments: Record<string, string> = {}
    if (!isUndefined(values.errorDocuments) && values.errorDocuments !== null) {
      Object.entries(values.errorDocuments).forEach(([language, document]) => {
        if (isObject(document) && has(document, 'fullPath') && isNonEmptyString(document.fullPath)) {
          localizedErrorDocuments[language] = document.fullPath
        }
      })
    }

    const updateSiteData: UpdateSite = {
      mainDomain: values.mainDomain ?? '',
      domains,
      errorDocument: isObject(values.errorDocument) && has(values.errorDocument, 'fullPath') && isNonEmptyString(values.errorDocument.fullPath)
        ? values.errorDocument.fullPath
        : '',
      localizedErrorDocuments,
      redirectToMainDomain: Boolean(values.redirectToMainDomain)
    }

    const response = await documentUpdateSite({ id, updateSite: updateSiteData })

    if (!isUndefined(response.error)) {
      return
    }

    dispatch(setDocumentNodeSiteStatus({ nodeId: String(id), isSite: true }))
  }

  const useAsSite = async (id: number, documentPath?: string): Promise<void> => {
    const initialValues: SiteFormValues = {
      mainDomain: '',
      domains: '',
      errorDocument: null,
      errorDocuments: {},
      redirectToMainDomain: false
    }

    openModal({
      title: t('document.site.use-as-site'),
      documentId: id,
      documentPath,
      initialValues,
      onSubmit: async (values: SiteFormValues) => { await submitSiteData(id, values) }
    })
  }

  const editSite = async (id: number, documentPath?: string): Promise<void> => {
    try {
      if (currentDocumentId === id) {
        clearNodeLoading(id)
        return
      }

      const { data: siteData, error } = await fetchSiteData({ documentId: id }, true)

      if (!isUndefined(error)) {
        clearNodeLoading(id)
        return
      }

      if (!isUndefined(siteData) && siteData !== null) {
        const initialValues: SiteFormValues = {
          mainDomain: siteData.mainDomain ?? '',
          domains: !isUndefined(siteData.domains) && siteData.domains !== null ? siteData.domains.join('\n') : '',
          errorDocument: siteData.errorDocument ?? null,
          errorDocuments: siteData.localizedErrorDocuments ?? {},
          redirectToMainDomain: Boolean(siteData.redirectToMainDomain)
        }

        openModal({
          title: !isNil(siteData.id) ? `${t('document.site.edit-site')} - ID: ${siteData.id}` : t('document.site.edit-site'),
          documentId: id,
          documentPath,
          initialValues,
          onSubmit: async (values: SiteFormValues) => { await submitSiteData(id, values) }
        })

        setTimeout(() => {
          clearNodeLoading(id)
        }, 100)
      }
    } catch (error) {
      clearNodeLoading(id)
      console.error('Error loading site data:', error)
    }
  }

  const showRemoveSiteConfirmation = (id: number): void => {
    void modal.confirm({
      title: t('document.site.remove-site'),
      content: t('document.site.remove-site-confirmation'),
      okText: t('remove'),
      onOk: async () => {
        await removeSite(id)
      }
    })
  }

  const showUseAsSiteForm = (node: TreeNodeProps): void => {
    void useAsSite(getNodeId(node), node.fullPath)
  }

  const showEditSiteForm = (node: TreeNodeProps): void => {
    setNodeLoading(getNodeId(node))

    void editSite(getNodeId(node), node.fullPath)
  }

  const removeSiteTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    const isSite = node.isSite === true

    return {
      key: 'removeSite',
      label: t('document.site.remove-site'),
      icon: <Icon value={ 'trash' } />,
      hidden: node.type !== 'page' || !isSite || !isAllowed('sites') || !isTreeActionAllowed(TreePermission.RemoveSite),
      onClick: (): void => {
        showRemoveSiteConfirmation(getNodeId(node))
      }
    }
  }

  const useAsSiteTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    const isSite = node.isSite === true

    return {
      key: 'useAsSite',
      label: t('document.site.use-as-site'),
      icon: <Icon value={ 'home-root-folder' } />,
      hidden: node.type !== 'page' || isSite || !isAllowed('sites') || !isTreeActionAllowed(TreePermission.UseAsSite),
      onClick: (): void => {
        showUseAsSiteForm(node)
      }
    }
  }

  const editSiteTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    const isSite = node.isSite === true

    return {
      key: 'editSite',
      label: t('document.site.edit-site'),
      icon: <Icon value={ 'edit' } />,
      hidden: node.type !== 'page' || !isSite || !isAllowed('sites') || !isTreeActionAllowed(TreePermission.EditSite),
      onClick: (): void => {
        showEditSiteForm(node)
      }
    }
  }

  return {
    removeSiteTreeContextMenuItem,
    useAsSiteTreeContextMenuItem,
    editSiteTreeContextMenuItem
  }
}
