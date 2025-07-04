/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ModalUploadProps } from '@Pimcore/components/modal-upload/modal-upload'
import { useUploadModalContext } from '@Pimcore/components/modal-upload/provider/upload-modal-provider/use-upload-modal-context'
import { isPimcoreStudioApiAvailable, getPimcoreStudioApi } from '@Pimcore/app/public-api/helpers/api-helper'
import { isInIframe } from '@Pimcore/utils/iframe'

export interface UseUploadModalReturn {
  triggerUpload: (props: ModalUploadProps) => void
}

export interface UseUploadModalProps extends ModalUploadProps {}

export const useUploadModal = (props: UseUploadModalProps): UseUploadModalReturn => {
  const uploadModalContext = useUploadModalContext()

  const triggerUpload: UseUploadModalReturn['triggerUpload'] = (uploadProps) => {
    // Merge default props with runtime props
    const finalProps = { ...props, ...uploadProps }

    // Check if we're in an iframe and parent API is available
    if (isInIframe() && isPimcoreStudioApiAvailable()) {
      const { element } = getPimcoreStudioApi()
      element.openUploadModal(finalProps)
      return
    }

    // Fallback to local context
    uploadModalContext.triggerUpload(finalProps)
  }

  return {
    triggerUpload
  }
}
