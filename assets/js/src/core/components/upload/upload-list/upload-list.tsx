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

import { type UploadListProps as AntUploadListProps } from 'antd/es/upload'
import AntUploadList from 'antd/es/upload/UploadList'
import React from 'react'
import { Icon } from '@Pimcore/components/icon/icon'
import { Flex } from '@Pimcore/components/flex/flex'
import { useStyles } from './upload-list.styles'
import { useTranslation } from 'react-i18next'

interface UploadListProps {
  items: AntUploadListProps['items']
}

export const UploadList = ({ items = [] }: UploadListProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { t } = useTranslation()
  const successItems = items?.filter(item => item.status === 'done').length ?? 0
  const failedItems = items?.filter(item => item.status === 'error')

  return (
    <div className={ styles.uploadList }>
      <p>{t('asset.upload.files.completed-actions')}</p>

      {successItems >= 0 && (
        <Flex className={ 'success_items' }>
          <Icon value={ 'checkmark' } />
          <span>{ successItems } files are uploaded!</span>
        </Flex>
      )}

      <AntUploadList
        iconRender={ () => <Icon value={ 'alert' } /> }
        items={ failedItems }
        locale={ {} }
        showRemoveIcon={ false }
      />
    </div>
  )
}
