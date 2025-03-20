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

import type { UploadFile } from 'antd/es/upload/interface'
import { useUploadContext } from '@Pimcore/modules/element/upload/upload-provider'
import { useJobs } from '@Pimcore/modules/execution-engine/hooks/useJobs'
import { createJob } from '@Pimcore/modules/execution-engine/jobs/zip-upload/factory'
import { defaultTopics, topics } from '@Pimcore/modules/execution-engine/topics'
import { type UploadChangeParam } from '@Pimcore/components/upload/zip-upload'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'

interface UseFileUploaderProps {
  nodeId?: string
}

interface UseFileUploaderReturn {
  uploadZip: (props: UploadChangeParam<UploadFile<any>>) => Promise<void>
}

let zipUploadFirstRun: string[] = []

export const useFileUploader = ({ nodeId }: UseFileUploaderProps): UseFileUploaderReturn => {
  const { addJob } = useJobs()
  const { uploadingNode } = useUploadContext()

  const uploadZip = async (props: UploadChangeParam<UploadFile<any>>): Promise<void> => {
    if (nodeId === undefined) {
      trackError(new GeneralError('Parent ID is required'))
    }

    if (!zipUploadFirstRun.includes(props.file.uid)) {
      zipUploadFirstRun = [...zipUploadFirstRun, props.file.uid]
      addJob(createJob({
        title: 'Upload Zip',
        topics: [topics['zip-upload-finished'], topics['asset-upload-finished'], ...defaultTopics],
        action: async () => {
          return await props.promise!
        },
        parentFolder: uploadingNode!
      }))
    }

    if (props.file.response !== undefined) {
      props.promiseResolve(props.file.response.jobRunId as number)
    }
  }

  return { uploadZip }
}
