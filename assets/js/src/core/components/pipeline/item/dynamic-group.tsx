import { Form } from "@Pimcore/components/form/form";
import React from "react";
import { DynamicGroupContent } from "./dynamic-group/dynamic-group-content";

export interface DynamicGroupProps {
  id: string;
  dynamicTypeRegistryId: string
  showTitle?: boolean
}

const PipelineDynamicGroup = ({ id, dynamicTypeRegistryId, showTitle = false }: DynamicGroupProps): React.JSX.Element => {
  return (
    <Form.Item
      name={id}
      initialValue={ [] }
    >
      <Form.NumberedList>
        <DynamicGroupContent dynamicTypeRegistryId={dynamicTypeRegistryId} id={id} showTitle={showTitle} />
      </Form.NumberedList>
    </Form.Item>
  )
}

const memoedPipelineDynamicGroup = React.memo(PipelineDynamicGroup);
export { memoedPipelineDynamicGroup as PipelineDynamicGroup };
