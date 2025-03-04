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

import React, { useEffect } from 'react'
import { Form } from '@Pimcore/components/form/form'
import { Space } from '@Pimcore/components/space/space'
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
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { ButtonGroup } from '@Pimcore/components/button-group/button-group'
import { Flex } from '@Pimcore/components/flex/flex'

export interface LinkModalProps {
  open: boolean
  disabled?: boolean
  value?: LinkValue | null
  onClose: () => void
  onSave: (value: LinkValue) => void
  allowedTypes: string[]
  allowedTargets: string[]
  disabledFields: string[]
}

export const LinkModal = (props: LinkModalProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const emptyLinkValue: LinkValue = { linktype: 'direct', text: '', direct: '', fullPath: '', target: '', parameters: '', anchor: '', title: '', accesskey: '', rel: '', tabindex: '', class: '' }
  const { confirm } = useFormModal()

  useEffect(() => {
    form.setFieldsValue(convertToInternalLinkValue(props.value ?? emptyLinkValue))
  }, [props.value])

  const handleOk = (): void => {
    const values: InternalLinkValue = form.getFieldsValue()
    const newValue = convertFromInternalLinkValue(values)
    props.onSave(newValue)
    props.onClose()
  }

  const handleCancel = (): void => {
    props.onClose()
    const newValue = props.value ?? { ...emptyLinkValue }
    form.setFieldsValue(convertToInternalLinkValue(newValue))
  }

  const emptyValue = (): void => {
    const newValue = { ...emptyLinkValue }
    form.setFieldsValue(convertToInternalLinkValue(newValue))
    props.onSave(newValue)
    props.onClose()
  }

  const isTypeAllowed = (type: string): boolean => {
    if (props.allowedTypes.length === 0) {
      return true
    }
    return props.allowedTypes.includes(type)
  }

  const getTargetOptions = (): Array<{ value: string, label: string }> => {
    const allowedTargets = props.allowedTargets.length > 0 ? props.allowedTargets : ['_blank', '_self', '_top', '_parent']
    return allowedTargets.map(target => (
      {
        value: target,
        label: target
      }
    ))
  }

  const basicTab = {
    key: 'basic',
    label: t('link.tab.basic'),
    forceRender: true,
    children: (
      <Space
        className='w-full'
        direction='vertical'
        size='small'
      >
        { !props.disabledFields.includes('text') && (
          <Form.Item
            label={ t('link.text') }
            name="text"
          >
            <Input disabled={ props.disabled } />
          </Form.Item>
        ) }

        <Form.Item
          label={ t('link.path') }
          name="path"
        >
          <ManyToOneRelation
            allowPathTextInput
            assetsAllowed={ isTypeAllowed('asset') }
            dataObjectsAllowed={ isTypeAllowed('object') }
            disabled={ props.disabled }
            documentsAllowed={ isTypeAllowed('document') }
          />
        </Form.Item>
        { !['target', 'parameters', 'anchor', 'title'].every(field => props.disabledFields.includes(field)) && (
          <Card
            theme="card-with-highlight"
            title={ t('link.properties') }
          >
            <Space
              className='w-full'
              direction='vertical'
              size='small'
            >
              { !props.disabledFields.includes('target') && (
                <Form.Item
                  label={ t('link.target') }
                  name="target"
                >
                  <Select
                    allowClear
                    disabled={ props.disabled }
                    options={ getTargetOptions() }
                  />
                </Form.Item>
              ) }

              { !props.disabledFields.includes('parameters') && (
                <Form.Item
                  label={ t('link.parameters') }
                  name="parameters"
                >
                  <Input disabled={ props.disabled } />
                </Form.Item>
              ) }

              { !props.disabledFields.includes('anchor') && (
                <Form.Item
                  label={ t('link.anchor') }
                  name="anchor"
                >
                  <Input disabled={ props.disabled } />
                </Form.Item>
              ) }

              { !props.disabledFields.includes('title') && (
                <Form.Item
                  label={ t('link.title') }
                  name="title"
                >
                  <Input disabled={ props.disabled } />
                </Form.Item>
              ) }
            </Space>
          </Card>
        ) }
      </Space>
    )
  }

  const advancedTab = {
    key: 'advanced',
    label: t('link.tab.advanced'),
    forceRender: true,
    children: (
      <Space
        className='w-full'
        direction='vertical'
        size='small'
      >
        { !props.disabledFields.includes('accesskey') && (
          <Form.Item
            label={ t('link.accesskey') }
            name="accesskey"
          >
            <Input disabled={ props.disabled } />
          </Form.Item>
        ) }

        { !props.disabledFields.includes('rel') && (
          <Form.Item
            label={ t('link.rel') }
            name="rel"
          >
            <Input disabled={ props.disabled } />
          </Form.Item>
        ) }

        { !props.disabledFields.includes('tabindex') && (
          <Form.Item
            label={ t('link.tabindex') }
            name="tabindex"
          >
            <Input disabled={ props.disabled } />
          </Form.Item>
        ) }

        { !props.disabledFields.includes('class') && (
          <Form.Item
            label={ t('link.class') }
            name="class"
          >
            <Input disabled={ props.disabled } />
          </Form.Item>
        ) }
      </Space>
    )
  }

  const tabItems: ITabsProps['items'] = [
    basicTab
  ]

  if (!['accesskey', 'rel', 'tabindex', 'class'].every(field => props.disabledFields.includes(field))) {
    tabItems.push(advancedTab)
  }

  return (
    <WindowModal
      footer={ props.disabled === true
        ? <span></span>
        : (_, { OkBtn, CancelBtn }) => (
          <Flex
            className="w-100"
            justify="flex-end"
          >
            <ButtonGroup items={ [
              <IconTextButton
                icon={ { value: 'trash' } }
                key="empty"
                onClick={ () => confirm({
                  title: t('empty'),
                  content: t('empty.confirm'),
                  onOk: emptyValue
                }) }
              >
                {t('empty')}
              </IconTextButton>,
              <CancelBtn key="cancel" />,
              <OkBtn key="ok" />
            ] }
            />
          </Flex>
          ) }
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
