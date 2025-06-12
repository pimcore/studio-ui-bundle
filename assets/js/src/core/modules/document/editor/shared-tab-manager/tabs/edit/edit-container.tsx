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
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { EditablesRenderer } from './components/editables-renderer/editables-renderer'
import { isNil } from 'lodash'
import { Iframe } from '../../../../../../components/iframe/iframe'

export const EditContainer = (): React.JSX.Element => {
  const { id } = useContext(DocumentContext)
  const { document: documentDraft } = useDocumentDraft(id)
  const { t } = useTranslation()
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const styleSheetRef = useRef<CSSStyleSheet | null>(null)
  const [stylesInjected, setStylesInjected] = useState<boolean | undefined>(undefined)

  const onLoad = (): void => {
    const iframeDoc = iframeRef.current?.contentDocument
    if (isNil(iframeDoc?.body)) return

    const iframeWin = iframeRef.current?.contentWindow

    if (!isNil(iframeWin)) {
      const sheet = new (iframeWin as any).CSSStyleSheet()
      styleSheetRef.current = sheet
    }

    setStylesInjected(false)
  }

  useEffect(() => {
    if (stylesInjected === true) return

    const timeout = setTimeout(() => {
      const iframeWin = iframeRef.current?.contentWindow
      const iframeDoc = iframeRef.current?.contentDocument
      if (isNil(iframeWin) || isNil(iframeDoc)) return

      const styleTags = Array.from(
        document.head.querySelectorAll('style')
      )
      const combinedCSS = styleTags.map(tag => tag.textContent ?? '').join('\n')

      if (isNil(styleSheetRef.current)) return
      styleSheetRef.current.replaceSync(combinedCSS)

      setStylesInjected(true)
    }, 0)

    return () => { clearTimeout(timeout) }
  }, [stylesInjected])

  return (
    <>
      <Iframe
        onLoad={ onLoad }
        ref={ iframeRef }
        src={ `${documentDraft?.fullPath}?pimcore_editmode=true&pimcore_studio=true` }
        title={ `${t('edit.label')}-${id}` }
      />
      {!isNil(styleSheetRef.current) && (
        <EditablesRenderer
          iframeRef={ iframeRef }
          styleSheet={ styleSheetRef.current }
        />
      )}
    </>
  )
}
