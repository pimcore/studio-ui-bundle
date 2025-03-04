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
import { ModalTitle } from '@Pimcore/components/modal/modal-title/modal-title'

type ModalSize = 'M' | 'L' | 'XL'

export interface IModalProps extends AntModalProps {
  icon?: React.JSX.Element
  iconName?: string
  size?: ModalSize
  className?: string
  useModal?: typeof useModal
  children: React.ReactNode
}

export const Modal = ({ iconName, size = 'M', className, title, children, ...props }: IModalProps): React.JSX.Element => {
  const { styles } = useStyle()

  const classes = [styles.modal, className].filter(Boolean)

  const sizeBasedWidth = {
    XL: 'max(1200px, 85%)',
    L: 700,
    M: 530
  }[size]

  return (
    <AntModal
      className={ classes.join(' ') }
      title={ (
        <ModalTitle iconName={ iconName }>{title}</ModalTitle>
        ) }
      width={ sizeBasedWidth }
      { ...props }
    >
      {children}
    </AntModal>
  )
}
