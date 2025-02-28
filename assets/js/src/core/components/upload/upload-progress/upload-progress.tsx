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
import React, { useContext } from 'react'
import { Progress } from 'antd'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Flex } from '@Pimcore/components/flex/flex'
import { useStyles } from '@Pimcore/components/upload/upload-progress/upload-progress.styles'
import { UploadContext } from '@Pimcore/modules/element/upload/upload-provider'
import { useTranslation } from 'react-i18next'
import { UploadList } from '@Pimcore/components/upload/upload-list/upload-list'

export const UploadProgress = (props: UploadListProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { t } = useTranslation()
  const items = props.items!
  const totalItems = items.length
  const processedItems = items.filter(file => file.status !== 'uploading').length
  const failedItems = items.filter(file => file.status === 'error')
  const { finishUpload } = useContext(UploadContext)!

  return (
    <div className={ styles.uploadList }>
      <Flex
        className={ 'w-full' }
        justify={ 'end' }
      >
        <IconButton
          icon={ { value: 'close' } }
          onClick={ finishUpload }
        />
      </Flex>

      <Flex
        align={ 'center' }
        className={ 'w-full' }
        vertical
      >
        <Progress
          { ...props.progress }
          aria-label={ 'upload progress' }
          percent={ (processedItems / totalItems) * 100 }
          showInfo={ false }
          size={ [-1, 2] }
          type="line"
        />

        <span>
          {t('asset.upload.files.processed', { processedItems, totalItems })}
        </span>
      </Flex>

      <UploadList items={ failedItems } />
    </div>
  )
}
