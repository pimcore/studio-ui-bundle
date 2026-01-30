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
import { Upload } from 'antd'
import type { UploadProps } from 'antd'
import { useTranslation } from 'react-i18next'
import { Icon } from '@Pimcore/components/icon/icon'
import { Flex } from '@Pimcore/components/flex/flex'
import { useStyle } from './file-drop-zone.styles'

const { Dragger } = Upload

interface FileDropZoneProps {
  uploadProps: UploadProps
  dragDropLabel?: string
}

export const FileDropZone = ({ uploadProps, dragDropLabel }: FileDropZoneProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyle()

  return (
    <Dragger { ...uploadProps }>
      <Flex
        align="center"
        gap="mini"
        justify="center"
        style={ { padding: '20px' } }
        vertical
      >
        <div className={ styles.iconContainer }>
          <Flex
            align="center"
            gap="mini"
            justify="center"
          >
            <Icon
              options={ { height: 20, width: 20 } }
              value="new"
            />
            <Icon
              options={ { height: 20, width: 20 } }
              value="drop-target"
            />
          </Flex>
        </div>
        <div className={ styles.importTargetTitle }>
          {dragDropLabel ?? t('import-modal.drag-drop')}
        </div>
      </Flex>
    </Dragger>
  )
}
