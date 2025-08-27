import React from "react"
import { useNumberedList } from "../numbered-list/provider/numbered-list/use-numbered-list";
import { Form } from "../../form";
import { useFieldCollection } from "./field-collection-provider";
import { Input } from "antd";
import { ToolStripBox } from "../../../toolstrip/box/tool-strip-box";
import { FieldCollectionItemToolStrip } from "./field-collection-item-toolstrip";

export interface FieldCollectionItemProps {
  field: number
}

export const FieldCollectionItem = (props: FieldCollectionItemProps): React.JSX.Element => {
  const { field } = props;
  const { values } = useNumberedList();
  const value = values[field];

  const type = value?.type;
  const { registry } = useFieldCollection();

  const registryItem = registry.getItemByType(type);
  
  if (registryItem === undefined) {
    throw new Error(`No registry item found for type "${type}"`);
  }

  return (
    <ToolStripBox renderToolStripStart={<FieldCollectionItemToolStrip field={field} />}>
      <Form.Item hidden name={'type'}>
        <Input />
      </Form.Item>

      <Form.Group name={'data'}>
        {registryItem.component}
      </Form.Group>
    </ToolStripBox>
  )
}
