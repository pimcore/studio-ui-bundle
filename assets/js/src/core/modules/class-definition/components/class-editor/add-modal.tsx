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
import React, { useEffect } from 'react'

export const ClassDefinitionsAddModal = (): React.JSX.Element => {
  const [form] = Form.useForm()
  const { closeModal } = useAddModal()
  const { data, isLoading, error } = useClassDefinitionGetIdentifierDataQuery()
  const [createClassDefinition] = useClassDefinitionCreateMutation()
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

    createClassDefinition({
      createClassDefinition: {
        name: values.className,
        uid: values.uniqueIdentifier
      }
    }).then((data) => {
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
            label="Class name"
            name="className"
            rules={ [
              { required: true, message: 'Please enter a class name' },
              { pattern: /^[A-Za-z][A-Za-z0-9_]*$/, message: 'The class name must start with a letter and can contain only letters, numbers, and underscores.' }
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
              { pattern: /^[a-zA-Z0-9_]{0,63}$/, message: 'The unique identifier must start with a letter and can contain only letters, numbers, and underscores, with a maximum length of 64 characters.' }
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
