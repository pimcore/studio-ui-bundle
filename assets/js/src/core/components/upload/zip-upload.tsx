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
import { type UploadChangeParam as AntUploadChangeParam, type UploadFile } from 'antd/es/upload/interface'
import { Upload } from '@Pimcore/components/upload/upload'
import { useUploadContext } from '@Pimcore/modules/element/upload/upload-provider'
import { useFileUploader } from '@Pimcore/modules/element/upload/hook/use-file-uploader'

export interface UploadChangeParam<T = UploadFile> extends AntUploadChangeParam<T> {
  promise: Promise<number> | undefined
  promiseResolve: (value: number | PromiseLike<number>) => void
}

export interface ZipUploadProps extends Omit<AntUploadProps, 'beforeUpload'> {
  onChange?: (info: UploadChangeParam) => void
}

type PromiseType = Pick<UploadChangeParam, 'promise' | 'promiseResolve'>
type PromiseHolder = Record<string, Pick<UploadChangeParam, 'promise' | 'promiseResolve'>>

export const ZipUpload = (props: ZipUploadProps): React.JSX.Element => {
  const [promiseCollection, setPromiseCollection] = useState<PromiseHolder>({})
  const { fileList, uploadingNode, setUploadContext } = useUploadContext()
  const { uploadZip: uploadZipProcessor } = useFileUploader({ nodeId: uploadingNode! })

  const mergedProps: ZipUploadProps = {
    action: `/pimcore-studio/api/assets/add-zip/${uploadingNode}`,
    accept: '.zip, .rar, .7zip',
    name: 'zipFile',
    multiple: false,
    showUploadList: false,
    fileList,
    onChange: (onChangeProps) => {
      setUploadContext(
        'zip',
        onChangeProps.fileList
      )
      void uploadZipProcessor(onChangeProps)
    },
    ...props
  }

  return (
    <Upload
      { ...mergedProps }
      onChange={ (changeProps) => {
        let promiseTmpHolder: PromiseType | undefined = promiseCollection[changeProps.file.uid]
        if (promiseTmpHolder === undefined) {
          let freshResolve: UploadChangeParam['promiseResolve'] = () => {}
          const freshPromise: Promise<number> | undefined = new Promise(resolve => {
            freshResolve = resolve
          })

          promiseTmpHolder = { promise: freshPromise, promiseResolve: freshResolve }
        }

        if (mergedProps.onChange !== undefined) {
          mergedProps.onChange({ ...changeProps, ...promiseTmpHolder })
        }

        setPromiseCollection({ ...promiseCollection, [changeProps.file.uid]: promiseTmpHolder })
      } }
    >
      {props.children}
    </Upload>
  )
}
