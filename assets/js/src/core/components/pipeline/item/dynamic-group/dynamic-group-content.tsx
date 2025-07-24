import { useNumberedList } from "@Pimcore/components/form/numbered-list/provider/numbered-list/use-numbered-list";
import React, { Fragment, useEffect } from "react";
import { DynamicGroupProps } from "../dynamic-group";
import { Box } from "@Pimcore/components/box/box";
import { DynamicGroupDropdown } from "./dynamic-group-dropdown";
import { IconTextButton } from "@Pimcore/components/icon-text-button/icon-text-button";
import { Flex } from "@Pimcore/components/flex/flex";
import { Header } from "@Pimcore/components/header/header";
import { DynamicGroupItem } from "./dynamic-group-item";
import { Space } from "@Pimcore/components/space/space";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
export interface DynamicGroupContentProps {
  id: DynamicGroupProps['id'];
  dynamicTypeRegistryId: DynamicGroupProps['dynamicTypeRegistryId'];
  showTitle?: DynamicGroupProps['showTitle'];
}

export const DynamicGroupContent = ({ dynamicTypeRegistryId, id, showTitle = false }: DynamicGroupContentProps): React.JSX.Element => {
  const { values, operations } = useNumberedList();
  const [items, setItems] = React.useState(values.map((value, index) => index + 1));
  const isEmpty = values.length === 0;
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5
      }
    })
  )

  useEffect(() => {
    // Update items when values change
    setItems(values.map((value, index) => index + 1));
  }, [values]);

  const onDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over?.id);

      // Update the items array based on the drag and drop
      const updatedItems = Array.from(items);
      updatedItems.splice(oldIndex, 1);
      updatedItems.splice(newIndex, 0, active.id);

      operations.move(oldIndex, newIndex);
      setItems(updatedItems);
    }
  };

  return (
    <Box padding={{ bottom: 'mini' }}>
      <Space size="extra-small" className="w-full" direction="vertical">
        {showTitle === false ? (
          <DynamicGroupDropdown dynamicTypeRegistryId={dynamicTypeRegistryId}>
            <IconTextButton type="link" icon={{value: 'new'}}>Add a {id}</IconTextButton>
          </DynamicGroupDropdown>
        ) : <></>}

        {showTitle === true ? (
          <Flex align="center">
            <Header title={id}>
              <DynamicGroupDropdown dynamicTypeRegistryId={dynamicTypeRegistryId}>
                <IconTextButton icon={{value: 'new'}}>Add</IconTextButton>
              </DynamicGroupDropdown>
            </Header>
          </Flex>
        ) : <></>}

        {isEmpty === false ? (      
          <DndContext onDragEnd={onDragEnd} sensors={sensors}>
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
              <Space size="extra-small" className="w-full" direction="vertical">
                {values.map((value, index) => {
                  return (
                    <Fragment key={value.vId}>
                      <DynamicGroupItem
                        dynamicTypeRegistryId={dynamicTypeRegistryId}
                        id={index}
                      />
                    </Fragment>
                  )
                })}
              </Space>
            </SortableContext>
          </DndContext>
        ): <></>}
      </Space>
    </Box>
  );
}
