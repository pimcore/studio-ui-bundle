/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ModalFuncProps } from 'antd'
import { type Rule } from 'antd/lib/form'

export type ConfigUpdate = ModalFuncProps | ((prevConfig: ModalFuncProps) => ModalFuncProps)

export type InputFormModalProps = Omit<ModalFuncProps, 'content'> & {
  label?: string
  rule?: Rule
  initialValue?: string
  warningMessage?: string
}

export type TextareaFormModalProps = Omit<ModalFuncProps, 'content'> & {
  label?: string
  initialValue?: string
  placeholder?: string
}

export interface UploadFormModalProps extends Omit<InputFormModalProps, 'initialValues'> {
  accept?: string
}

export type ConfirmFormModalProps = ModalFuncProps & {
  dontAskAgainKey?: string
}

export interface UseFormModalHookResponse {
  input: (props: InputFormModalProps) => { destroy: () => void, update: (configUpdate: ConfigUpdate) => void }
  textarea: (props: TextareaFormModalProps) => { destroy: () => void, update: (configUpdate: ConfigUpdate) => void }
  confirm: (props: ConfirmFormModalProps) => { destroy: () => void, update: (configUpdate: ConfigUpdate) => void }
  upload: (props: UploadFormModalProps) => { destroy: () => void, update: (configUpdate: ConfigUpdate) => void }
}
