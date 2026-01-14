import { Tooltip } from "@sdk/components";
import { isNil } from "lodash";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { ContentLayout } from "../../../../components/content-layout/content-layout";
import { IconButton } from "../../../../components/icon-button/icon-button";
import { Iframe, IframeProps, IframeRef } from "../../../../components/iframe/iframe";
import { Toolbar } from "../../../../components/toolbar/toolbar";

interface IframeContentProps {
  iframe: IframeProps
  allowReload?: boolean
  allowOpen?: boolean
  toolbar?: React.JSX.Element
  onReload?: (iframe: IframeRef | null) => void
  onOpen?: (iframe: IframeRef | null) => void
}

export const IframeWidget = (props: IframeContentProps): React.JSX.Element => {
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
      <Tooltip title={t('toolbar.reload')}>
        <IconButton
          icon={{ value: 'refresh' }}
          onClick={() => {
            if (!isNil(onReload)) {
              onReload(iframeRef.current)
              return
            }

            iframeRef.current?.reload()
          }}
        />
      </Tooltip>
    )
  }

  const getOpenButton = (): React.JSX.Element | null => {
    if (!allowOpen) {
      return null
    }

    return (
      <Tooltip title={t('open')}>
        <IconButton
          icon={{ value: 'open-folder' }}
          onClick={() => {
            if (!isNil(onOpen)) {
              onOpen(iframeRef.current)
              return
            }

            window.open(iframe.src, '_blank')
          }}
        />
      </Tooltip>
    )
  }

  return (
    <ContentLayout
      renderToolbar={!isNil(toolbar)
        ? toolbar
        : (<Toolbar
          justify="start"
          theme='secondary'
        >
          <div>
            {getReloadButton()}
            {getOpenButton()}
          </div>
        </Toolbar>)
      }
    >
      <Iframe
        ref={iframeRef}
        {...iframe}
      />
    </ContentLayout>
  )
}