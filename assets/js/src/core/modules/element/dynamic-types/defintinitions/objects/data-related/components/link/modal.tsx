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

import React, { useEffect, useState } from 'react'
import { Form } from '@Pimcore/components/form/form'
import { Space } from '@Pimcore/components/space/space'
import FormItem from 'antd/es/form/FormItem'
import { Input } from '@Pimcore/components/input/input'
import { WindowModal } from '@Pimcore/components/modal/window-modal/window-modal'
import { useTranslation } from 'react-i18next'
import {
  type LinkValue
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/link/link'

export interface LinkModalProps {
  open: boolean
  disabled?: boolean
  value?: LinkValue | null
  onClose: () => void
  onSave: (value: LinkValue) => void
}

export const LinkModal = (props: LinkModalProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const emptyLinkValue: LinkValue = { text: '' }
  const [value, setValue] = useState<LinkValue>(props.value ?? { ...emptyLinkValue })

  useEffect(() => {
    form.setFieldsValue({
      text: value.text
    })
  }, [value])

  const handleValuesChange = (changedValues: any, allValues: LinkValue): void => {
    setValue(allValues)
  }

  useEffect(() => {
    setValue(props.value ?? { ...emptyLinkValue })
  }, [props.value])

  const handleOk = (): void => {
    props.onSave(value)
    props.onClose()
  }

  const handleCancel = (): void => {
    props.onClose()
  }

  return (
    <WindowModal
      footer={ props.disabled === true ? <span></span> : undefined }
      okText={ t('save') }
      onCancel={ handleCancel }
      onOk={ handleOk }
      open={ props.open }
      size="M"
      title={ t('link.settings') }
    >
      <Form
        form={ form }
        layout="vertical"
        onValuesChange={ handleValuesChange }
      >
        <Space
          className='w-full'
          direction='vertical'
          size='small'
        >
          <FormItem
            label={ t('link.text') }
            name="text"
          >
            <Input />
          </FormItem>
        </Space>
      </Form>
    </WindowModal>
  )
}
