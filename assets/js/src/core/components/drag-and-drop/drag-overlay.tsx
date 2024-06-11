import React from 'react'
import { DragAndDropInfo } from "./context-provider"
import { Icon } from '../icon/icon'
import { useStyle } from './drag-overlay.styles'

export interface DragOverlayProps {
  info: DragAndDropInfo
}

export const DragOverlay = (props: DragOverlayProps): React.JSX.Element => {
  const {styles} = useStyle();

  return (
    <div className={ ['dnd__overlay', styles.dragOverlay].join(' ') }>
      <Icon name={props.info.icon} /> {props.info.title}
    </div>
  )
}
