/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { CodeEditor } from '@Pimcore/components/code-editor/code-editor'
import { Form } from '@Pimcore/components/form/form'
import { Input } from '@Pimcore/components/input/input'
import { Select } from '@Pimcore/components/select/select'
import { ManyToOneRelation } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-one-relation/many-to-one-relation'
import { type SendEmailParameters } from '@Pimcore/modules/email/emails-api-slice-enhanced'
import { getLanguageExtensions, TextArea } from '@sdk/components'
import { type FormInstance } from 'antd/lib'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ParametersTable } from '../parameters-table/parameters-table'

export interface TestEmailModalProps {
  initialValues?: Partial<SendEmailParameters>
  form: FormInstance<SendEmailParameters>
}

enum TestEmailType {
  Document = 'document',
  HTML = 'html',
  Text = 'text'
}

export const SendTestMailForm = ({ initialValues, form }: TestEmailModalProps): React.JSX.Element => {
  const { t } = useTranslation()

  const getVariableFormFields = (type: TestEmailType): React.JSX.Element => {
    switch (type) {
      case TestEmailType.Document:
        return (
          <>
            <Form.Item
              label={t('test-email.form.document')}
              name="documentPath"
              rules={[
                { required: true, message: t('test-email.validation.documentPath.required') }
              ]}
            >
              <ManyToOneRelation
                allowToClearRelation
                allowedDocumentTypes={['email']}
                documentsAllowed
              />
            </Form.Item>

            <Form.Item
              name="documentParameters"
            >
              <ParametersTable form={form} />
            </Form.Item>
          </>
        )
      case TestEmailType.HTML:
        return (
          <Form.Item
            label={t('test-email.form.message')}
            name="content"
            rules={[
              { required: true, message: t('test-email.validation.content.required') }
            ]}
          >
            <CodeEditor
              basicSetup={{
                lineNumbers: true,
                syntaxHighlighting: true,
                searchKeymap: true
              }}
              extensions={getLanguageExtensions('html')}
              minHeight='200px'
            />
          </Form.Item>
        )
      case TestEmailType.Text:
        return (
          <Form.Item
            label={t('test-email.form.message')}
            name="content"
            rules={[
              { required: true, message: t('test-email.validation.content.required') }
            ]}
          >
            <TextArea
              autoSize={{ minRows: 10 }}
            />
          </Form.Item>
        )
    }
  }

  return (
    <Form
      form={form}
      initialValues={initialValues}
      layout="vertical"
    >
      <Form.Item
        label={t('test-email.form.from')}
        name="from"
        rules={[
          { required: true, message: t('test-email.validation.from.required') },
          { type: 'email', message: t('test-email.validation.from.email.type') }
        ]}
      >
        <Input type="email" />
      </Form.Item>

      <Form.Item
        label={t('test-email.form.to')}
        name="to"
        rules={[
          { required: true, message: t('test-email.validation.to.required') },
          { type: 'email', message: t('test-email.validation.to.email.type') }
        ]}
      >
        <Input type="email" />
      </Form.Item>

      <Form.Item
        label={t('test-email.form.subject')}
        name="subject"
        rules={[
          { required: true, message: t('test-email.validation.subject.required') }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        initialValue={TestEmailType.Text}
        label={t('test-email.form.contentType')}
        name="contentType"
      >
        <Select
          options={[
            {
              label: t(`test-email.contentType.${TestEmailType.Document}`),
              value: TestEmailType.Document
            },
            {
              label: t(`test-email.contentType.${TestEmailType.HTML}`),
              value: TestEmailType.HTML
            },
            {
              label: t(`test-email.contentType.${TestEmailType.Text}`),
              value: TestEmailType.Text
            }
          ]}
        />
      </Form.Item>

      <Form.Item
        dependencies={['contentType']}
        noStyle
      >
        {({ getFieldValue }) => {
          const typeValue = getFieldValue('contentType') as TestEmailType

          return getVariableFormFields(typeValue ?? TestEmailType.Text)
        }}
      </Form.Item>
    </Form>
  )
}
