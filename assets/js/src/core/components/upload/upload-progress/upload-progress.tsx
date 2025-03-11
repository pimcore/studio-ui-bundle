/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { type UploadListProps } from 'antd/es/upload'
import React from 'react'
import { Progress } from 'antd'
import { Flex } from '@Pimcore/components/flex/flex'
import { useStyles } from '@Pimcore/components/upload/upload-progress/upload-progress.styles'
import { useTranslation } from 'react-i18next'
import { UploadList } from '@Pimcore/components/upload/upload-list/upload-list'
import { useUploadContext } from '@Pimcore/modules/element/upload/upload-provider'

export const UploadProgress = (props: UploadListProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { t } = useTranslation()
  const { fileList } = useUploadContext()
  const totalItems = fileList.length
  const processedItems = fileList.filter(file => file.status !== 'uploading').length

  return (
    <div className={ styles.uploadProgress }>
      <Flex
        align={ 'start' }
        className={ 'w-full' }
        vertical
      >
        <span className={ 'progress-label' }>
          {
            processedItems !== totalItems
              ? t('asset.upload.files.uploading', { processedItems, totalItems })
              : t('asset.upload.files.completed')
          }
        </span>

        <Progress
          { ...props.progress }
          aria-label={ 'upload progress' }
          percent={ (processedItems / totalItems) * 100 }
          showInfo={ false }
          size={ [-1, 2] }
          type="line"
        />
      </Flex>

      <UploadList />
    </div>
  )
}
