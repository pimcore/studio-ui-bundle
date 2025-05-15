/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { useStyle } from '@Pimcore/components/modal/footer/modal-footer.styles'
import { Flex, type FlexProps } from '@Pimcore/components/flex/flex'

interface IModalFooterProps extends FlexProps {
  children: React.ReactNode
  divider?: boolean
}

export const ModalFooter = ({ justify = 'flex-end', divider = false, ...props }: IModalFooterProps): React.JSX.Element => {
  const { styles } = useStyle()
  const { children, ...inlineProps } = props

  const classes = [`ant-modal-footer-container ${styles.footer}`].filter(Boolean)

  if (divider) {
    classes.push('--divider')
  }

  return (
    <Flex
      align={ 'center' }
      className={ classes.join(' ') }
      gap={ 'extra-small' }
      justify={ justify }
      { ...inlineProps }
    >
      {children}
    </Flex>
  )
}
