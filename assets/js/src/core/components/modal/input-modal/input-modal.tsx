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
import { useStyle } from './input-modal.styles'
import { type Store } from 'antd/es/form/interface'

export interface InputModalProps {
  title?: string
  label?: string
  open: boolean
  initialValues?: Store
  icon?: string
  children?: React.ReactNode
  onOk: (form: FormInstance<any>) => void
  onCancel: () => void
}

export const InputModal = (props: InputModalProps): React.JSX.Element => {
  const { styles } = useStyle()
  const [form] = useForm()
  const {
    title,
    icon,
    onOk,
    ...inlineProps
  } = props

  return (
    <Modal
      className={ styles.inputModal }
      onOk={ () => {
        props.onOk(form)
      } }
      title={ (
        <ModalTitle iconName={ icon }>
          { title }
        </ModalTitle>
      ) }
      { ...inlineProps }
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
