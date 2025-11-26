import { Button, Flex, IWindowModalProps, WindowModal } from "@sdk/components"
import React from "react"
import { useTranslation } from "react-i18next"
import { useStyle } from "./about-dialog.styles"
import { useSettings } from "@sdk/modules/app"
import { isNil } from "lodash"

interface AboutDialogProps extends Omit<IWindowModalProps, "children"> { }

export const AboutDialog = (props: AboutDialogProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyle()
  const { platformVersion } = useSettings()

  return (
    <WindowModal
      {...props}
      footer={<></>}
      title={t('about.title')}
      width={520}
      height={281}
      className={styles.modal}
    >
      <div className="video-container">
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
            minHeight: '281px'
          }}
          src="/bundles/pimcorestudioui/videos/about-bg.mp4"
        />
        <div className="content-container">
          <Flex vertical align="center" gap={'small'}>
            <Flex vertical align="center" gap={'mini'}>
              {!isNil(platformVersion) && (
                <span>{t('about.platform-version', { version: platformVersion })}</span>
              )}
              <Flex align="center" gap={'mini'}>
                <span>
                  {t('about.copyright')}
                </span>

                <span>
                  (<Button
                    variant="text"
                    type="link"
                    href="https://pimcore.com/"
                    target="_blank"
                    className={styles.pimcoreBtn}
                  >
                    pimcore.com
                  </Button>)
                </span>
              </Flex>
            </Flex>
            <Flex gap={'normal'}>
              <Button
                variant="text"
                type="link"
                href="https://github.com/pimcore/pimcore/blob/12.x/LICENSE.md"
                target="_blank"
              >
                {t('about.buttons.license')}
              </Button>

              <Button
                variant="text"
                type="link"
                href="https://pimcore.com/en/contact-us"
                target="_blank"
              >
                {t('about.buttons.contact')}
              </Button>
            </Flex>
          </Flex>
        </div>
      </div>
    </WindowModal>
  )
}