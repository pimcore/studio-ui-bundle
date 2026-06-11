/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { getPrefix } from '@Pimcore/app/api/pimcore/route'
import { useDataObjectDraft } from '@Pimcore/modules/data-object/hooks/use-data-object-draft'
import {
  useDataObjectGetLayoutByIdQuery,
  type PreviewConfigEntry
} from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import useElementVisible from '@Pimcore/utils/hooks/use-element-visible'
import useElementResize from '@Pimcore/utils/hooks/use-element-resize'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Iframe, type IframeRef } from '../iframe/iframe'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Compact } from '@Pimcore/components/compact/compact'
import { Flex } from '@Pimcore/components/flex/flex'
import { Select } from '@Pimcore/components/select/select'
import { useAlertModal } from '@Pimcore/components/modal/alert-modal/hooks/use-alert-modal'

interface DataObjectPreviewProps {
  id: number
}

export const DataObjectPreview = ({ id }: DataObjectPreviewProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [timestamp, setTimestamp] = useState<number>(Date.now())
  const { dataObject } = useDataObjectDraft(id)
  const iframeRef = useRef<IframeRef>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isVisible = useElementVisible(iframeRef.current?.getElementRef(), true)
  const { width: availableWidth, height: availableHeight } = useElementResize(containerRef)
  const alertModal = useAlertModal()

  const [mode, setMode] = useState<{
    device: string
    width?: number
    height?: number
  }>({ device: 'desktop' })

  const [customParams, setCustomParams] = useState<Record<string, string>>({})

  const { data: layoutData } = useDataObjectGetLayoutByIdQuery({ id })
  const previewConfig: PreviewConfigEntry[] | null | undefined = layoutData?.previewConfig

  useEffect(() => {
    if (previewConfig != null && previewConfig.length > 0) {
      const defaults: Record<string, string> = {}
      previewConfig.forEach((entry) => {
        defaults[entry.name] = entry.defaultValue
      })
      setCustomParams(defaults)
    }
  }, [previewConfig])

  useEffect(() => {
    if (isVisible) {
      setTimestamp(Date.now())
    }
  }, [dataObject?.draftData?.modificationDate, isVisible])

  const handleSetMode = (newMode: { device: string, width?: number, height?: number }): void => {
    if ((newMode.width != null) && availableWidth > 0 && availableWidth - 10 < newMode.width) {
      alertModal.error({ content: t('preview.screen_size_too_small') })
      return
    }

    const updatedMode = { ...newMode }
    if ((updatedMode.height != null) && availableHeight > 0 && availableHeight - 10 < updatedMode.height) {
      updatedMode.height = availableHeight - 10
    }

    setMode(updatedMode)
  }

  const params = new URLSearchParams({ timestamp: String(timestamp), ...customParams })
  const previewUrl = `${getPrefix()}/data-objects/preview/${id}?${params.toString()}`

  const iframeStyle: React.CSSProperties = mode.device === 'desktop'
    ? {
        width: '100%',
        height: '100%',
        border: 'none'
      }
    : {
        width: mode.width,
        height: mode.height,
        border: '1px solid #eae8ed',
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
          <Flex gap="small">
            <Compact>
              <IconTextButton
                icon={ { value: 'monitor' } }
                onClick={ () => {
                  handleSetMode({ device: 'desktop' })
                } }
              >
                { t('preview.desktop') }
              </IconTextButton>
              <IconTextButton
                icon={ { value: 'tablet' } }
                onClick={ () => {
                  handleSetMode({ device: 'tablet', width: 1024, height: 768 })
                } }
              >
                { t('preview.tablet') }
              </IconTextButton>
              <IconTextButton
                icon={ { value: 'phone' } }
                onClick={ () => {
                  handleSetMode({ device: 'phone', width: 375, height: 667 })
                } }
              >
                { t('preview.phone-vertical') }
              </IconTextButton>
              <IconTextButton
                icon={ { value: 'phone-horizontal' } }
                onClick={ () => {
                  handleSetMode({ device: 'phone-horizontal', width: 667, height: 375 })
                } }
              >
                { t('preview.phone-horizontal') }
              </IconTextButton>
            </Compact>

            { previewConfig != null && previewConfig.map((entry) => (
              <Select
                key={ entry.name }
                onChange={ (value: string) => {
                  setCustomParams((prev) => ({ ...prev, [entry.name]: value }))
                } }
                options={ entry.values.map((v) => ({ label: v.key, value: v.value })) }
                value={ customParams[entry.name] ?? entry.defaultValue }
              />
            )) }
          </Flex>
        </Toolbar>
      ) }
    >
      <div
        ref={ containerRef }
        style={ {
          width: '100%',
          height: '100%',
          display: 'flex',
          overflow: 'auto'
        } }
      >
        <Iframe
          ref={ iframeRef }
          src={ previewUrl }
          style={ iframeStyle }
          title={ `${t('preview.label')}-${id}` }
        />
      </div>
    </ContentLayout>
  )
}
