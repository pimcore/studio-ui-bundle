import { Form } from "@Pimcore/components/form/form";
import { Input, Select } from "@sdk/components";
import { FormInstance, InputRef } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

enum WidgetTypes {
  ElementTree = 'element_tree'
}

//TODO: replace "any" with api interface
export interface CreateWidgetForm {
  name: string
  widgetType: WidgetTypes
}

interface CreateWidgetFormProps {
  form: FormInstance<CreateWidgetForm>
  inputRef?: React.RefObject<InputRef>
  initialValues?: Partial<CreateWidgetForm>
}

export const CreateWidgetForm = ({ form, initialValues, inputRef }: CreateWidgetFormProps): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <Form
      form={form}
      initialValues={{
        widgetType: WidgetTypes.ElementTree,
        ...initialValues
      }}
      layout="vertical"
    >
      <Form.Item
        label={t('widget-editor.create-form.name')}
        name="name"
        rules={[
          { required: true, message: t('widget-editor.create-form.name.required') },
        ]}
      >
        <Input ref={inputRef} />
      </Form.Item>

      <Form.Item
        label={t('widget-editor.create-form.widgetType')}
        name="widgetType"
      >
        <Select
          options={[
            {
              label: t(`widget-editor.create-form.widgetType.${WidgetTypes.ElementTree}`),
              value: WidgetTypes.ElementTree
            }
          ]}
        />
      </Form.Item>
    </Form>
  );
};
