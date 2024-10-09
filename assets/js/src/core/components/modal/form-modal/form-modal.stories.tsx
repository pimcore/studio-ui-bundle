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
import type {Meta} from "@storybook/react";
import {Button} from "@Pimcore/components/button/button";
import React, {useState} from "react";
import {useFormModal} from "@Pimcore/components/modal/form-modal/hooks/use-form-modal";
import {FormInstance} from "antd";

const config: Meta = {
  title: 'Components/Data Entry/Input Modal',
  component: (args) => {
    const [value, setValue] = useState<string>('')
    const [confirmed, setConfirmed] = useState<boolean>(false)

    const callbackInput = (form: FormInstance<any>) => {
      if(form.getFieldValue(args.type)) {
        setValue(form.getFieldValue(args.type))
      }
    }
    const callbackConfirmation = () => {
      setConfirmed(true)
    }
    const callbackManager = (props: {form?: FormInstance<any>}) => {
      switch (args.type) {
        case 'input':
          callbackInput(props.form!)
          break
        case 'confirmation':
          callbackConfirmation()
          break
      }
    }

    const { renderModal: RenderModal, showModal } = useFormModal({
      type: args.type
    })

    return (
      <>
        <Button onClick={ showModal }>Open modal</Button>
        <RenderModal
          {...args}
          initialValues={args.initialValues ?? {}}
          onSubmit={callbackManager}
        />

        {args.type === 'input' && (
          <p>Form Value: {value}</p>
        )}

        {args.type === 'confirmation' && (
          <p>Confirmed: {confirmed ? 'yes' : 'no'}</p>
        )}
      </>
    )
  },
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
    title: 'Rename',
    label: 'Please enter the new name',
  }
}

export const InputWithInitialValue = {
  args: {
    icon: 'exclamation-circle-filled',
    type: 'input',
    title: 'Rename',
    label: 'Please enter the new name',
    initialValues: {
      input: 'initial value'
    }
  }
}

export const Confirmation = {
  args: {
    icon: 'exclamation-circle-filled',
    type: 'confirmation',
    title: 'Confirmation',
    text: 'Are you sure that you are sure?'
  }
}
