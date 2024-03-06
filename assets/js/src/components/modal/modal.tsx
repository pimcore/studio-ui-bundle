import { Modal as AntModal } from 'antd'
import React from 'react'
import type { ModalFuncProps } from 'antd/es/modal/interface'
import { useStyle } from '@Pimcore/components/modal/modal.styles'
import type useModal from 'antd/es/modal/useModal'

export interface ModalProps extends ModalFuncProps {
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
