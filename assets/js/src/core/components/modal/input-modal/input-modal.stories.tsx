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
import {useInputModal} from "@Pimcore/components/modal/input-modal/hooks/use-input-modal";
import {FormInstance} from "antd";

const config: Meta = {
  title: 'Components/Data Entry/Input Modal',
  component: (args) => {
    const [value, setValue] = useState<string>('')
    const callback = (form: FormInstance<any>) => {
      if(form.getFieldValue(args.type)) {
        setValue(form.getFieldValue(args.type))
      }
    }

    const { renderModal: RenderModal, showModal } = useInputModal({
      type: args.type,
      submitCallback: callback
    })

    return (
      <>
        <Button onClick={ showModal }>Open modal</Button>
        <RenderModal
          title={ args.title }
          label={ args.label }
          initialValues={args.initialValues ?? {}}
        />

        <p>Form Value: {value}</p>
      </>
    )
  },
  argTypes: {
    type: {
      options: ['input'],
      control: { type: 'select' }
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

export const WithInitialValue = {
  args: {
    type: 'input',
    title: 'Rename',
    label: 'Please enter the new name',
    initialValues: {
      input: 'initial value'
    }
  }
}
