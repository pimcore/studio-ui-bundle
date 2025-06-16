/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useContext } from 'react'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { useTranslation } from 'react-i18next'
import { useElementRefresh } from '@Pimcore/modules/element/actions/refresh-element/use-element-refresh'
import { ReloadPopconfirm } from '@Pimcore/components/reload-popconfirm/reload-popconfirm'
import { DocumentContext } from '@Pimcore/modules/document/document-provider'
import { useDocumentDraft } from '@Pimcore/modules/document/hooks/use-document-draft'

export const ReloadButton = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { id } = useContext(DocumentContext)
  const { document } = useDocumentDraft(id)
  const { refreshElement } = useElementRefresh('document')


  const hasDataChanged = (): boolean => {
    return Object.keys(document?.changes ?? {}).length > 0
  }

  const onReload = (): void => {
    refreshElement(id, true)
  }

  return (
    <>
      <ReloadPopconfirm
        hasDataChanged={ hasDataChanged }
        key="reload"
        onReload={ onReload }
        title={ t('toolbar.reload.confirmation') }
      >
        <IconButton
          icon={ { value: 'refresh' } }
        >
          {t('toolbar.reload')}
        </IconButton>

      </ReloadPopconfirm>
    </>
  )
}
