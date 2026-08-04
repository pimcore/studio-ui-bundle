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
import { IconButton, Flex, Progress } from '@sdk/components'
import { formatDataUnit } from '@Pimcore/utils/data-unit'
import { type FileUploadStatus } from '../../hooks/use-file-upload'
import { useStyle } from './selected-file-view.styles'

interface SelectedFileViewProps {
  file: File
  loading: boolean
  isUploading: boolean
  uploadStatus: FileUploadStatus
  uploadProgress: number
  onRemove: () => void
}

export const SelectedFileView = ({
  file,
  loading,
  isUploading,
  uploadStatus,
  uploadProgress,
  onRemove
}: SelectedFileViewProps): React.JSX.Element => {
  const { styles } = useStyle()

  return (
    <div className={ styles.uploadedFile }>
      <Flex
        align='start'
        gap={ 10 }
        vertical
      >
        <Flex
          align='start'
          gap={ 10 }
        >
          <Flex>
            <div>
              <div className={ styles.fileName }>{file.name}</div>
              <div className={ styles.fileSize }>{formatDataUnit(file.size)}</div>
            </div>
          </Flex>
          {!loading && !isUploading && uploadStatus !== 'success' && (
            <IconButton
              icon={ { value: 'close' } }
              iconPosition='start'
              onClick={ onRemove }
              type="link"
              variant='minimal'
            />
          )}
        </Flex>
        {isUploading && (
          <Progress
            percent={ uploadProgress }
            size="small"
            status={ uploadStatus }
          />
        )}
      </Flex>
    </div>
  )
}
