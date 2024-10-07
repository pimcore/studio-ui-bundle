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
import { type UploadProps as AntUploadProps } from 'antd'
import { Upload as AntUpload } from 'antd'
import { type UploadChangeParam as AntUploadChangeParam, type UploadFile } from 'antd/es/upload/interface'
import { useStyles } from './upload.styles'

export interface UploadChangeParam<T = UploadFile> extends AntUploadChangeParam<T> {
  promise: Promise<number> | undefined
  promiseResolve: (value: number | PromiseLike<number>) => void
}

export interface UploadProps extends Omit<AntUploadProps, 'beforeUpload'> {
  onChange?: (info: UploadChangeParam) => void
}

type PromiseType = Pick<UploadChangeParam, 'promise' | 'promiseResolve'>
type PromiseHolder = Record<string, Pick<UploadChangeParam, 'promise' | 'promiseResolve'>>

export const Upload = (props: UploadProps): React.JSX.Element => {
  const { styles } = useStyles()
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [promiseCollection, setPromiseCollection] = useState<PromiseHolder>({})

  return (
    <AntUpload
      className={ styles.upload }
      { ...props }
      fileList={ fileList }
      onChange={ (changeProps) => {
        let promiseTmpHolder: PromiseType | undefined = promiseCollection[changeProps.file.uid]
        if (promiseTmpHolder === undefined) {
          let freshResolve: UploadChangeParam['promiseResolve'] = () => {}
          const freshPromise: Promise<number> | undefined = new Promise(resolve => {
            freshResolve = resolve
          })

          promiseTmpHolder = { promise: freshPromise, promiseResolve: freshResolve }
        }

        if (props.onChange !== undefined) {
          props.onChange({ ...changeProps, ...promiseTmpHolder })

          setFileList(changeProps.fileList.filter((item) => item.status !== 'done'))
        }

        setPromiseCollection({ ...promiseCollection, [changeProps.file.uid]: promiseTmpHolder })
      } }
    >
      {props.children}
    </AntUpload>
  )
}
