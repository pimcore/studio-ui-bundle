/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ItemType } from '@Pimcore/components/dropdown/dropdown'
import type { TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'
import { Icon } from '@Pimcore/components/icon/icon'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { useDocumentConvertMutation } from '@Pimcore/modules/document/document-api-slice.gen'
import { useWidgetManager } from '@Pimcore/modules/widget-manager/hooks/use-widget-manager'
import { getWidgetId } from '@Pimcore/modules/widget-manager/utils/tools'
import { updateNodeType } from '@Pimcore/components/element-tree/element-tree-slice'
import { useAppDispatch } from '@sdk/app'
import { type ElementIcon } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'
import { TreePermission } from '@Pimcore/modules/perspectives/enums/tree-permission'
import { useTreePermission } from '@Pimcore/components/element-tree/provider/tree-permission-provider/use-tree-permission'
import { isNil } from 'lodash'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export interface UseConvertHookReturn {
  convertMenuTreeContextMenuItem: (node: TreeNodeProps) => ItemType
}

interface DocumentTypeConfig {
  icon: string
  labelKey: string
}

const DOCUMENT_TYPE_CONFIG: Record<string, DocumentTypeConfig> = {
  page: {
    icon: 'document',
    labelKey: 'page'
  },
  snippet: {
    icon: 'snippet',
    labelKey: 'snippet'
  },
  email: {
    icon: 'email',
    labelKey: 'email'
  },
  link: {
    icon: 'document-link',
    labelKey: 'link'
  },
  hardlink: {
    icon: 'hardlink',
    labelKey: 'hardlink'
  }
}

export const useConvert = (): UseConvertHookReturn => {
  const { t } = useTranslation()
  const [documentConvert, { isError, error }] = useDocumentConvertMutation()
  const { closeWidget } = useWidgetManager()
  const modal = useFormModal()
  const dispatch = useAppDispatch()
  const { isTreeActionAllowed } = useTreePermission()

  useEffect(() => {
    if (isError) {
      trackError(new ApiError(error))
    }
  }, [isError, error])

  const getDocumentTypeIcon = (type: string): ElementIcon => {
    const config = DOCUMENT_TYPE_CONFIG[type]
    const iconValue = config?.icon ?? DOCUMENT_TYPE_CONFIG.page.icon
    return { type: 'name', value: iconValue }
  }

  const convertDocument = async (id: number, targetType: string): Promise<void> => {
    const response = await documentConvert({ id, type: targetType })

    if (response.error !== undefined) {
      return
    }

    const widgetId = getWidgetId('document', id)
    closeWidget(widgetId)

    const newIcon = getDocumentTypeIcon(targetType)
    dispatch(updateNodeType({
      nodeId: String(id),
      elementType: 'document',
      newType: targetType,
      newIcon
    }))
  }

  const showConvertConfirmation = (id: number, targetType: string): void => {
    modal.confirm({
      title: t('convert-document'),
      content: t('convert-document-warning'),
      onOk: async () => {
        await convertDocument(id, targetType)
      }
    })
  }

  const convertTreeContextMenuItem = (node: TreeNodeProps, targetType: string): ItemType => {
    const nodeId = parseInt(node.id)
    const nodeType = node.type
    const config = DOCUMENT_TYPE_CONFIG[targetType]

    if (nodeType === targetType || isNil(config)) {
      return {
        key: `convert-to-${targetType}`,
        label: '',
        hidden: true
      }
    }

    return {
      key: `convert-to-${targetType}`,
      label: t(config.labelKey),
      icon: <Icon value={ config.icon } />,
      onClick: () => {
        showConvertConfirmation(nodeId, targetType)
      }
    }
  }

  const canConvert = (node: TreeNodeProps): boolean => {
    return isTreeActionAllowed(TreePermission.Convert) &&
           !isNil(node.type) &&
           parseInt(node.id) !== 1 &&
           isNil(node.locked) &&
           !isNil(node.permissions) &&
           checkElementPermission(node.permissions, 'publish')
  }

  const convertMenuTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('convert-to'),
      key: 'convert-to',
      icon: <Icon value="flip-forward" />,
      hidden: !canConvert(node),
      children: [
        convertTreeContextMenuItem(node, 'page'),
        convertTreeContextMenuItem(node, 'snippet'),
        convertTreeContextMenuItem(node, 'email'),
        convertTreeContextMenuItem(node, 'link'),
        convertTreeContextMenuItem(node, 'hardlink')
      ]
    }
  }

  return {
    convertMenuTreeContextMenuItem
  }
}
