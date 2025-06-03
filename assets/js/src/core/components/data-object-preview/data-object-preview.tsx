import { getPrefix } from '@Pimcore/app/api/pimcore/route'
import { useStyles } from '@Pimcore/components/data-object-preview/data-object-preview.styles'
import { useDataObjectDraft } from '@Pimcore/modules/data-object/hooks/use-data-object-draft'
import useElementVisible from '@Pimcore/utils/hooks/use-element-visible'
import { Button } from '@Pimcore/components/button/button'
import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import { Alert, Card, useAlertModal } from '@sdk/components'

interface DataObjectPreviewProps {
  id: number
}

export const DataObjectPreview = ({ id }: DataObjectPreviewProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const { dataObject } = useDataObjectDraft(id)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const isVisible = useElementVisible(iframeRef, true)
  const modal = useAlertModal()

  const [timestamp, setTimestamp] = useState<number>(Date.now())
  const [shadowRoot, setShadowRoot] = useState<ShadowRoot | null>(null)
  const [stylesInjected, setStylesInjected] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setTimestamp(Date.now())
    }
  }, [dataObject?.draftData?.modificationDate, isVisible])

  const onLoad = () => {
    const iframeDoc = iframeRef.current?.contentDocument
    if (!iframeDoc?.body) return

    const shadowHost = iframeDoc.createElement('div')
    shadowHost.id = 'my-button-container'
    iframeDoc.body.appendChild(shadowHost)

    const root = shadowHost.attachShadow({ mode: 'open' })
    setShadowRoot(root)
    setStylesInjected(false)
    
  }

  // Delayed style injection after portal components are mounted and styled
  useEffect(() => {
    if (!shadowRoot || stylesInjected) return

    // Wait for Button and Card styles to be generated
   // const timeout = setTimeout(() => {
      const iframeWin = iframeRef.current?.contentWindow
      const iframeDoc = iframeRef.current?.contentDocument
      if (!iframeWin || !iframeDoc) return

      const styleTags = Array.from(
        document.head.querySelectorAll('style')
      )
      const combinedCSS = styleTags.map(tag => tag.textContent || '').join('\n')

    /*  if (
        'adoptedStyleSheets' in shadowRoot &&
        'CSSStyleSheet' in iframeWin &&
        'replaceSync' in iframeWin.CSSStyleSheet.prototype
      ) {*/
        const sheet = new iframeWin.CSSStyleSheet()
        sheet.replaceSync(combinedCSS)
        shadowRoot.adoptedStyleSheets = [sheet]
     /* } else {
        const fallbackStyle = iframeDoc.createElement('style')
        fallbackStyle.textContent = combinedCSS
        shadowRoot.appendChild(fallbackStyle)
      }*/

      setStylesInjected(true)
   // }, 0)

   // return () => clearTimeout(timeout)
  }, [shadowRoot, stylesInjected])

  const onClick = () => {
    modal.info({
      title: t('preview.label'),
      content: t('preview.info', { id }),
    })
  }

  return (
    <>
      <iframe
        className={ ['w-full h-full', styles.preview].join(' ') }
        ref={ iframeRef }
        src={ `${getPrefix()}/data-objects/preview/${id}?timestamp=${timestamp}` }
        title={ `${t('preview.label')}-${id}` }
        onLoad={ onLoad }
      />
      {shadowRoot &&
        createPortal(
          <Button type="primary" onClick={onClick}>
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