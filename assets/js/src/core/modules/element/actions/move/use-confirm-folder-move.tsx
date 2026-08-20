/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import React from 'react'
import { useTranslation } from 'react-i18next'

export interface ConfirmFolderMoveProps {
  /** True when the drop moves a folder to a new parent — a pure reorder does not need confirmation */
  isFolderMove: boolean
  sourceLabel: string
  targetLabel: string
  onConfirm: () => void
}

export interface UseConfirmFolderMoveHookReturn {
  confirmFolderMove: (props: ConfirmFolderMoveProps) => void
}

/**
 * Moving a folder rewrites the path of every element below it, so an accidental drop can
 * silently affect thousands of elements. Folders therefore always ask for confirmation,
 * single elements are moved right away.
 */
export const useConfirmFolderMove = (): UseConfirmFolderMoveHookReturn => {
  const { t } = useTranslation()
  const modal = useFormModal()

  const confirmFolderMove = ({ isFolderMove, sourceLabel, targetLabel, onConfirm }: ConfirmFolderMoveProps): void => {
    if (!isFolderMove) {
      onConfirm()
      return
    }

    modal.confirm({
      title: t('element.move.folder.title'),
      content: (
        <>
          <p>{t('element.move.folder.note')}</p>
          <p>{t('element.move.folder.question')}</p>
          <b>{sourceLabel}</b>
          <span> &rarr; </span>
          <b>{targetLabel}</b>
        </>
      ),
      cancelText: t('cancel'),
      okText: t('element.move.folder.ok'),
      onOk: onConfirm
    })
  }

  return { confirmFolderMove }
}
