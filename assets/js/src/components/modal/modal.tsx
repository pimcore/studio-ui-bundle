import { Modal as AntModal, type ModalProps as AntModalProps } from 'antd'
import React from 'react'
import { useStyle } from '@Pimcore/components/modal/modal.styles'
import type useModal from 'antd/es/modal/useModal'

export interface IModalProps extends AntModalProps {
  icon?: React.JSX.Element
  footer?: React.JSX.Element
  useModal?: typeof useModal
  children: React.ReactNode
}

export const Modal = (props: IModalProps): React.JSX.Element => {
  const { styles } = useStyle()
  const { children } = props

  return (
    <AntModal
      className={ styles.modal }
      footer={ props.footer }
      onCancel={ props.onCancel }
      onOk={ props.onOk }
      open={ props.open }
      title={ (
        <>
          {props.icon}
          <span>{props.title}</span>
        </>
      ) }
    >
      {children}
    </AntModal>
  )
}
