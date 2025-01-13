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

import React, { useState } from 'react'
import type { Meta } from '@storybook/react'
import { Button } from '@Pimcore/components/button/button'
import { useFormModal } from './hooks/use-form-modal'

const FormModalComponent = (args: any): React.JSX.Element => {
  const modal = useFormModal()
  const [value, setValue] = useState('')
  const [confirmed, setConfirmed] = useState(false)

  const callbackManager = (): void => {
    switch (args.type) {
      case 'input':
        modal.input({
          title: args.title,
          label: args.label,
          rule: args.rule,
          initialValue: args.initialValue,
          onOk: (value: string) => {
            setValue(value ?? 'n/a')
          }
        })
        break
      case 'confirmation':
        modal.confirm({
          title: args.title,
          content: args.content,
          onOk: () => {
            setConfirmed(true)
          },
          onCancel: () => {
            setConfirmed(false)
          }
        })
        break
    }
  }

  return (
    <>
      <Button onClick={ callbackManager }>Open modal</Button>

      {args.type === 'input' && (
        <p>Form Value: {value}</p>
      )}

      {args.type === 'confirmation' && (
        <p>Confirmed: {confirmed ? 'yes' : 'no'}</p>
      )}
    </>
  )
}

const config: Meta = {
  title: 'Components/Data Entry/Input Modal',
  component: FormModalComponent,
  argTypes: {
    type: {
      table: {
        disable: true
      }
    }
  },
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

export const Input = {
  args: {
    type: 'input',
    rule: {
      required: true,
      message: 'Please enter a value'
    },
    title: 'Rename',
    label: 'Please enter the new name'
  }
}

export const InputWithInitialValue = {
  args: {
    type: 'input',
    title: 'Rename',
    label: 'Please enter the new name',
    initialValue: 'initial value'
  }
}

export const Confirmation = {
  args: {
    type: 'confirmation',
    icon: 'warning-circle',
    title: 'Confirmation',
    content: 'Are you sure that you are sure?'
  }
}
