/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback } from 'react'
import { isNil } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useStudioModal } from '@Pimcore/components/modal/hooks/use-studio-modal'
import { fetchImportReplaces } from '@Pimcore/modules/classification-store-config/components/store-editor/store-import-endpoint'
import { useStoreHasContent } from '@Pimcore/modules/classification-store-config/hooks/use-store-has-content'

/** Answers true to go ahead with the upload, false to call it off. */
export type ConfirmImport = (files: File[]) => Promise<boolean>

/**
 * The warning a destructive import has to carry: a file describing another store replaces this
 * store's configuration rather than merging into it, so what the store holds now is removed. An
 * empty store has nothing to lose and is imported into without a word.
 */
export const useStoreReplaceWarning = (storeId: number): ConfirmImport => {
  const { t } = useTranslation()
  const { localModal: modal } = useStudioModal()
  const hasContent = useStoreHasContent(storeId)

  return useCallback(async (files: File[]): Promise<boolean> => {
    const file = files[0]

    if (!hasContent || isNil(file)) {
      return true
    }

    // a dry run that cannot answer still warns: over-warning is safe, under-warning is not
    const replaces = await fetchImportReplaces(storeId, file)

    if (replaces === false) {
      return true
    }

    return await new Promise<boolean>((resolve) => {
      modal.confirm({
        title: t('classification-store.import-replace.title'),
        content: <span>{t('classification-store.import-replace.warning')}</span>,
        okText: t('yes'),
        cancelText: t('no'),
        onOk: () => { resolve(true) },
        onCancel: () => { resolve(false) }
      })
    })
  }, [hasContent, modal, storeId, t])
}
