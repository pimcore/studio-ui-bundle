import { ConfigLayout } from "@Pimcore/components/predefined-layouts/config/config-layout"
import { PerspectiveConfig, usePerspectiveGetConfigCollectionQuery } from "@sdk/api/perspectives"
import { ContentLayout, Icon, TreeDataItem } from "@sdk/components"
import React, { useEffect } from "react"
import { TreeContainer } from "./components/tree/tree-container"
import { WidgetDetailContainer } from "./components/widget-detail/widget-detail-container"

export const PerspectiveEditorContainer = (): React.JSX.Element => {
  const [expandedKeys, setExpandedKeys] = React.useState<any[]>([0])
  const { data } = usePerspectiveGetConfigCollectionQuery()
  const [treeData, setTreeData] = React.useState<TreeDataItem[]>([])

  useEffect(() => {
    const tmpTreeData: TreeDataItem[] = [];
    if (data?.items) {
      data.items.forEach((item: PerspectiveConfig) => {
        tmpTreeData.push({
          title: item.name,
          key: item.id,
          icon: <Icon value={item.icon.value} />,
        });
      });
    }

    const treeItems: TreeDataItem[] = [{
      title: 'All Perspectives',
      key: '0-0',
      icon: <Icon value={'folder'} />,
      children: tmpTreeData,
    }]

    setTreeData(treeItems);
  }, [data])


  const sidebar = {
    id: 'widget-editor.sidebar',
    minSize: 170,
    children: [
      <TreeContainer
        expandedKeys={expandedKeys}
        key="widget-editor--sidebar"
        onSetExpandedKeys={(keys) => {
          setExpandedKeys(keys)
        }}
        treeData={treeData}
      />
    ]
  }

  const main = {
    id: 'widget-editor--main',
    minSize: 600,
    children: [
      <WidgetDetailContainer />
    ]
  }

  return (
    <ContentLayout>
      <ConfigLayout
        leftItem={sidebar}
        rightItem={main}
      />
    </ContentLayout>
  )
}