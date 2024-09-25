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

import type { UploadChangeParam } from 'antd/lib/upload'
import type { UploadFile } from 'antd/es/upload/interface'
import { api as assetApi } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { useAppDispatch } from '@Pimcore/app/store'
import { useContext } from 'react'
import { UploadContext } from '@Pimcore/modules/element/upload/upload-provider'
import { useJobs } from '@Pimcore/modules/execution-engine/hooks/useJobs'
import { createJob } from '@Pimcore/modules/execution-engine/jobs/zip-upload/factory'
import { defaultTopics, topics } from '@Pimcore/modules/execution-engine/topics'

interface UseFileUploaderProps {
  parentId?: string
}

interface UseFileUploaderReturn {
  uploadFile: (props: UploadChangeParam<UploadFile<any>>) => Promise<void>
  uploadZip: (props: UploadChangeParam<UploadFile<any>>) => Promise<void>
}

let zipUploadFirstRun: string[] = []

export const UseFileUploader = ({ parentId }: UseFileUploaderProps): UseFileUploaderReturn => {
  const { addJob } = useJobs()
  const dispatch = useAppDispatch()
  const uploadContext = useContext(UploadContext)!
  let promiseResolve: (value: number | PromiseLike<number>) => void = () => {}
  const promise: Promise<number> | undefined = new Promise(resolve => {
    promiseResolve = resolve
  })

  const uploadFile = async ({ fileList, file }: UploadChangeParam<UploadFile<any>>): Promise<void> => {
    if (parentId === undefined) {
      throw new Error('Parent ID is required')
    }

    const fileStates = fileList.map((file) => file.status)
    const allFullFilled = fileStates.every(item => item === 'done')

    uploadContext.setUploadFileList(fileList)
    uploadContext.setUploadingNode(parentId)

    if (allFullFilled) {
      dispatch(assetApi.util.invalidateTags(invalidatingTags.ASSET_TREE_ID(parseInt(parentId))))
      uploadContext.setUploadFileList([])
      uploadContext.setUploadingNode(null)
    }
  }

  const uploadZip = async (props: UploadChangeParam<UploadFile<any>>): Promise<void> => {
    if (!zipUploadFirstRun.includes(props.file.uid)) {
      console.log('uuid', props.file.uid)
      zipUploadFirstRun = [...zipUploadFirstRun, props.file.uid]
      addJob(createJob({
        title: 'Upload Zip',
        topics: [topics['asset-upload-finished'], ...defaultTopics],
        action: async () => {
          return await promise
        },
        parentFolder: uploadContext.uploadingNode!
      }))
    }

    await uploadFile(props)

    const fileStates = props.fileList.map((file) => file.status)
    const allFullFilled = fileStates.every(item => item === 'done')

    if (allFullFilled) {
      if (props.file.response !== undefined) {
        promiseResolve(props.file.response.id as number)
      }

      // setZipUploadFirstRun(
      //  zipUploadFirstRun.filter((item) => item !== props.file.uid)
      // )
    }
  }

  return { uploadFile, uploadZip }
}
