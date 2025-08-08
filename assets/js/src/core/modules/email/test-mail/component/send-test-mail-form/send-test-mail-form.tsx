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
import { ManyToOneRelation, ManyToOneRelationValueType } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-one-relation/many-to-one-relation'
import { SendEmailParameters } from '@Pimcore/modules/email/emails-api-slice-enhanced'
import { getLanguageExtensions, TextArea } from '@sdk/components'
import { FormInstance } from 'antd/lib'
import { isNil } from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ParametersTable } from '../parameters-table/parameters-table'

export interface TestEmailModalProps {
  initalValues?: Partial<SendEmailParameters>
  form: FormInstance<SendEmailParameters>
  onFinish?: (values: SendEmailParameters) => Promise<void>
}

enum TestEmilType {
  Document = 'document',
  HTML = 'html',
  Text = 'text'
}

export const SendTestMailForm = ({ initalValues, form }: TestEmailModalProps): React.JSX.Element => {
  const { t } = useTranslation()

  const getVariableFormFields = (type: TestEmilType): React.JSX.Element => {
    switch (type) {
      case TestEmilType.Document:
        return (
          <>
            <Form.Item
              label={t('test-email.form.document')}
              name="documentPath"
              rules={[
                { required: true, message: t('email.test.validation.content.required') }
              ]}
            >
              <ManyToOneRelation
                allowToClearRelation
                documentsAllowed
                onChange={(value: ManyToOneRelationValueType) => {
                  if (isNil(value)) {
                    form.setFieldValue('documentPath', null)
                    return
                  }

                  form.setFieldValue('documentPath', value.fullPath)
                }}
              />
            </Form.Item>

            <Form.Item
              name="documentParameters"
              rules={[
                { required: true, message: t('email.test.validation.content.required') }
              ]}
            >
              <ParametersTable form={form} />
            </Form.Item>
          </>
        )
      case TestEmilType.HTML:
        return (
          <Form.Item
            label={t('test-email.form.message')}
            name="content"
            rules={[
              { required: true, message: t('email.test.validation.content.required') }
            ]}
          >
            <CodeEditor
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
      case TestEmilType.Text:
        return (
          <Form.Item
            label={t('test-email.form.message')}
            name="content"
            rules={[
              { required: true, message: t('email.test.validation.content.required') }
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
      layout="vertical"
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
        label={t('test-email.form.subject')}
        name="subject"
        rules={[
          { required: true, message: t('email.test.validation.subject.required') },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={t('test-email.form.contentType')}
        name="contentType"
        initialValue={TestEmilType.Text}
      >
        <Select
          options={[
            {
              label: t(`test-email.contentType.${TestEmilType.Document}`),
              value: TestEmilType.Document
            },
            {
              label: t(`test-email.contentType.${TestEmilType.HTML}`),
              value: TestEmilType.HTML
            },
            {
              label: t(`test-email.contentType.${TestEmilType.Text}`),
              value: TestEmilType.Text
            }
          ]}
        />
      </Form.Item>

      <Form.Item dependencies={['contentType']} noStyle>
        {({ getFieldValue }) => {
          const typeValue = getFieldValue('contentType')

          return getVariableFormFields(typeValue)
        }}
      </Form.Item>
    </Form>
  )
}
