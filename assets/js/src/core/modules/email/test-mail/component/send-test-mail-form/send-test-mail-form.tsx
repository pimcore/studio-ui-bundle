/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Form } from '@Pimcore/components/form/form'
import { Input } from '@Pimcore/components/input/input'
import { Modal } from '@Pimcore/components/modal/modal'
import { ModalTitle } from '@Pimcore/components/modal/modal-title/modal-title'
import { Select } from '@Pimcore/components/select/select'
import { TextArea } from '@Pimcore/components/textarea/textarea'
import { useMessage } from '@Pimcore/components/message/useMessage'
import { useEmailSendTestMutation } from '@Pimcore/modules/email/emails-api-slice.gen'
import { useForm } from 'antd/es/form/Form'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { App } from 'antd'
import { getLanguageExtensions, useStudioModal } from '@sdk/components'
import ReactCodeMirror from '@uiw/react-codemirror'
import { ManyToOneRelation } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-one-relation/many-to-one-relation'
import { ParametersTable } from '../parameters-table/parameters-table'

export interface TestEmailFormValues {
  from: string
  to: string
  subject: string
  contentType: 'text' | 'html'
  content: string
}

export interface TestEmailModalProps {
  initalValues?: TestEmailFormValues
  onFinish?: (values: TestEmailFormValues) => Promise<void>
}

enum TestEmilType {
  Document = 'document',
  HTML = 'html',
  Text = 'text'
}

export const SendTestMailForm = ({ initalValues }: TestEmailModalProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [form] = useForm()

  const handleFormFinish = async (values: TestEmailFormValues): Promise<void> => {
    console.log(values)
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFormFinish}
      initialValues={initalValues}
    >
      <Form.Item
        label={t('test-email.form.from')}
        name="from"
        rules={[
          { required: true, message: t('email.test.validation.from.required') },
          { type: 'email', message: t('email.test.validation.from.email') }
        ]}
      >
        <Input type="email" />
      </Form.Item>

      <Form.Item
        label={t('test-email.form.to')}
        name="to"
        rules={[
          { required: true, message: t('email.test.validation.to.required') },
          { type: 'email', message: t('email.test.validation.to.email') }
        ]}
      >
        <Input type="email" />
      </Form.Item>

      <Form.Item
        label={t('test-email.form.type')}
        name="type"
        initialValue={TestEmilType.Text}
      >
        <Select
          options={[
            {
              label: t(`test-email.type.${TestEmilType.Document}`),
              value: TestEmilType.Document
            },
            {
              label: t(`test-email.type.${TestEmilType.HTML}`),
              value: TestEmilType.HTML
            },
            {
              label: t(`test-email.type.${TestEmilType.Text}`),
              value: TestEmilType.Text
            }
          ]}
        />
      </Form.Item>

      <Form.Item dependencies={['type']} noStyle>
        {({ getFieldValue }) => {
          const typeValue = getFieldValue('type')
          return typeValue === TestEmilType.Document ? (
            <>
              <Form.Item
                label={t('test-email.form.document')}
                name="content"
                rules={[
                  { required: true, message: t('email.test.validation.content.required') }
                ]}
              >
                <ManyToOneRelation
                  allowToClearRelation
                  documentsAllowed
                />
              </Form.Item>

              <Form.Item
                label={t('test-email.form.parameters')}
                name="content"
                rules={[
                  { required: true, message: t('email.test.validation.content.required') }
                ]}
              >
                <ParametersTable />
              </Form.Item>
            </>
          ) : (
            <Form.Item
              label={t('test-email.form.message')}
              name="content"
              rules={[
                { required: true, message: t('email.test.validation.content.required') }
              ]}
            >
              <ReactCodeMirror
                minHeight='200px'
                basicSetup={{
                  lineNumbers: true,
                  syntaxHighlighting: true,
                  searchKeymap: true
                }}
                extensions={getLanguageExtensions('html')}
              />
            </Form.Item>
          )
        }}
      </Form.Item>
    </Form>
  )
}