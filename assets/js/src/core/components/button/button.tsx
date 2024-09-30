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
import { useStyles } from './button.styles'
import { Spin } from '../spin/spin'

export interface ButtonProps extends AntdButtonProps {
  loading?: boolean
};

const Component = ({ loading, children, className, ...props }: ButtonProps, ref: RefObject<HTMLButtonElement | null>): React.JSX.Element => {
  const { styles } = useStyles()
  const buttonRef = useRef<HTMLButtonElement>(null)

  useImperativeHandle(ref, () => buttonRef.current)

  const classes = [
    styles.button,
    className,
    'button'
  ]

  if (loading === true) {
    classes.push('ant-btn-loading')
  }

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
      className={ classes.join(' ') }
      ref={ buttonRef }
      { ...props }
    >
      <AnimatePresence>
        <motion.div
          animate={ { opacity: 1 } }
          exit={ { opacity: 0 } }
          initial={ { opacity: loading === true ? 0 : 1 } }
          key={ loading === true ? 'loading' : 'loaded' }
        >
          {loading === true && (
            <Spin
              className='button__loading-spinner'
              size='small'
              spinning={ loading }
            />
          )}

          {loading !== true && children}
        </motion.div>
      </AnimatePresence>
    </AntdButton>
  )
}

export const Button = React.forwardRef(Component)
