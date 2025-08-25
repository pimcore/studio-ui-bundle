import { PerspectiveConfig, usePerspectiveGetConfigCollectionQuery } from "@Pimcore/modules/perspectives/perspectives-slice.gen"
import { Content, ContentLayout, Icon, IconButton, IconTextButton, SearchInput, Toolbar, TreeDataItem, TreeElement } from "@sdk/components"
import { isNil, isUndefined } from "lodash"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { usePerspectiveEditorContext } from "../../context/hooks/use-perspective-editor-context"

interface TreeContainerProps {
  expandedKeys: any[]
  onSetExpandedKeys: (keys: any[]) => void
}

export const TreeContainer = ({ expandedKeys }: TreeContainerProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [treeDataFiltered, setTreeDataFiltered] = useState<TreeDataItem[]>([])
  const { openPerspective } = usePerspectiveEditorContext()
  const { data: perspectives } = usePerspectiveGetConfigCollectionQuery()

  const generateTreeStructure = (perspectives: PerspectiveConfig[]): TreeDataItem[] => {
    const tmpTreeData: TreeDataItem[] = [];

    if (perspectives.length > 0) {
      perspectives.forEach((item: PerspectiveConfig) => {
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
    if (isUndefined(perspectives)) {
      setTreeDataFiltered([]);
    }

    if (!isUndefined(perspectives)) {
      setTreeDataFiltered(generateTreeStructure(perspectives.items));
    }
  }, [perspectives])

  const handleSearch = (value: string) => {
    if (value.length === 0) {
      if (!isUndefined(perspectives)) {
        setTreeDataFiltered(generateTreeStructure(perspectives.items))
      }
      return
    }

    if (!isUndefined(perspectives)) {
      const filteredData = perspectives.items.filter((item: PerspectiveConfig) => {
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
    if (!isUndefined(perspectives)) {
      setTreeDataFiltered(generateTreeStructure(perspectives.items))
    }
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
          hasRoot={false}
          onSelected={(key) => {
            openPerspective(key)
          }}
        />
      </Content>
    </ContentLayout>
  )
}
