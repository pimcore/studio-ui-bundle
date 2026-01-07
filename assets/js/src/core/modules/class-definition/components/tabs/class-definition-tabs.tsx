import { ClassDefinitionDetail } from "@Pimcore/modules/class-definition/components/detail/class-definition-detail";
import { useClassDefinitionTabs } from "@Pimcore/modules/class-definition/components/tabs/class-definition-tabs/class-defintion-tabs-provider";
import { Content, ContentLayout, ITabsProps, Tabs, Toolbar } from "@sdk/components"
import React from "react"

export const ClassDefinitionTabs = (): React.JSX.Element => {
  const { classDefinitions, activeClassDefinition, setActiveClassDefinition, closeClassDefinition } = useClassDefinitionTabs();

  const items: ITabsProps["items"] = classDefinitions.map((classDef) => ({
    key: `${classDef.id}`,
    label: `${classDef.name} (ID: ${classDef.id})`,
    closable: true,
    children: (
      <ClassDefinitionDetail classDefinition={classDef} />
    )
  }));

  return (
    <Tabs
      activeKey={activeClassDefinition?.id ?? undefined}
      fullHeight
      onClose={(classDefinitionKey) => {
        const classDef = classDefinitions.find(cd => cd.id === classDefinitionKey);

        if (classDef !== undefined) {
          closeClassDefinition(classDef);
        }
      }}
      onChange={(classDefinitionKey) => {
        const classDef = classDefinitions.find(cd => cd.id === classDefinitionKey);

        if (classDef !== undefined) {
          setActiveClassDefinition(classDef);
        }
      }}
      items={items} 
    />
  )
}
