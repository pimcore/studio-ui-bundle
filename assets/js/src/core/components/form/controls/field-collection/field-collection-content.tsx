import React from "react"
import { useNumberedList } from "../numbered-list/provider/numbered-list/use-numbered-list"
import { Form } from "../../form";
import { FieldCollectionItem } from "./field-collection-item";
import { Space } from "../../../space/space";
import { FieldCollectionAddControl } from "./field-collection-add-control";
import { Panel } from "../../../panel";
import { useFieldCollection } from "./field-collection-provider";
import { Text } from "@Pimcore/components/text/text";
import { Flex } from "@Pimcore/components/flex/flex";

export const FieldCollectionContent = (): React.JSX.Element => {
  const { values } = useNumberedList();
  const { title, collapsed } = useFieldCollection();

  return (
    <>
      {values.length === 0 && (
        <>
          <Flex gap={'extra-small'} align="center">
            <Text strong>{title}</Text>
            <FieldCollectionAddControl size="middle" />
          </Flex>

          <div>
            <Text type="secondary">No items added yet.</Text>
          </div>
        </>
      )}

      {values.length > 0 && (
        <Panel title={title} theme="default" collapsible collapsed={collapsed} border={false}>
          <Space size="small" direction="vertical" className="w-full">
            {values.map((item, index) => (
              <Form.Group name={index}>
                <FieldCollectionItem field={index} />
              </Form.Group>
            ))}
          </Space>
        </Panel>
      )}
    </>
  )
}
