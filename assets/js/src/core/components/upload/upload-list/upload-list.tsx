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
import { useStyles } from './upload-list.styles'

export const UploadList = (props: UploadListProps): React.JSX.Element => {
  const { styles } = useStyles()
  const items = props.items!
  const totalCount = items.length
  const doneCount = items.filter(file => file.status === 'done').length

  return (
    <div className={ styles.uploadList }>
      <Progress
        { ...props.progress }
        aria-label={ 'upload progress' }
        percent={ (doneCount / totalCount) * 100 }
        showInfo={ false }
        size={ [-1, 2] }
        type="line"
      />

      <span>
        {doneCount}/{totalCount} files uploaded
      </span>
    </div>
  )
}
