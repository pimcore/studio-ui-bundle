import React from "react";
import { Form, FormProps } from "./form";
import { Panel } from "../panel";
import { ConfigProvider } from "antd";

export interface FormKitProps {
  formProps?: Omit<FormProps, 'children'>;
  children?: React.ReactNode;
}

const FormKit = (props: FormKitProps): React.JSX.Element => {
  return (
    <ConfigProvider theme={ { components: { Form: { itemMarginBottom: 0 } } } }>
      <Form {...props.formProps}>
        <Panel>
          {props.children}
        </Panel>
      </Form>
    </ConfigProvider>
  )
}

Object.keys(Form).forEach((key) => {
  FormKit[key] = Form[key];
});

const TypedFormKit = FormKit as typeof FormKit & {
  Item: typeof Form.Item;
  List: typeof Form.List;
  Provider: typeof Form.Provider;
  Group: typeof Form.Group;
  KeyedList: typeof Form.KeyedList;
  NumberedList: typeof Form.NumberedList;
  useForm: typeof Form.useForm;
  useFormInstance: typeof Form.useFormInstance;
  useWatch: typeof Form.useWatch;
  ErrorList: typeof Form.ErrorList;
};

export { TypedFormKit as FormKit };
