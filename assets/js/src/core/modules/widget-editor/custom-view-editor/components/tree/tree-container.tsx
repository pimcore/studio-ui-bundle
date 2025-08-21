import { Content, ContentLayout, IconButton, IconTextButton, SearchInput, Toolbar, TreeDataItem, TreeElement } from "@sdk/components"
import { isNil, isString } from "lodash"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"

interface TreeContainerProps {
  expandedKeys: any[]
  treeData: TreeDataItem[]
  onSetExpandedKeys: (keys: any[]) => void
}

export const TreeContainer = ({ expandedKeys, treeData }: TreeContainerProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [treeDataFiltered, setTreeDataFiltered] = useState<TreeDataItem[]>(treeData)

  const handleSearch = (value: string) => {
    if (value.length === 0) {
      setTreeDataFiltered(treeData)
      return
    }

    const filteredData = treeData[0].children?.filter((item: TreeDataItem) => {
      if (item.key === '0-0') {
        return true
      }

      if (!isNil(item?.title) && isString(item.title)) {
        return item.title.toLowerCase().includes(value.toLowerCase())
      }

      return false
    })

    setTreeDataFiltered([{
      ...treeData[0],
      children: filteredData || []
    }])
  }

  const clearSearch = () => {
    setSearchTerm('')
    setTreeDataFiltered(treeData)
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