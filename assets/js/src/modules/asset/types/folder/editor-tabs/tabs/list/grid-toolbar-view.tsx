import React, { type ReactNode } from 'react'
import { useStyles } from './grid-toolbar-view.styles'

export interface GridToolbarViewProps {
  renderPagination: ReactNode
}

const GridToolbarView = (props: GridToolbarViewProps): React.JSX.Element => {
  const { styles } = useStyles()

  return (
    <div className={ styles.GridToolbar }>
      <div /> {/* @todo tools */}

      {props.renderPagination}
    </div>
  )
}

export { GridToolbarView }
