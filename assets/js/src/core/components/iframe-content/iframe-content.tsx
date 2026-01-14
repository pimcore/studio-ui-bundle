/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Tooltip } from '@sdk/components'
import { isNil } from 'lodash'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { ContentLayout } from '../content-layout/content-layout'
import { IconButton } from '../icon-button/icon-button'
import { Iframe, type IframeProps, type IframeRef } from '../iframe/iframe'
import { Toolbar } from '../toolbar/toolbar'

interface IframeContentProps {
  iframe: IframeProps
  allowReload?: boolean
  allowOpen?: boolean
  toolbar?: React.JSX.Element
  onReload?: (iframe: IframeRef | null) => void
  onOpen?: (iframe: IframeRef | null) => void
}

export const IframeContent = (props: IframeContentProps): React.JSX.Element => {
  const { t } = useTranslation()
  const {
    allowReload = true,
    allowOpen = true,
    iframe,
    onReload,
    onOpen,
    toolbar
  } = props
  const iframeRef = useRef<IframeRef>(null)

  const getReloadButton = (): React.JSX.Element | null => {
    if (!allowReload) {
      return null
    }

    return (
      <Tooltip title={ t('toolbar.reload') }>
        <IconButton
          icon={ { value: 'refresh' } }
          onClick={ () => {
            if (!isNil(onReload)) {
              onReload(iframeRef.current)
              return
            }

            iframeRef.current?.reload()
          } }
        />
      </Tooltip>
    )
  }

  const getOpenButton = (): React.JSX.Element | null => {
    if (!allowOpen) {
      return null
    }

    return (
      <Tooltip title={ t('open') }>
        <IconButton
          icon={ { value: 'open-folder' } }
          onClick={ () => {
            if (!isNil(onOpen)) {
              onOpen(iframeRef.current)
              return
            }

            window.open(iframe.src, '_blank')
          } }
        />
      </Tooltip>
    )
  }

  return (
    <ContentLayout
      renderToolbar={ isNil(toolbar)
        ? (
          <Toolbar
            justify="start"
            theme='secondary'
          >
            <div>
              {getReloadButton()}
              {getOpenButton()}
            </div>
          </Toolbar>
          )
        : toolbar
      }
    >
      <Iframe
        ref={ iframeRef }
        { ...iframe }
      />
    </ContentLayout>
  )
}
