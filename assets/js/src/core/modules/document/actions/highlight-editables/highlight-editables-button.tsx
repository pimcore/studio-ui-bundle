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
import { useTranslation } from 'react-i18next'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { DocumentContext } from '@Pimcore/modules/document/document-provider'
import { useDocumentDraft } from '@Pimcore/modules/document/hooks/use-document-draft'
import { useAppSelector } from '@Pimcore/app/store'
import { selectDocumentHighlightEditables } from '@Pimcore/modules/document/document-editor-slice'
import { getPimcoreStudioApi } from '@Pimcore/app/public-api/helpers/api-helper'

const TYPES_WITH_EDITABLES = ['page', 'snippet', 'email']

export const HighlightEditablesButton = (): React.JSX.Element | null => {
  const { t } = useTranslation()
  const { id } = useContext(DocumentContext)
  const { document } = useDocumentDraft(id)
  const isHighlighted = useAppSelector((state) => selectDocumentHighlightEditables(state, id))

  if (document?.type === undefined || !TYPES_WITH_EDITABLES.includes(document.type)) {
    return null
  }

  const toggleHighlight = (): void => {
    try {
      const { document: documentApi } = getPimcoreStudioApi()
      documentApi.setHighlightEditables(id, !isHighlighted)
    } catch (error) {
      console.warn('Could not toggle highlight-editables state:', error)
    }
  }

  return (
    <IconButton
      icon={ { value: 'color' } }
      onClick={ toggleHighlight }
      tooltip={ { title: t('document.highlight-editables') } }
      type={ isHighlighted ? 'primary' : 'link' }
    >
      {t('document.highlight-editables')}
    </IconButton>
  )
}
