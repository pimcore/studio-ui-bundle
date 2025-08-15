import React, { useMemo } from "react";
import { Form } from "../form";

export interface ConditionalProps {
  condition: (formValues: Record<string, unknown>) => boolean;
  children: React.ReactNode;
}

export const Conditional = ({ condition, children }: ConditionalProps): React.JSX.Element => {
  const initialValues = Form.useFormInstance().getFieldsValue(true);
  const values = Form.useWatch((values) => {
    return values;
  }) ?? initialValues;

  const isTrue = useMemo(() => {
    return condition(values);
  }, [condition, values]);

  return isTrue ? <>{children}</> : <></>;
};
