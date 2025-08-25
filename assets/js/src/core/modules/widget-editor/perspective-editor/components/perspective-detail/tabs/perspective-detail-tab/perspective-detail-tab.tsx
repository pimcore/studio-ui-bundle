import { Content } from "@Pimcore/components/content/content"
import { usePerspectiveEditorContext } from "@Pimcore/modules/widget-editor/perspective-editor/context/hooks/use-perspective-editor-context"
import React from "react"

interface PerspectiveDetailTabProps {
  id: string | undefined
}

export const PerspectiveDetailTab = ({ id }: PerspectiveDetailTabProps): React.JSX.Element => {
  const { perspectives } = usePerspectiveEditorContext()
  const perspective = perspectives.find(p => p.id === id)

  if (perspective === undefined) {
    return <></>
  }

  return (
    <Content padded>
      <p>{`You opened the perspective with id ${perspective.id}`}</p>
    </Content>
  )
}