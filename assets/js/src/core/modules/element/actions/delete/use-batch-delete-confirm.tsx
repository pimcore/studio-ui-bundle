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
import trackError, { ApiError, isApiErrorData } from '@Pimcore/modules/app/error-handler'
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
  hasDependencies: boolean | null
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
  const fetchBatchDeleteInfo = async (elementType: ElementType, itemIds: number[]): Promise<BatchDeleteInfo> => {
    const request = dispatch(elementApi.endpoints.elementBatchDeleteInfo.initiate({ elementType, body: { ids: itemIds } }))

    try {
      const data = await request.unwrap()
      return {
        isPermanent: !data.canUseRecycleBin,
        hasDependencies: data.hasDependencies
      }
    } catch (error) {
      if (isApiErrorData(error)) {
        trackError(new ApiError(error))
      }
      return { isPermanent: false, hasDependencies: null }
    } finally {
      request.reset()
    }
  }

  const confirmBatchDelete = async ({ elementType, itemIds, selectedRowsData, onOk }: ConfirmBatchDeleteParams): Promise<void> => {
    const count = itemIds.length
    const paths = itemIds.map(id => selectedRowsData?.[id]?.fullpath ?? String(id))
    const pathList = (
      <ul className={ styles.pathList }>
        {paths.map((path) => <li key={ path }>{path}</li>)}
      </ul>
    )

    const getWarningText = (info: BatchDeleteInfo): string | null => {
      const parts: string[] = []

      if (info.isPermanent) {
        parts.push(t('element.delete.batch.note'))
      }

      if (info.hasDependencies === true) {
        parts.push(t('element.delete.batch.dependencies-warning.confirmed'))
      } else if (info.hasDependencies === null) {
        parts.push(t('element.delete.batch.dependencies-warning'))
      }

      return parts.length === 0 ? null : parts.join(' ')
    }

    const getContent = (info?: BatchDeleteInfo): React.JSX.Element => {
      const warningText = info === undefined ? null : getWarningText(info)

      return (
        <>
          <p>{t('element.delete.batch.question', { count })}</p>
          {count > 5
            ? <Accordion items={ [{ key: 'paths', title: <span>{t('element.delete.batch.show-paths')}</span>, children: pathList }] } />
            : pathList}
          {warningText !== null && <p><span className={ styles.warningText }>{warningText}</span></p>}
        </>
      )
    }


    const confirmModal = modal.confirm({
      title: t('element.delete.batch.title'),
      width: 530,
      content: getContent(),
      cancelText: t('cancel'),
      okText: t('element.delete.batch.ok'),
      okButtonProps: { loading: true, disabled: true },
      onOk
    })

    const info = await fetchBatchDeleteInfo(elementType, itemIds)

    confirmModal.update((prevConfig) => ({
      ...prevConfig,
      content: getContent(info),
      okText: info.isPermanent ? t('element.delete.batch.ok.permanent') : t('element.delete.batch.ok'),
      okButtonProps: { ...prevConfig.okButtonProps, loading: false, disabled: false }
    }))
  }

  return { confirmBatchDelete }
}
