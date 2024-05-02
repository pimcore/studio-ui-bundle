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
