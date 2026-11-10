/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal } from '@Pimcore/components/modal/modal'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { useMessage } from '@Pimcore/components/message/useMessage'
import trackError, { type ApiError } from '@Pimcore/modules/app/error-handler'
import { PairList, type PairListHandle } from './pair-list'
import { type PairMap, type PairView } from './pairs'

const DISCARD_KEY = 'classification-store-pairs-discard'

export interface IPairModalProps {
  open: boolean
  entityName: string
  /** The row's `customMetadata`, verbatim. */
  value: object | null | undefined
  confirmLoading: boolean
  /** Rejects with an ApiError when the save fails. */
  onSave: (next: PairMap | null) => Promise<void>
  onCancel: () => void
}

interface IPairModalShellProps extends IPairModalProps {
  view: PairView
  titleKey: string
  successKey: string
  hint?: string
}

/** The modal around the shared pair list; the two shells differ only in what they hand it. */
export const PairModalShell = ({
  open,
  entityName,
  value,
  confirmLoading,
  onSave,
  onCancel,
  view,
  titleKey,
  successKey,
  hint
}: IPairModalShellProps): React.JSX.Element => {
  const { t } = useTranslation()
  const messageApi = useMessage()
  const formModal = useFormModal()
  const listRef = useRef<PairListHandle>(null)
  const [dirty, setDirty] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!open) setDirty(false)
  }, [open])

  const handleOk = async (): Promise<void> => {
    if (saving) return

    const collected = listRef.current?.collect()
    if (collected === undefined) return

    setSaving(true)

    try {
      await onSave(collected.next)
    } catch (error) {
      trackError(error as ApiError)
      setSaving(false)
      return
    }

    setSaving(false)
    messageApi.success(t(successKey))
    onCancel()
  }

  const handleCancel = (): void => {
    if (!dirty) {
      onCancel()
      return
    }

    formModal.confirm({
      title: t('unsaved-changes.title'),
      content: t('unsaved-changes.close-message'),
      okText: t('discard-changes'),
      dontAskAgainKey: DISCARD_KEY,
      onOk: onCancel
    })
  }

  const handleDirtyChange = useCallback((next: boolean): void => { setDirty(next) }, [])

  return (
    <Modal
      confirmLoading={ confirmLoading || saving }
      destroyOnClose
      limitContentHeight
      okText={ t('save') }
      onCancel={ handleCancel }
      onOk={ () => { void handleOk() } }
      open={ open }
      size="L"
      title={ t(titleKey, { name: entityName }) }
    >
      <PairList
        hint={ hint }
        onDirtyChange={ handleDirtyChange }
        ref={ listRef }
        value={ value }
        view={ view }
      />
    </Modal>
  )
}
