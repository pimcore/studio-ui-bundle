/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ConfigurationPartial, useItems } from '@Pimcore/modules/field-definitions/components/editor/items/provider'
import { AddModal, useAddModal } from '@Pimcore/modules/field-definitions/components/editor/items/sidebar/add-modal'
import { useClassFieldCollectionCreateMutation } from '@Pimcore/modules/class-definition/class-definition-slice-enhanced'
import { Form, Input } from '@sdk/components'
import { ApiError, trackError } from '@sdk/modules/app'
import { type InputRef } from 'antd'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'

export const FieldCollectionAddModal = (): React.JSX.Element => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const { closeModal } = useAddModal()
  const inputRef = useRef<InputRef>(null)
  const [createFieldCollection] = useClassFieldCollectionCreateMutation()
  const { openConfiguration } = useItems()

  const onFormFinish = (values: any): void => {
    form.resetFields()

    createFieldCollection({
      createFieldCollection: {
        key: values.key
      }
    }).then((data) => {
      closeModal()

      const fieldCollection: ConfigurationPartial = {
        id: data.data!.key,
        name: data.data!.title ?? data.data!.key
      }

      openConfiguration(fieldCollection)
    }).catch((err: ApiError) => {
      trackError(new ApiError(err))
    })
  }

  return (
    <AddModal
      afterOpenChange={ (open) => { if (open) inputRef.current?.focus() } }
      focusTriggerAfterClose={ false }
      onOk={ () => { form.submit() } }
      title={ t('field-collection.create-new') }
    >
      <Form
        form={ form }
        layout="vertical"
        onFinish={ onFormFinish }
      >
        <Form.Item
          label={ t('field-collection.key') }
          name="key"
          rules={ [
            { required: true, message: t('field-collection.validation.enter-key') },
            { pattern: /^[A-Za-z][A-Za-z0-9_]*$/, message: t('field-collection.validation.key-format') }
          ] }
        >
          <Input ref={ inputRef } />
        </Form.Item>
        <button
          style={ { display: 'none' } }
          type="submit"
        />
      </Form>
    </AddModal>
  )
}
