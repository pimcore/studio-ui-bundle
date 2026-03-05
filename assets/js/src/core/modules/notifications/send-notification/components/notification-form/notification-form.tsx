/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Form, type formInstanceType, FormKit, Input, TextArea } from '@sdk/components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { UserSelect } from '../user-select/user-select'
import { ManyToOneRelation } from '@Pimcore/components/many-to-one-relation'

interface NotificationFormProps {
  form: formInstanceType
}

export const NotificationForm = ({ form }: NotificationFormProps): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <FormKit
      formProps={ {
        form
      } }
    >
      <Form.Item
        label={ t('user-menu.notification.modal.to') }
        name={ 'to' }
        rules={ [{ required: true, message: t('user-menu.notification.modal.form.validation.provide-recipient') }] }
      >
        <UserSelect
          onChange={ (value) => {
            form.setFieldValue('to', value)
          } }
          optionFilterProp="label"
          placeholder={ t('user-menu.notification.modal.select') }
          showSearch
        />
      </Form.Item>
      <Form.Item
        label={ t('user-menu.notification.modal.title') }
        name={ 'title' }
        rules={ [{ required: true, message: t('user-menu.notification.modal.form.validation.provide-title') }] }
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={ t('user-menu.notification.modal.message') }
        name={ 'message' }
        rules={ [{ required: true, message: t('user-menu.notification.modal.form.validation.provide-message') }] }
      >
        <TextArea />
      </Form.Item>

      <Form.Item
        label={ t('user-menu.notification.modal.add-an-attachment') }
        name={ 'attachment' }
      >
        <ManyToOneRelation
          allowToClearRelation
          assetsAllowed
          dataObjectsAllowed
          documentsAllowed
        />
      </Form.Item>
    </FormKit>
  )
}
