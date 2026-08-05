/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { isUndefined } from 'lodash'
import { useTranslation } from 'react-i18next'
import { Accordion } from '@Pimcore/components/accordion/accordion'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { useAppDispatch } from '@Pimcore/app/store'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { api as elementApi } from '@Pimcore/modules/element/element-api-slice-enhanced'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { useStyles } from './use-batch-delete-confirm.styles'

export interface ConfirmBatchDeleteParams {
  elementType: ElementType
  itemIds: number[]
  selectedRowsData?: Record<number, any>
  onOk: () => Promise<void>
}

export interface UseBatchDeleteConfirmReturn {
  confirmBatchDelete: (params: ConfirmBatchDeleteParams) => Promise<void>
}

interface BatchDeleteInfo {
  isPermanent: boolean
  hasDependencies: boolean
}

export const useBatchDeleteConfirm = (): UseBatchDeleteConfirmReturn => {
  const { t } = useTranslation()
  const modal = useFormModal()
  const { styles } = useStyles()
  const dispatch = useAppDispatch()

  // The recycle bin threshold is evaluated per item on the backend (a plain item is always
  // recoverable, a folder-like item only if its descendant count is within the configured
  // limit) - so permanence can't be inferred from the selection size. The batch endpoint
  // aggregates it over all selected ids in a single request: canUseRecycleBin is false as
  // soon as one item would be deleted permanently, hasDependencies is true as soon as one
  // item has children or is referenced by other elements.
  const fetchBatchDeleteInfo = async (elementType: ElementType, itemIds: number[]): Promise<BatchDeleteInfo | null> => {
    const request = dispatch(elementApi.endpoints.elementBatchDeleteInfo.initiate({ elementType, body: { ids: itemIds } }))

    try {
      const response = await request

      if ('error' in response) {
        if (!isUndefined(response.error)) {
          trackError(new ApiError(response.error))
        }
        return null
      }

      return {
        isPermanent: !response.data.canUseRecycleBin,
        hasDependencies: response.data.hasDependencies
      }
    } finally {
      request.reset()
    }
  }

  const getWarningText = (info: BatchDeleteInfo): string | null => {
    const parts: string[] = []

    if (info.isPermanent) {
      parts.push(t('element.delete.batch.note'))
    }

    if (info.hasDependencies) {
      parts.push(t('element.delete.batch.dependencies-warning.confirmed'))
    }

    return parts.length === 0 ? null : parts.join(' ')
  }

  const confirmBatchDelete = async ({ elementType, itemIds, selectedRowsData, onOk }: ConfirmBatchDeleteParams): Promise<void> => {
    const info = await fetchBatchDeleteInfo(elementType, itemIds)

    if (info === null) {
      return
    }

    const count = itemIds.length
    const paths = itemIds.map(id => selectedRowsData?.[id]?.fullpath ?? String(id))
    const pathList = (
      <ul className={ styles.pathList }>
        {paths.map((path) => <li key={ path }>{path}</li>)}
      </ul>
    )
    const warningText = getWarningText(info)

    modal.confirm({
      title: t('element.delete.batch.title'),
      width: 530,
      content: <>
        <p>{t('element.delete.batch.question', { count })}</p>
        {count > 5
          ? <Accordion items={ [{ key: 'paths', title: <span>{t('element.delete.batch.show-paths')}</span>, children: pathList }] } />
          : pathList}
        {warningText !== null && <p><span className={ styles.warningText }>{warningText}</span></p>}
      </>,
      cancelText: t('cancel'),
      okText: info.isPermanent ? t('element.delete.batch.ok.permanent') : t('element.delete.batch.ok'),
      onOk
    })
  }

  return { confirmBatchDelete }
}
