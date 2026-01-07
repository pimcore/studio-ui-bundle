import { useClassDefinitionTabs } from "@Pimcore/modules/class-definition/components/tabs/class-definition-tabs/class-defintion-tabs-provider"
import { useClassDefinitionCreateMutation, useClassDefinitionGetIdentifierDataQuery } from "@sdk/api/class-definition"
import { Content, Form, Input, Modal } from "@sdk/components"
import { ApiError, trackError } from "@sdk/modules/app"
import { useForm } from "antd/es/form/Form"
import React, { useEffect } from "react"

export interface ClassDefinitionModalNewProps {
  open: boolean
  onOpenChange?: (open: boolean) => void
}

export const ClassDefinitionModalNew = (props: ClassDefinitionModalNewProps): React.JSX.Element => {
  const [form] = useForm()
  const { data, isLoading, error, refetch } = useClassDefinitionGetIdentifierDataQuery();
  const [createClassDefinition] = useClassDefinitionCreateMutation();
  const { openClassDefinition } = useClassDefinitionTabs();

  useEffect(() => {
    if (props.open) {
      refetch();
    }
  }, [props.open, refetch, form]);

  useEffect(() => {
    if (error) {
      trackError(new ApiError(error));
    }
  }, [error]);

  const onFormFinish = (values: any) => {
    if (data === undefined) {
      return;
    }

    form.resetFields();

    createClassDefinition({
      createClassDefinition: {
        name: values.className,
        uid: values.uniqueIdentifier
      }
    }).then((data) => {
      props.onOpenChange?.(false);
      openClassDefinition({
        id: data.data!.id,
        name: data.data!.name,
        // @todo check schema with backend
        group: data.data!.group,
        icon: data.data!.icon,
      });
    }).catch((err) => {
      trackError(new ApiError(err));
    });
  }

  const onCancel = () => {
    form.resetFields();
    props.onOpenChange?.(false);
  }

  return (
    <Modal 
      open={props.open}
      onCancel={onCancel}
      onOk={ () => form.submit()}
      title={"Create New Class Definition"}
    >
      <Content loading={isLoading}>
        <Form layout="vertical" form={form} onFinish={onFormFinish}>
          <Form.Item
            name="className"
            label="Class name"
            rules={[
              { required: true, message: 'Please enter a class name' },
              { pattern: /^[A-Za-z][A-Za-z0-9_]*$/, message: 'The class name must start with a letter and can contain only letters, numbers, and underscores.' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="uniqueIdentifier"
            label="Unique identifier"
            initialValue={data?.suggestedId}
            rules={[
              { required: true, message: 'Please enter a unique identifier' },
              { validator: (_, value) => {
                  if (data?.existingIds.includes(value.toLowerCase())) {
                    return Promise.reject(new Error('This unique identifier is already in use'));
                  }

                  return Promise.resolve();
                }
              },
              { pattern: /^[a-zA-Z0-9_]{0,63}$/, message: 'The unique identifier must start with a letter and can contain only letters, numbers, and underscores, with a maximum length of 64 characters.' }
            ]}
          >
            <Input
              maxLength={64}
            />
          </Form.Item>

          Be careful with the unique identifier because table names can contain only up to 64 characters.
        </Form>
      </Content>
    </Modal>
  )
}
