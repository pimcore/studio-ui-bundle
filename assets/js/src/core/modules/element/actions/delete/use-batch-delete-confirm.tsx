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
import { useTranslation } from 'react-i18next'
import { Accordion } from '@Pimcore/components/accordion/accordion'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { useAppDispatch } from '@Pimcore/app/store'
import { api as elementApi } from '@Pimcore/modules/element/element-api-slice.gen'
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

export const useBatchDeleteConfirm = (): UseBatchDeleteConfirmReturn => {
  const { t } = useTranslation()
  const modal = useFormModal()
  const { styles } = useStyles()
  const dispatch = useAppDispatch()

  // The recycle bin threshold is evaluated per item on the backend (a plain item is always
  // recoverable, a folder-like item only if its descendant count is within the configured
  // limit) - so permanence can't be inferred from the selection size and has to be checked
  // per item via the same delete-info endpoint the single-item/folder delete flow uses.
  const isBatchDeletePermanent = async (elementType: ElementType, itemIds: number[]): Promise<boolean> => {
    const canUseRecycleBinFlags = await Promise.all(
      itemIds.map(async (id) => {
        try {
          const { data } = await dispatch(elementApi.endpoints.elementGetDeleteInfo.initiate({ elementType, id }))
          return data?.canUseRecycleBin ?? true
        } catch {
          return true
        }
      })
    )

    return canUseRecycleBinFlags.some((canUseRecycleBin) => !canUseRecycleBin)
  }

  const confirmBatchDelete = async ({ elementType, itemIds, selectedRowsData, onOk }: ConfirmBatchDeleteParams): Promise<void> => {
    const isPermanent = await isBatchDeletePermanent(elementType, itemIds)

    const count = itemIds.length
    const paths = itemIds.map(id => selectedRowsData?.[id]?.fullpath ?? String(id))
    const pathList = (
      <ul className={ styles.pathList }>
        {paths.map((path) => <li key={ path }>{path}</li>)}
      </ul>
    )

    modal.confirm({
      title: t('element.delete.batch.title'),
      width: 530,
      content: <>
        <p>{t('element.delete.batch.question', { count })}</p>
        {count > 5
          ? <Accordion items={ [{ key: 'paths', title: <span>{t('element.delete.batch.show-paths')}</span>, children: pathList }] } />
          : pathList}
        <p><span className={ styles.warningText }>{t('element.delete.batch.dependencies-warning')}</span></p>
      </>,
      cancelText: t('cancel'),
      okText: isPermanent ? t('element.delete.batch.ok.permanent') : t('element.delete.batch.ok'),
      onOk
    })
  }

  return { confirmBatchDelete }
}
