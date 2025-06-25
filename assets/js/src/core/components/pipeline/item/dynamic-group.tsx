import { Form } from "@Pimcore/components/form/form";
import React from "react";
import { DynamicGroupContent } from "./dynamic-group/dynamic-group-content";

export interface DynamicGroupProps {
  id: string;
  dynamicTypeRegistryId: string
}

const PipelineDynamicGroup = ({ id, dynamicTypeRegistryId }: DynamicGroupProps): React.JSX.Element => {
  return (
    <Form.Item
      name={id}
    >
      <Form.NumberedList>
        <DynamicGroupContent dynamicTypeRegistryId={dynamicTypeRegistryId} id={id} />
      </Form.NumberedList>
    </Form.Item>
  )
}

const memoedPipelineDynamicGroup = React.memo(PipelineDynamicGroup);
export { memoedPipelineDynamicGroup as PipelineDynamicGroup };
