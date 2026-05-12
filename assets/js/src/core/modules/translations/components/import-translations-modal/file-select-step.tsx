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
import { Icon, Flex } from '@sdk/components'
import { Upload } from 'antd'
import { t } from 'i18next'
import type { UploadProps } from 'antd'
import { useStyle } from './import-translations-modal.styles'

const { Dragger } = Upload

interface FileSelectStepProps {
  isImporting: boolean
  fileError: string | null
  onFileSelect: (file: File) => void
}

export const FileSelectStep = ({ isImporting, fileError, onFileSelect }: FileSelectStepProps): React.JSX.Element => {
  const { styles } = useStyle()

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: false,
    accept: '.csv',
    beforeUpload: (file) => {
      onFileSelect(file as File)
      return false
    },
    showUploadList: false,
    disabled: isImporting
  }

  return (
    <>
      <Dragger { ...uploadProps }>
        <Flex
          align="center"
          className={ styles.draggerContent }
          gap="mini"
          justify="center"
          vertical
        >
          <div className="icon-container">
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
          <div className="file-target-title">
            {t('translations.import.modal.drag-drop')}
          </div>
        </Flex>
      </Dragger>
      {fileError !== null && (
        <div className={ styles.fileError }>{fileError}</div>
      )}
    </>
  )
}
