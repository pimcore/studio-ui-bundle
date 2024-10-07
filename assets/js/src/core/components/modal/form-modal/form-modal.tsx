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

import React from 'react'
import { Form, type FormInstance, Modal, Space } from 'antd'
import { ModalTitle } from '@Pimcore/components/modal/modal-title/modal-title'
import { useForm } from 'antd/es/form/Form'
import { useStyle } from './form-modal.styles'
import { type Store } from 'antd/es/form/interface'
import type { ModalProps as AntModalProps } from 'antd/es/modal/interface'

export type FormModalProps = AntModalProps & {
  title?: string
  label?: string
  initialValues?: Store
  icon?: string
  onSubmit?: (form: FormInstance<any>) => void
}

export const FormModal = (props: FormModalProps): React.JSX.Element => {
  const { styles } = useStyle()
  const [form] = useForm()
  const {
    title,
    icon,
    open = false,
    ...inlineProps
  } = props

  return (
    <Modal
      { ...inlineProps }
      className={ styles.formModal }
      onOk={ (onOkProps) => {
        if (props.onOk !== undefined) {
          props.onOk(onOkProps)
        }

        if (props.onSubmit !== undefined) {
          props.onSubmit(form)
        }
      } }
      open={ open }
      title={ (
        <ModalTitle iconName={ icon }>
          { title }
        </ModalTitle>
      ) }
    >
      <Space
        size={ 10 }
        style={ { paddingTop: 10 } }
      >
        <Form
          className={ 'w-full' }
          form={ form }
          initialValues={ props.initialValues }
          layout='vertical'
        >
          {props.children}
        </Form>
      </Space>
    </Modal>
  )
}
