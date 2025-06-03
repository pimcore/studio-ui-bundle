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
import { Alert, Button } from '@sdk/components'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import { EditablesRenderer } from './components/editables-renderer/editables-renderer'

export const EditContainer = (): React.JSX.Element => {
  const { id } = useContext(DocumentContext)
  const { document: documentDraft } = useDocumentDraft( id )
  const { t } = useTranslation()
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const styleSheetRef = useRef<CSSStyleSheet | null>(null)
  const [shadowRoot, setShadowRoot] = useState<ShadowRoot | null>(null)
  const [stylesInjected, setStylesInjected] = useState(false)

  const onLoad = () => {
    const iframeDoc = iframeRef.current?.contentDocument
    if (!iframeDoc?.body) return

    const shadowHost = iframeDoc.createElement('div')
    const iframeWin = iframeRef.current?.contentWindow
    shadowHost.id = 'my-button-container'
    iframeDoc.body.appendChild(shadowHost)

    const root = shadowHost.attachShadow({ mode: 'open' })
    setShadowRoot(root)
    if (iframeWin) {
      const sheet = new iframeWin.CSSStyleSheet()
      styleSheetRef.current = sheet
    }
    
    setStylesInjected(false)
    
  }

  // Delayed style injection after portal components are mounted and styled
  useEffect(() => {
    if (!shadowRoot || stylesInjected) return

    // Wait for Button and Card styles to be generated
    const timeout = setTimeout(() => {
      const iframeWin = iframeRef.current?.contentWindow
      const iframeDoc = iframeRef.current?.contentDocument
      if (!iframeWin || !iframeDoc) return

      const styleTags = Array.from(
        document.head.querySelectorAll('style')
      )
      const combinedCSS = styleTags.map(tag => tag.textContent || '').join('\n')

      if (!styleSheetRef.current) return
      styleSheetRef.current.replaceSync(combinedCSS)
      shadowRoot.adoptedStyleSheets = [styleSheetRef.current]

      setStylesInjected(true)
    }, 0)

    return () => clearTimeout(timeout)
  }, [shadowRoot, stylesInjected])

  return (
    <>
    <iframe
        className={ ['w-full h-full'].join(' ') }
        ref={ iframeRef }
        src={ `${documentDraft?.fullPath}?pimcore_editmode=true&pimcore_studio=true` }
        title={ `${t('edit.label')}-${id}` }
        onLoad={ onLoad }
      />
      {shadowRoot && styleSheetRef.current && (
        <EditablesRenderer iframeRef={iframeRef} styleSheet={styleSheetRef.current} />
      )}
      {shadowRoot &&
              createPortal(
                <Button type="primary">
                  I am a super fancy button injected into an iframe via Shadow DOM + React portal
                </Button>,
                shadowRoot
              )}
            {shadowRoot &&
              createPortal(
                <Alert message="I am a very nice alert which shares the isolated stylesheet with the button in its Shadow DOM."/>,
                shadowRoot
              )}
              </>
  )
}
