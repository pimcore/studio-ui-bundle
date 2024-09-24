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

import React, { useState } from 'react'
import { type UploadProps } from 'antd'
import { Upload as AntUpload } from 'antd'
import { type UploadFile } from 'antd/es/upload/interface'

export const Upload = (props: UploadProps): React.JSX.Element => {
  const [fileList, setFileList] = useState<UploadFile[]>([])

  return (
    <AntUpload
      { ...props }
      fileList={ fileList }
      onChange={ (changeProps) => {
        if (props.onChange !== undefined) {
          props.onChange(changeProps)

          // Filter out files that are done uploading
          const doneFiles = changeProps.fileList.filter((item) => item.status === 'done')
          console.log(doneFiles)

          setFileList(changeProps.fileList.filter((item) => item.status !== 'done'))
        }
      } }
    >
      {props.children}
    </AntUpload>
  )
}
