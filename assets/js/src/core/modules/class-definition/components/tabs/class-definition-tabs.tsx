import { useClassDefinitionTabs } from "@Pimcore/modules/class-definition/components/tabs/class-definition-tabs/class-defintion-tabs-provider";
import { Content, ContentLayout, ITabsProps, Tabs, Toolbar } from "@sdk/components"
import React from "react"

export const ClassDefinitionTabs = (): React.JSX.Element => {
  const { classDefinitions, activeClassDefinition, setActiveClassDefinition, closeClassDefinition } = useClassDefinitionTabs();

  const items: ITabsProps["items"] = classDefinitions.map((classDef) => ({
    key: `${classDef.id}`,
    label: classDef.name,
    closable: true,
    children: (
      <ContentLayout
        className="absolute-stretch"
        renderToolbar={
          <Toolbar>
            test
          </Toolbar>
        }
      >
        <Content padded>
          test
        </Content>
      </ContentLayout>
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
