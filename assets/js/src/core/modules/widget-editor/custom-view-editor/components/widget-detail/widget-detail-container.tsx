import { Content, ContentLayout, IconButton, Toolbar } from "@sdk/components"
import React from "react"

export const WidgetDetailContainer = (): React.JSX.Element => {
  return (
    <ContentLayout
      renderToolbar={(
        <Toolbar justify="space-between">
          <IconButton
            icon={{ value: 'refresh' }}
            title="Refresh"
          />
        </Toolbar>
      )}
    >
      <Content padded>
        <p>Here i am :D - finally</p>
      </Content>
    </ContentLayout>
  )
}