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

import React, { useState, type ReactNode, forwardRef, useImperativeHandle } from 'react'
import { Popconfirm } from 'antd'

export interface ReloadPopconfirmProps {
  title: ReactNode
  children?: ReactNode
  onReload: () => void
  hasDataChanged: () => boolean
  onCancel?: () => void
}

export interface ReloadPopconfirmHandle {
  refresh: () => void
}

const ReloadPopconfirm = forwardRef<ReloadPopconfirmHandle, ReloadPopconfirmProps>((props, ref) => {
  const [popConfirmOpen, setPopConfirmOpen] = useState<boolean>(false)

  // Expose open function to parent via ref
  useImperativeHandle(ref, () => ({
    refresh: () => {
      if (props.hasDataChanged()) {
        setPopConfirmOpen(true)
      } else {
        props.onReload()
      }
    }
  }))

  const onOpenChange = (newOpen: boolean): void => {
    if (!newOpen) {
      setPopConfirmOpen(false)
      return
    }

    if (props.hasDataChanged()) {
      setPopConfirmOpen(true)
    } else {
      props.onReload()
    }
  }

  const onConfirm = (): void => {
    setPopConfirmOpen(false)
    props.onReload()
  }

  const onCancel = (): void => {
    setPopConfirmOpen(false)
    props.onCancel?.()
  }

  return (
    <Popconfirm
      key="reload"
      onCancel={ onCancel }
      onConfirm={ onConfirm }
      onOpenChange={ onOpenChange }
      open={ popConfirmOpen }
      title={ props.title }
    >
      {props.children}
    </Popconfirm>
  )
})

ReloadPopconfirm.displayName = 'ReloadPopconfirm'

export { ReloadPopconfirm }
