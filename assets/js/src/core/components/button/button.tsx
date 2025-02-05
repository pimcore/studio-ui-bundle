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

import React, { type RefObject, useEffect, useImperativeHandle, useRef } from 'react'
import { Button as AntdButton, type ButtonProps as AntdButtonProps } from 'antd'
import { AnimatePresence, motion } from 'framer-motion'
import cn from 'classnames'
import { Spin } from '../spin/spin'
import { useStyles } from './button.styles'

export interface ButtonProps extends Omit<AntdButtonProps, 'type'> {
  type?: AntdButtonProps['type'] | 'action'
  loading?: boolean
}

const Component = ({ loading, children, className, type, ...props }: ButtonProps, ref: RefObject<HTMLButtonElement | null>): React.JSX.Element => {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const { styles } = useStyles()

  useImperativeHandle(ref, () => buttonRef.current)

  const buttonClassNames = cn(
    'button',
    `button--type-${type}`,
    styles.button,
    {
      'ant-btn-loading': loading
    },
    className
  )

  useEffect(() => {
    if (loading === true && buttonRef.current !== null) {
      buttonRef.current.style.width = buttonRef.current.getBoundingClientRect().width + 'px'
      buttonRef.current.style.height = buttonRef.current.getBoundingClientRect().height + 'px'
    }

    return () => {
      if (loading === true && buttonRef.current !== null) {
        buttonRef.current.style.width = ''
        buttonRef.current.style.height = ''
      }
    }
  }, [loading])

  return (
    <AntdButton
      className={ buttonClassNames }
      ref={ buttonRef }
      type={ type === 'action' ? undefined : type }
      { ...props }
    >
      { loading === true
        ? (
          <AnimatePresence>
            <motion.div
              animate={ { opacity: 1 } }
              exit={ { opacity: 0 } }
              initial={ { opacity: 0 } }
              key={ 'loading' }
            >
              <Spin
                className='button__loading-spinner'
                size='small'
                spinning
              />
            </motion.div>
          </AnimatePresence>
          )
        : children
        }
    </AntdButton>
  )
}

export const Button = React.forwardRef(Component)
