/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Button, Flex, type IWindowModalProps, Modal } from '@sdk/components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useStyle } from './about-dialog.styles'
import { useSettings } from '@sdk/modules/app'
import { isNil } from 'lodash'

interface AboutDialogProps extends Omit<IWindowModalProps, 'children'> { }

export const AboutDialog = (props: AboutDialogProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyle()
  const { platformVersion } = useSettings()

  return (
    <Modal
      {...props}
      className={styles.modal}
      footer={<></>}
      title={t('about.title')}
      width={520}
    >
      <div className="video-container">
        <video
          autoPlay
          loop
          muted
          playsInline
          src="/bundles/pimcorestudioui/videos/about-bg.mp4"
        />
        <div className="content-container">
          <Flex
            align="center"
            gap={'small'}
            vertical
          >
            <Flex
              align="center"
              gap={'mini'}
              vertical
            >
              {!isNil(platformVersion) && (
                <span>{t('about.platform-version', { version: platformVersion })}</span>
              )}
              <Flex
                align="center"
                gap={'mini'}
              >
                <span>
                  {t('about.copyright')}
                </span>

                <span>
                  (
                  <Button
                    className={styles.pimcoreBtn}
                    href="https://pimcore.com/"
                    target="_blank"
                    type="link"
                    variant="text"
                  >
                    pimcore.com
                  </Button>
                  )
                </span>
              </Flex>
            </Flex>
            <Flex gap={'normal'}>
              <Button
                href="https://github.com/pimcore/pimcore/blob/12.x/LICENSE.md"
                target="_blank"
                type="link"
                variant="text"
              >
                {t('about.buttons.license')}
              </Button>

              <Button
                href="https://pimcore.com/en/contact-us"
                target="_blank"
                type="link"
                variant="text"
              >
                {t('about.buttons.contact')}
              </Button>
            </Flex>
          </Flex>
        </div>
      </div>
    </Modal>
  )
}
