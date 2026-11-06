/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useRef } from 'react'
import type { RcFile } from 'antd/es/upload/interface'

type ShouldUploadFile = (file: RcFile) => boolean | Promise<boolean>

interface GatedBatch {
  batchUid: string
  uploadableFiles: Promise<RcFile[]>
}

interface UseUploadFileGateResult {
  /** Resolves to the files of the batch that `shouldUploadFile` lets through. */
  filterUploadableFiles: (files: RcFile[], shouldUploadFile: ShouldUploadFile) => Promise<RcFile[]>
}

export const useUploadFileGate = (): UseUploadFileGateResult => {
  const gatedBatchRef = useRef<GatedBatch | null>(null)

  const filterUploadableFiles = async (files: RcFile[], shouldUploadFile: ShouldUploadFile): Promise<RcFile[]> => {
    // Ant calls `beforeUpload` for every file of a batch at once; they all share one run.
    const batchUid = files[0].uid

    if (gatedBatchRef.current?.batchUid !== batchUid) {
      gatedBatchRef.current = {
        batchUid,
        uploadableFiles: (async () => {
          const uploadableFiles: RcFile[] = []

          // Sequential on purpose: prompts must not stack.
          for (const file of files) {
            if (await shouldUploadFile(file)) {
              uploadableFiles.push(file)
            }
          }

          return uploadableFiles
        })()
      }
    }

    return await gatedBatchRef.current.uploadableFiles
  }

  return { filterUploadableFiles }
}
