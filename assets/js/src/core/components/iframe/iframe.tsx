import React, { forwardRef, useState } from 'react'
import { Spin } from '@Pimcore/components/spin/spin'
import { Flex } from '@Pimcore/components/flex/flex'
import { useStyle } from './iframe.styles'
import { useTranslation } from 'react-i18next'

interface IframeProps {
  src: string
  title: string
  loadingTip?: string
  onLoad?: () => void
}

export const Iframe = forwardRef<HTMLIFrameElement, IframeProps>(
  ({ src, title, loadingTip, onLoad }, ref): React.JSX.Element => {
    const [isLoaded, setIsLoaded] = useState(false)
    const { styles } = useStyle({ isLoaded })
    const { t } = useTranslation()

    const handleIframeLoad = (): void => {
      onLoad?.()
      setIsLoaded(true)
    }

    return (
      <Flex
        align="center"
        className={styles.iframeContainer}
        justify="center"
      >
        {!isLoaded && (
          <Spin
            asContainer
            tip={loadingTip ?? t('loading')}
          />
        )}
        <iframe
          className={styles.iframe}
          onLoad={handleIframeLoad}
          src={src}
          title={title}
          ref={ref}
        />
      </Flex>
    )
  }
)
