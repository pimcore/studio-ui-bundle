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
import { useClassDefinitionCreateMutation, useClassDefinitionGetIdentifierDataQuery } from '@sdk/api/class-definition'
import { Content, Form, Input } from '@sdk/components'
import { ApiError, trackError } from '@sdk/modules/app'
import { type InputRef } from 'antd'
import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Text } from '@Pimcore/components/text/text'

export const ClassDefinitionsAddModal = (): React.JSX.Element => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const { closeModal } = useAddModal()
  const inputRef = useRef<InputRef>(null)
  const { data, isLoading, error } = useClassDefinitionGetIdentifierDataQuery()
  const [createClassDefinition] = useClassDefinitionCreateMutation()
  const { openConfiguration } = useItems()

  useEffect(() => {
    if (error !== undefined) {
      trackError(new ApiError(error))
    }
  }, [error])

  useEffect(() => {
    if (data?.suggestedId !== undefined) {
      form.setFieldValue('uniqueIdentifier', data.suggestedId)
    }
  }, [data?.suggestedId])

  const onFormFinish = (values: any): void => {
    if (data === undefined) {
      return
    }

    createClassDefinition({
      createClassDefinition: {
        name: values.className,
        uid: values.uniqueIdentifier
      }
    }).then((data) => {
      form.resetFields()
      closeModal()

      const classDef: ConfigurationPartial = {
        id: data.data!.id,
        name: data.data!.name,
        // @todo check schema with backend
        /*  @ts-expect-error group currently not in backend schema */
        group: data.data!.group,
        /*  @ts-expect-error icon currently not in backend schema */
        icon: data.data!.icon
      }

      openConfiguration(classDef)
    }).catch((err: ApiError) => {
      trackError(new ApiError(err))
    })
  }

  return (
    <AddModal
      afterOpenChange={ (open) => { if (open) inputRef.current?.focus() } }
      focusTriggerAfterClose={ false }
      onOk={ () => { form.submit() } }
      title={ t('class-definition.create-new') }
    >
      <Content loading={ isLoading }>
        <Form
          form={ form }
          layout="vertical"
          onFinish={ onFormFinish }
        >
          <Form.Item
            label={ t('class-definition.class-name') }
            name="className"
            rules={ [
              { required: true, message: t('class-definition.validation.enter-class-name') },
              { pattern: /^[A-Za-z][A-Za-z0-9_]*$/, message: t('class-definition.validation.class-name-format') }
            ] }
          >
            <Input ref={ inputRef } />
          </Form.Item>

          <Form.Item
            initialValue={ data?.suggestedId }
            label={ t('class-definition.unique-identifier') }
            name="uniqueIdentifier"
            rules={ [
              { required: true, message: t('class-definition.validation.enter-unique-identifier') },
              {
                validator: async (_, value: string) => {
                  if (data?.existingIds.includes(value.toLowerCase()) === true) {
                    return await Promise.reject(new Error(t('class-definition.validation.unique-identifier-in-use')))
                  }

                  await Promise.resolve()
                }
              },
              { pattern: /^[a-zA-Z0-9_]{0,63}$/, message: t('class-definition.validation.unique-identifier-format') }
            ] }
          >
            <Input
              maxLength={ 64 }
            />
          </Form.Item>

          <Text type="secondary">
            { t('class-definition.unique-identifier-warning') }
          </Text>
          <button
            style={ { display: 'none' } }
            type="submit"
          />
        </Form>
      </Content>
    </AddModal>
  )
}
