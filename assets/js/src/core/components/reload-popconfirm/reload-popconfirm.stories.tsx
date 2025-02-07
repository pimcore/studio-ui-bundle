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

import { type Meta, type StoryObj } from '@storybook/react'
import React, { useRef } from 'react'
import { ReloadPopconfirm, type ReloadPopconfirmHandle } from './reload-popconfirm'
import { Button } from 'antd'

const config: Meta<typeof ReloadPopconfirm> = {
  title: 'Components/Feedback/ReloadPopconfirm',
  component: ReloadPopconfirm,
  args: {
    title: 'Are you sure you want to reload?'
  }
}

export default config

export const _default: StoryObj<typeof ReloadPopconfirm> = {
  render: (args) => (
    <ReloadPopconfirm
      { ...args }
      hasDataChanged={ () => true }
      onReload={ () => { alert('Reloading automatically...') } }
    >
      <Button>Click me (auto-trigger)</Button>
    </ReloadPopconfirm>
  )
}

export const WithDataChange: StoryObj<typeof ReloadPopconfirm> = {
  render: (args): React.JSX.Element => {
    const popconfirmRef = useRef<ReloadPopconfirmHandle>(null)

    const triggerPopconfirm = (): void => {
      if (popconfirmRef.current !== null) {
        popconfirmRef.current.refresh()
      }
    }

    return (
      <div>
        <Button onClick={ triggerPopconfirm }>Trigger ReloadPopconfirm</Button>
        <ReloadPopconfirm
          ref={ popconfirmRef }
          { ...args }
          hasDataChanged={ () => true }
          onReload={ () => { alert('Reloading...') } }
        >
          <Button>Click me</Button>
        </ReloadPopconfirm>
      </div>
    )
  }
}

export const WithoutDataChange: StoryObj<typeof ReloadPopconfirm> = {
  render: (args): React.JSX.Element => {
    const popconfirmRef = useRef<ReloadPopconfirmHandle>(null)

    const triggerPopconfirm = (): void => {
      if (popconfirmRef.current !== null) {
        popconfirmRef.current.refresh()
      }
    }

    return (
      <div>
        <Button onClick={ triggerPopconfirm }>Trigger ReloadPopconfirm</Button>
        <ReloadPopconfirm
          ref={ popconfirmRef }
          { ...args }
          hasDataChanged={ () => false }
          onReload={ () => { alert('Reloading without confirmation...') } }
        >
          <Button>Click me</Button>
        </ReloadPopconfirm>
      </div>
    )
  }
}
