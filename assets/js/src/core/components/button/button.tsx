/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type RefObject, useLayoutEffect, useImperativeHandle, useRef } from 'react'
import { Button as AntdButton, type ButtonProps as AntdButtonProps } from 'antd'
import { AnimatePresence, motion } from 'framer-motion'
import { motionDuration } from '@Pimcore/utils/motion'
import cn from 'classnames'
import { Spin } from '../spin/spin'
import { useStyles } from './button.styles'

export interface ButtonProps extends Omit<AntdButtonProps, 'type' | 'color'> {
  type?: AntdButtonProps['type'] | 'action'
  loading?: boolean
  /** Briefly confirms a finished action: the label makes room for a check mark that is drawn in. */
  success?: boolean
  color?: 'default' | 'primary' | 'secondary' | 'danger'
}

const successMarkTransition = {
  duration: motionDuration.draw / 1000,
  ease: [0, 0, 0.2, 1],
  delay: motionDuration.enter / 3 / 1000
}

const Component = ({ loading, success, children, className, type, color, ...props }: ButtonProps, ref: RefObject<HTMLButtonElement | null>): React.JSX.Element => {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const { styles } = useStyles()

  useImperativeHandle(ref, () => buttonRef.current)

  const buttonClassNames = cn(
    'button',
    `button--type-${type}`,
    `button--color-${color}`,
    styles.button,
    {
      'ant-btn-loading': loading
    },
    className
  )

  // Track the button's natural size so it can be locked when loading starts.
  const naturalSize = useRef<{ width: number, height: number } | null>(null)

  useLayoutEffect(() => {
    if (loading !== true && buttonRef.current !== null) {
      const { width, height } = buttonRef.current.getBoundingClientRect()
      if (width > 0 && height > 0) {
        naturalSize.current = { width, height }
      }
    }
  })

  useLayoutEffect(() => {
    if (loading === true && buttonRef.current !== null && naturalSize.current !== null) {
      buttonRef.current.style.width = naturalSize.current.width + 'px'
      buttonRef.current.style.height = naturalSize.current.height + 'px'
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
      color={ color === 'secondary' ? undefined : color }
    >
      { loading === true
        ? (
          <AnimatePresence>
            <motion.div
              animate={ { opacity: 1 } }
              className='button__loading-spinner'
              exit={ { opacity: 0 } }
              initial={ { opacity: 0 } }
              key={ 'loading' }
            >
              <Spin
                size='small'
                spinning
              />
            </motion.div>
          </AnimatePresence>
          )
        : null }

      <AnimatePresence>
        { success === true && loading !== true && (
          <motion.span
            animate={ { opacity: 1 } }
            className='button__success-mark'
            exit={ { opacity: 0 } }
            initial={ { opacity: 0 } }
            key='success'
            transition={ { duration: motionDuration.enter / 1000 } }
          >
            <svg
              aria-hidden
              fill='none'
              height={ 16 }
              viewBox='0 0 16 16'
              width={ 16 }
            >
              <motion.path
                animate={ { pathLength: 1 } }
                d='M3.6 8.4 6.6 11.3 12.4 5.2'
                initial={ { pathLength: 0 } }
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={ 1.6 }
                transition={ successMarkTransition }
              />
            </svg>
          </motion.span>
        ) }
      </AnimatePresence>

      <span className={ 'button__text' }>{children}</span>
    </AntdButton>
  )
}

export const Button = React.forwardRef(Component)
