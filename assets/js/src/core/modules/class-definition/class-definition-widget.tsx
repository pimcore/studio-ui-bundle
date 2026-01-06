import { ClassDefinitionTabs } from "@Pimcore/modules/class-definition/components/tabs/class-definition-tabs"
import { ClassDefinitionSidebar } from "@Pimcore/modules/class-definition/components/sidebar/class-definition-sidebar"
import { ConfigLayout } from "@sdk/components"
import React from "react"
import { ClassDefinitionsTabsProvider } from "@Pimcore/modules/class-definition/components/tabs/class-definition-tabs/class-defintion-tabs-provider"

export const ClassDefinitionWidget = (): React.JSX.Element => {
  return (
    <ClassDefinitionsTabsProvider>
      <ConfigLayout
        leftItem={{
          children: <ClassDefinitionSidebar />
        }}
        rightItem={{
          children: <ClassDefinitionTabs />
        }}
      />
    </ClassDefinitionsTabsProvider>
  )
}
