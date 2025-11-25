/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { useStyle } from './unsafe-pdf-view.styles'
import { useTranslation } from 'react-i18next'
import { getPrefix } from '@Pimcore/app/api/pimcore/route'
import { Button } from '@Pimcore/components/button/button'
import { Flex } from '@Pimcore/components/flex/flex'
import { Box } from '@Pimcore/components/box/box'
import { Image } from 'antd'
import { Spin } from '@sdk/components'

interface UnsafePdfViewProps {
  assetId: number
  fullPath: string
}

const UnsafePdfView = (props: UnsafePdfViewProps): React.JSX.Element => {
  const { styles } = useStyle()
  const { t } = useTranslation()
  const { assetId, fullPath } = props

  const thumbnailUrl = `${getPrefix()}/assets/${assetId}/document/stream/thumbnail/document-thumbnail`

  const handleOpenInNewWindow = (): void => {
    window.open(fullPath, '_blank')
  }

  return (
    <Flex
      align="center"
      className={ styles.container }
      justify="center"
    >
      <Flex
        align="center"
        className={ styles.innerContainer }
        justify="center"
        vertical
      >
        <Box className={ styles.thumbnailContainer }>
          <Image
            alt=""
            className={ styles.thumbnail }
            placeholder={ <Spin /> }
            preview={ false }
            src={ thumbnailUrl }
          />
        </Box>

        <Box margin={ { y: 'normal' } }>
          <Button
            onClick={ handleOpenInNewWindow }
            type="default"
          >
            {t('asset.asset-editor-tabs.preview.open-in-new-window')}
          </Button>
        </Box>
      </Flex>
    </Flex>
  )
}

export { UnsafePdfView }
