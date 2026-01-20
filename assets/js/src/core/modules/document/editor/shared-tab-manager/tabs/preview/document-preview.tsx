/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDocumentDraft } from '@Pimcore/modules/document/hooks/use-document-draft'
import { useDocumentPreviewUrlProcessor } from '@Pimcore/modules/document/hooks/use-document-url-processor'
import useElementVisible from '@Pimcore/utils/hooks/use-element-visible'
import { Iframe, type IframeRef } from '@Pimcore/components/iframe/iframe'
import { isNil } from 'lodash'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Compact } from '@Pimcore/components/compact/compact'

interface DocumentPreviewProps {
  id: number
}

export const DocumentPreview = ({ id }: DocumentPreviewProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [refreshKey, setRefreshKey] = useState<number>(Date.now())
  const { document } = useDocumentDraft(id)
  const iframeRef = React.useRef<IframeRef>(null)
  const isVisible = useElementVisible(iframeRef.current?.getElementRef(), true)
  const [mode, setMode] = useState<{
    device: string
    width?: number
    height?: number
  }>({ device: 'desktop' })

  useEffect(() => {
    if (isVisible) {
      setRefreshKey(Date.now())
    }
  }, [document?.draftData?.modificationDate, isVisible])

  const forceDeviceType = mode.device === 'phone-horizontal' ? 'phone' : mode.device
  const previewUrl = useDocumentPreviewUrlProcessor(id, document?.fullPath ?? '', refreshKey, forceDeviceType)

  if (previewUrl === '' || isNil(document)) {
    return <div>{ t('preview.label') }</div>
  }

  const iframeStyle: React.CSSProperties = mode.device === 'desktop'
    ? {
        width: '100%',
        height: '100%',
        border: 'none'
      }
    : {
        width: mode.width,
        height: mode.height,
        border: `1px solid #eae8ed`,
        margin: 'auto',
        position: 'relative'
      }

  return (
    <ContentLayout
      renderToolbar={ (
        <Toolbar
          justify="start"
          theme="secondary"
        >
          <Compact>
            <IconTextButton
              active={ mode.device === 'desktop' }
              icon={ { value: 'monitor' } }
              onClick={ () => {
                setMode({ device: 'desktop' })
              } }
            >
              { t('preview.desktop') }
            </IconTextButton>
            <IconTextButton
              active={ mode.device === 'tablet' }
              icon={ { value: 'tablet' } }
              onClick={ () => {
                setMode({
                  device: 'tablet',
                  width: 1024,
                  height: 768
                })
              } }
            >
              { t('preview.tablet') }
            </IconTextButton>
            <IconTextButton
              active={ mode.device === 'phone' }
              icon={ { value: 'phone' } }
              onClick={ () => {
                setMode({
                  device: 'phone',
                  width: 375,
                  height: 667
                })
              } }
            >
              { t('preview.phone') }
            </IconTextButton>
            <IconTextButton
              active={ mode.device === 'phone-horizontal' }
              icon={ { value: 'phone-horizontal' } }
              onClick={ () => {
                setMode({
                  device: 'phone-horizontal',
                  width: 667,
                  height: 375
                })
              } }
            >
              { t('preview.phone-horizontal') }
            </IconTextButton>
          </Compact>
        </Toolbar>
      ) }
    >
      <Iframe
        ref={ iframeRef }
        src={ previewUrl }
        style={ iframeStyle }
        title={ `${t('preview.label')}-${id}` }
      />
    </ContentLayout>
  )
}
