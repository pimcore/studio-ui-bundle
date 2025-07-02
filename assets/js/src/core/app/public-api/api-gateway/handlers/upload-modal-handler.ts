import { type ApiGatewayHandler } from '../registry/handler-registry'
import { type ModalUploadProps } from '@Pimcore/components/modal-upload/modal-upload'

export const openUploadModalHandler: ApiGatewayHandler = (payload, context) => {
  const uploadProps: ModalUploadProps = payload
  const { uploadModalContext } = context
  
  uploadModalContext.triggerUpload(uploadProps)
}