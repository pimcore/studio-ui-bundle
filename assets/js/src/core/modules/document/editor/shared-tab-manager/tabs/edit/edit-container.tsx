/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { DocumentContext } from '@Pimcore/modules/document/document-provider'
import { useDocumentDraft } from '@Pimcore/modules/document/hooks/use-document-draft'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Iframe } from '../../../../../../components/iframe/iframe'

export const EditContainer = (): React.JSX.Element => {
  const { id } = useContext(DocumentContext)
  const { document: documentDraft } = useDocumentDraft(id)
  const { t } = useTranslation()

  return (
    <Iframe
      src={ `${documentDraft?.fullPath}?pimcore_editmode=true&pimcore_studio=true` }
      title={ `${t('edit.label')}-${id}` }
    />
  )
}
