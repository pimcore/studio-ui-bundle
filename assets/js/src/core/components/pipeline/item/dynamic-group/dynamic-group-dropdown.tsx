import { useInjection } from "@Pimcore/app/depency-injection";
import { Dropdown, DropdownProps } from "@Pimcore/components/dropdown/dropdown";
import { useNumberedList } from "@Pimcore/components/form/numbered-list/provider/numbered-list/use-numbered-list";
import { DynamicTypePipelineRegistry } from "@Pimcore/modules/element/dynamic-types/definitions/pipelines/dynamic-type-pipeline-registry";
import React from "react";

export interface DynamicGroupDropdownProps {
  children: React.ReactNode
  dynamicTypeRegistryId: string
}

export const DynamicGroupDropdown = ({ children, dynamicTypeRegistryId }: DynamicGroupDropdownProps): React.JSX.Element => {
  const registry = useInjection<DynamicTypePipelineRegistry>(dynamicTypeRegistryId);
  const { operations } = useNumberedList();

  const items: DropdownProps['menu']["items"] = registry.getDynamicTypes().map((dynamicType) => ({
    key: dynamicType.id,
    label: dynamicType.id,
    onClick: () => {
      operations.add({
        key: dynamicType.id,
      })
    }
  }));

  return (
    <Dropdown
      menu={{
        items
      }}
    >
      {children}
    </Dropdown>
  );
};
