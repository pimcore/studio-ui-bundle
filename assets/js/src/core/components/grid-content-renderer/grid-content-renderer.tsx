import React from "react"
import { useStyles } from "./grid-content-renderer.styles"

export interface GridContentRendererProps {
  children?: React.ReactNode
}

export const GridContentRenderer = ({ children }: GridContentRendererProps): React.JSX.Element => {
  const { styles } = useStyles()

  return (
    <div className={[styles.gridContentRenderer, 'grid-content-renderer'].join(' ')}>
      {children}
    </div>
  )
}
