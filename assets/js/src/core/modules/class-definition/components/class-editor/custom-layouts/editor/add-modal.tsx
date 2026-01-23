/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useCurrentConfiguration } from '@Pimcore/modules/field-definitions/components/editor/custom-layout/current-configuration-provider'
import { type ConfigurationPartial, useItems } from '@Pimcore/modules/field-definitions/components/editor/items/provider'
import { AddModal, useAddModal } from '@Pimcore/modules/field-definitions/components/editor/items/sidebar/add-modal'
import { useClassCustomLayoutGetIdentifierDataQuery, usePimcoreStudioApiClassCustomLayoutCreateMutation } from '@sdk/api/class-definition'
import { Content, Form, Input } from '@sdk/components'
import { ApiError, trackError } from '@sdk/modules/app'
import { useForm } from 'antd/es/form/Form'
import React, { useEffect } from 'react'

export const CustomLayoutAddModal = (): React.JSX.Element => {
  const [form] = useForm()
  const { closeModal } = useAddModal()
  const { configuration } = useCurrentConfiguration()
  const { data, isLoading, error } = useClassCustomLayoutGetIdentifierDataQuery({ classDefinitionId: configuration!.id })
  // @todo check hook name
  const [createCustomLayout] = usePimcoreStudioApiClassCustomLayoutCreateMutation()
  const { openConfiguration } = useItems()

  useEffect(() => {
    if (error !== undefined) {
      trackError(new ApiError(error))
    }
  }, [error])

  const onFormFinish = (values: any): void => {
    if (data === undefined) {
      return
    }

    form.resetFields()

    createCustomLayout({
      customLayoutId: data.suggestedId,
      customLayoutNew: {
        // todo what kind of id is needed here? type says only number but shouldn't it be string?
        classId: parseInt(configuration!.id),
        name: values.name
      }
    }).then((data) => {
      closeModal()

      const layoutDef: ConfigurationPartial = {
        id: data.data!.id,
        name: data.data!.name,
        // @todo check schema with backend
        /*  @ts-expect-error group currently not in backend schema */
        group: data.data!.group,
        /*  @ts-expect-error icon currently not in backend schema */
        icon: data.data!.icon
      }

      openConfiguration(layoutDef)
    }).catch((err: ApiError) => {
      trackError(new ApiError(err))
    })
  }

  return (
    <AddModal
      onOk={ () => { form.submit() } }
      title={ 'Create New Class Definition' }
    >
      <Content loading={ isLoading }>
        <Form
          form={ form }
          layout="vertical"
          onFinish={ onFormFinish }
        >
          <Form.Item
            label="name"
            name="name"
            rules={ [
              { required: true, message: 'Please enter a class name' },
              { pattern: /^[-A-Za-z0-9_]*$/, message: 'The class name must start with a letter and can contain only letters, numbers, and underscores.' }
            ] }
          >
            <Input />
          </Form.Item>

          <Form.Item
            initialValue={ data?.suggestedId }
            label="Unique identifier"
            name="uniqueIdentifier"
            rules={ [
              { required: true, message: 'Please enter a unique identifier' },
              {
                validator: async (_, value: string) => {
                  if (data?.existingIds.includes(value.toLowerCase()) === true) {
                    return await Promise.reject(new Error('This unique identifier is already in use'))
                  }

                  await Promise.resolve()
                }
              },
              { pattern: /^[-a-zA-Z0-9_]{0,63}$/, message: 'The unique identifier must start with a letter and can contain only letters, numbers, and underscores, with a maximum length of 64 characters.' }
            ] }
          >
            <Input
              maxLength={ 64 }
            />
          </Form.Item>

          Be careful with the unique identifier because table names can contain only up to 64 characters.
        </Form>
      </Content>
    </AddModal>
  )
}
