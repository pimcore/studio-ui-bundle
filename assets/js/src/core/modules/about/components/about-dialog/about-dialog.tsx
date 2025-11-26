import { Button, Flex, IWindowModalProps, WindowModal } from "@sdk/components"
import React from "react"
import { useTranslation } from "react-i18next"
import { useStyle } from "./about-dialog.styles"

interface AboutDialogProps extends Omit<IWindowModalProps, "children"> { }

export const AboutDialog = (props: AboutDialogProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyle()

  return (
    <WindowModal
      {...props}
      footer={<></>}
      title={t('about.title')}
      width={520}
      height={281}
      className={styles.modal}
    >
      <div style={{ position: 'absolute', width: '100%', height: '100%', left: 0, top: 0 }}>
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
        <div style={{ position: 'relative', zIndex: 1, color: 'white', height: '100%' }}>
          <Flex vertical align="center" gap={'small'} style={{ marginTop: '175px' }}>
            <Flex vertical align="center" gap={'mini'}>
              <span>Platform Version: v2024.3</span>
              <span>© by Pimcore GmbH (pimcore.com)</span>
            </Flex>
            <Flex gap={'normal'}>
              <Button variant="text" type="link" href="https://google.com">License</Button>
              <Button variant="text" type="link" href="https://google.com">Contact</Button>
            </Flex>
          </Flex>
        </div>
      </div>
    </WindowModal>
  )
}