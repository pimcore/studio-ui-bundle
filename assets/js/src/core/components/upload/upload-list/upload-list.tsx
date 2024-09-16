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
import React, { type ReactElement } from 'react'
import AntUploadList from 'antd/es/upload/UploadList'
import { useStyles } from '@Pimcore/components/upload/upload-list/upload-list.styles'
import { type UploadFile } from 'antd/es/upload/interface'
import { Icon } from '@Pimcore/components/icon/icon'
import { Progress } from 'antd'

export const UploadList = (props: UploadListProps): React.JSX.Element => {
  const { styles } = useStyles()

  const iconRenderer = (file: UploadFile): React.JSX.Element => {
    const fileType = file.type

    switch (fileType) {
      default:
        return <Icon name={ 'image-01' } />
    }
  }

  const itemRender = (originNode: ReactElement, file: UploadFile, fileList: object[]): React.JSX.Element => {
    const icon = iconRenderer(file)

    return (
      <>
        <div className={ 'file-upload-list__file-details' }>
          {icon}

          <p className={ 'file-upload-list__file__filename' }>
            {file.name}
          </p>
        </div>

        {'percent' in file && (
          <div className={ 'file-upload-list__file__progress' }>
            <Progress
              { ...props.progress }
              aria-label={ file['aria-label'] }
              aria-labelledby={ file['aria-labelledby'] }
              percent={ file.percent }
              showInfo={ false }
              size={ [-1, 2] }
              type="line"
            />
          </div>
        )}
      </>
    )
  }

  return (
    <div className={ styles.uploadList }>
      <AntUploadList
        iconRender={ iconRenderer }
        itemRender={ itemRender }
        { ...props }
      />
    </div>
  )
}
