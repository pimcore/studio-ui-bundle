import { Content, ContentLayout, Icon, IconButton, IconTextButton, SearchInput, Toolbar, TreeDataItem, TreeElement } from "@sdk/components"
import { isNil, isString } from "lodash"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { usePerspectiveEditorContext } from "../../context/hooks/use-perspective-editor-context"
import { PerspectiveConfig } from "@Pimcore/modules/perspectives/perspectives-slice.gen"

interface TreeContainerProps {
  expandedKeys: any[]
  onSetExpandedKeys: (keys: any[]) => void
}

export const TreeContainer = ({ expandedKeys }: TreeContainerProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [treeDataFiltered, setTreeDataFiltered] = useState<TreeDataItem[]>([])
  const { perspectives } = usePerspectiveEditorContext()

  const generateTreeStructure = (perspectives: PerspectiveConfig[]): TreeDataItem[] => {
    const tmpTreeData: TreeDataItem[] = [];
    console.log('perspectives', perspectives)

    if (perspectives.length > 0) {
      perspectives.forEach((item: PerspectiveConfig) => {
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

    return treeItems;
  }

  useEffect(() => {
    console.log(generateTreeStructure(perspectives))

    setTreeDataFiltered(generateTreeStructure(perspectives));
  }, [perspectives])

  const handleSearch = (value: string) => {
    if (value.length === 0) {
      setTreeDataFiltered(generateTreeStructure(perspectives))
      return
    }

    const filteredData = perspectives.filter((item: PerspectiveConfig) => {
      if (!isNil(item.name)) {
        return item.name.toLowerCase().includes(value.toLowerCase())
      }

      return false
    })

    setTreeDataFiltered(generateTreeStructure(filteredData))
  }

  const clearSearch = () => {
    setSearchTerm('')
    setTreeDataFiltered(generateTreeStructure(perspectives))
  }

  return (
    <ContentLayout
      renderToolbar={(
        <Toolbar justify="space-between">
          <IconButton
            icon={{ value: 'refresh' }}
            title="Refresh"
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
          onActionsClick={(key: string | number, action: string) => {
            console.log(`Action ${action} clicked for key ${key}`)
          }}
        />
      </Content>
    </ContentLayout>
  )
}