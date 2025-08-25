import { Content, ContentLayout, Icon, IconButton, IconTextButton, SearchInput, Toolbar, TreeDataItem, TreeElement } from "@sdk/components"
import { isNil, isString, isUndefined } from "lodash"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useWidgetEditorContext } from "../../context/hooks/use-widget-editor-context"
import { usePerspectiveWidgetGetConfigCollectionQuery, WidgetConfig } from "@sdk/api/perspectives"

interface TreeContainerProps {
  expandedKeys: any[]
  onSetExpandedKeys: (keys: any[]) => void
}

export const TreeContainer = ({ expandedKeys }: TreeContainerProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [treeDataFiltered, setTreeDataFiltered] = useState<TreeDataItem[]>([])
  const { openWidget } = useWidgetEditorContext()
  const { data: widgets } = usePerspectiveWidgetGetConfigCollectionQuery()

  const generateTreeStructure = (widgets: WidgetConfig[]): TreeDataItem[] => {
    const tmpTreeData: TreeDataItem[] = [];

    if (widgets.length > 0) {
      widgets.forEach((item: WidgetConfig) => {
        tmpTreeData.push({
          title: item.name,
          key: item.id,
          icon: <Icon value={item.icon.value} />,
        });
      });
    }

    return tmpTreeData;
  }

  useEffect(() => {
    if (isUndefined(widgets)) {
      setTreeDataFiltered([]);
    }

    if (!isUndefined(widgets)) {
      setTreeDataFiltered(generateTreeStructure(widgets.items));
    }
  }, [widgets])

  const handleSearch = (value: string) => {
    if (value.length === 0) {
      if (!isUndefined(widgets)) {
        setTreeDataFiltered(generateTreeStructure(widgets.items))
      }
      return
    }

    if (!isUndefined(widgets)) {
      const filteredData = widgets.items.filter((item: WidgetConfig) => {
        if (!isNil(item.name)) {
          return item.name.toLowerCase().includes(value.toLowerCase())
        }

        return false
      })

      setTreeDataFiltered(generateTreeStructure(filteredData))
    }
  }

  const clearSearch = () => {
    setSearchTerm('')
    if (!isUndefined(widgets)) {
      setTreeDataFiltered(generateTreeStructure(widgets.items))
    }
  }

  return (
    <ContentLayout
      renderToolbar={(
        <Toolbar justify="space-between">
          <IconButton
            icon={{ value: 'refresh' }}
            title={t('refresh')}
          />

          <IconTextButton
            icon={{ value: 'new' }}
          >
            {t('toolbar.new')}
          </IconTextButton>
        </Toolbar>
      )}
    >
      <Content padded>
        <SearchInput
          onChange={(e) => setSearchTerm(e.target.value)}
          onSearch={handleSearch}
          onClear={clearSearch}
          value={searchTerm}
        />
        <TreeElement
          defaultExpandedKeys={expandedKeys}
          treeData={treeDataFiltered}
          hasRoot={false}
          onSelected={(key) => {
            const widget = widgets!.items.find((w) => isString(w.id) && isString(key) && w.id === key)

            if (widget !== undefined) {
              openWidget(widget.id, widget.widgetType)
            }
          }}
        />
      </Content>
    </ContentLayout>
  )
}
