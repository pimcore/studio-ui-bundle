import { TreeAutocomplete } from "@Pimcore/modules/user/management/tree/tree-autocomplete"
import { Content, ContentLayout, IconButton, IconTextButton, Toolbar, TreeElement } from "@sdk/components"
import React from "react"
import { useTranslation } from "react-i18next"

interface TreeContainerProps {
  expandedKeys: any[]
  treeData: any[]
  onSetExpandedKeys: (keys: any[]) => void
}

export const TreeContainer = ({ expandedKeys, treeData }: TreeContainerProps): React.JSX.Element => {
  const { t } = useTranslation()

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
        <TreeAutocomplete />
        <TreeElement
          defaultExpandedKeys={expandedKeys}
          treeData={treeData}
          onActionsClick={(key: string | number, action: string) => {
            console.log(`Action ${action} clicked for key ${key}`)
          }}
        />
      </Content>
    </ContentLayout>
  )
}