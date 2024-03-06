import { Modal as AntModal, type ModalProps as AntModalProps } from 'antd'
import React from 'react'
import { useStyle } from '@Pimcore/components/modal/modal.styles'
import type useModal from 'antd/es/modal/useModal'

export interface ModalProps extends AntModalProps {
  icon?: React.JSX.Element
  footer?: React.JSX.Element
  useModal?: typeof useModal
  children: React.ReactNode
}

export const Modal = (props: ModalProps): React.JSX.Element => {
  const { styles } = useStyle()
  const { children } = props

  return (
        <AntModal
            title={(
                <>
                    {props.icon}
                    <span>{props.title}</span>
                </>
            )}
            className={styles.modal}
            footer={props.footer}
            open={props.open}
            onCancel={props.onCancel}
            onOk={props.onOk}
        >
            {children}
        </AntModal>
  )
}
