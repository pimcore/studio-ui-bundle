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
import { Select } from '@Pimcore/components/select/select'
import { Card } from '@Pimcore/components/card/card'
import { type ITabsProps, Tabs } from '@Pimcore/components/tabs/tabs'
import {
  ManyToOneRelation
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/many-to-one-relation/many-to-one-relation'
import {
  convertFromInternalLinkValue,
  convertToInternalLinkValue, type InternalLinkValue
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/link/utils/link-value-converter'

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
  const emptyLinkValue: LinkValue = { linktype: 'direct', text: '', path: '', target: '', parameters: '', anchor: '', title: '', accesskey: '', rel: '', tabindex: '', class: '' }
  const [value, setValue] = useState<LinkValue>(props.value ?? { ...emptyLinkValue })

  useEffect(() => {
    form.setFieldsValue(convertToInternalLinkValue(value))
  }, [value])

  const handleValuesChange = (changedValues: any, allValues: InternalLinkValue): void => {
    setValue(convertFromInternalLinkValue(allValues))
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
    const newValue = props.value ?? { ...emptyLinkValue }
    setValue(newValue)
  }

  const tabItems: ITabsProps['items'] = [
    {
      key: 'basic',
      label: t('link.tab.basic'),
      forceRender: true,
      children: (
        <Space
          className='w-full'
          direction='vertical'
          size='small'
        >
          <FormItem
            label={ t('link.text') }
            name="text"
          >
            <Input disabled={ props.disabled } />
          </FormItem>
          <FormItem
            label={ t('link.path') }
            name="path"
          >
            <ManyToOneRelation
              allowPathTextInput
              assetsAllowed
              dataObjectsAllowed
              disabled={ props.disabled }
              documentsAllowed
            />
          </FormItem>

          <Card
            theme="card-with-highlight"
            title={ t('link.properties') }
          >
            <Space
              className='w-full'
              direction='vertical'
              size='small'
            >
              <FormItem
                label={ t('link.target') }
                name="target"
              >
                <Select
                  allowClear
                  disabled={ props.disabled }
                  options={ [
                    { label: '_blank', value: '_blank' },
                    { label: '_self', value: '_self' },
                    { label: '_top', value: '_top' },
                    { label: '_parent', value: '_parent' }
                  ] }
                />

              </FormItem>

              <FormItem
                label={ t('link.parameters') }
                name="parameters"
              >
                <Input disabled={ props.disabled } />
              </FormItem>

              <FormItem
                label={ t('link.anchor') }
                name="anchor"
              >
                <Input disabled={ props.disabled } />
              </FormItem>

              <FormItem
                label={ t('link.title') }
                name="title"
              >
                <Input disabled={ props.disabled } />
              </FormItem>
            </Space>
          </Card>
        </Space>
      )
    },
    {
      key: 'advanced',
      label: t('link.tab.advanced'),
      forceRender: true,
      children: (
        <Space
          className='w-full'
          direction='vertical'
          size='small'
        >
          <FormItem
            label={ t('link.accesskey') }
            name="accesskey"
          >
            <Input disabled={ props.disabled } />
          </FormItem>
          <FormItem
            label={ t('link.rel') }
            name="rel"
          >
            <Input disabled={ props.disabled } />
          </FormItem>
          <FormItem
            label={ t('link.tabindex') }
            name="tabindex"
          >
            <Input disabled={ props.disabled } />
          </FormItem>
          <FormItem
            label={ t('link.class') }
            name="class"
          >
            <Input disabled={ props.disabled } />
          </FormItem>
        </Space>
      )
    }
  ]

  return (
    <WindowModal
      footer={ props.disabled === true ? <span></span> : undefined }
      okText={ t('save') }
      onCancel={ handleCancel }
      onOk={ handleOk }
      open={ props.open }
      size="M"
      title={ t('link.edit-title') }
    >
      <Form
        form={ form }
        layout="vertical"
        onValuesChange={ handleValuesChange }
      >
        <Tabs
          items={ tabItems }
          noPadding
          size='small'
        />
      </Form>
    </WindowModal>
  )
}
