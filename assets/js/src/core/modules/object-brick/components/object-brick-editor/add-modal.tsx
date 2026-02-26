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
import { useClassObjectBrickCreateMutation } from '@Pimcore/modules/class-definition/class-definition-slice-enhanced'
import { Form, Input } from '@sdk/components'
import { ApiError, trackError } from '@sdk/modules/app'
import { type InputRef } from 'antd'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'

export const ObjectBrickAddModal = (): React.JSX.Element => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const { closeModal } = useAddModal()
  const inputRef = useRef<InputRef>(null)
  const [createObjectBrick] = useClassObjectBrickCreateMutation()
  const { openConfiguration } = useItems()

  const onFormFinish = (values: any): void => {
    form.resetFields()

    createObjectBrick({
      createObjectBrick: {
        key: values.key
      }
    }).then((data) => {
      closeModal()

      const objectBrick: ConfigurationPartial = {
        id: data.data!.key,
        name: data.data!.title ?? data.data!.key
      }

      openConfiguration(objectBrick)
    }).catch((err: ApiError) => {
      trackError(new ApiError(err))
    })
  }

  return (
    <AddModal
      afterOpenChange={ (open) => { if (open) inputRef.current?.focus() } }
      focusTriggerAfterClose={ false }
      onOk={ () => { form.submit() } }
      title={ t('object-brick.create-new') }
    >
      <Form
        form={ form }
        layout="vertical"
        onFinish={ onFormFinish }
      >
        <Form.Item
          label={ t('object-brick.key') }
          name="key"
          rules={ [
            { required: true, message: t('object-brick.validation.enter-key') },
            { pattern: /^[a-zA-Z]\w*$/, message: t('object-brick.validation.key-format') }
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
