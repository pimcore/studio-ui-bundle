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
import { useStyles } from '@Pimcore/components/upload/upload-list/upload-list.styles'

interface UploadListProps {
  items: AntUploadListProps['items']
}

export const UploadList = ({ items = [] }: UploadListProps): React.JSX.Element => {
  const { styles } = useStyles()

  return (
    <div className={ styles.uploadList }>
      <AntUploadList
        items={ items }
        locale={ {
          removeFile: 'remove File'
        } }
        showRemoveIcon={ false }
      />
    </div>
  )
}
