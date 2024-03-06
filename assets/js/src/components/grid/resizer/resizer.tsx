import React from 'react'
import { useStyles } from './resizer.styles'
import { type Table } from '@tanstack/react-table'

interface ResizerProps {
  onMouseDown?: (event: unknown) => void
  isResizing: boolean
  table: Table<any>
}

const Resizer = (props: ResizerProps): React.JSX.Element => {
  const { styles } = useStyles()
  const classes = ['grid__resizer']

  classes.push(styles.resizer)

  if (props.onMouseDown !== undefined) {
    classes.push('grid__resizer--hoverable')
  }

  if (props.isResizing) {
    classes.push('grid__resizer--resizing')
  }

  return (
    <div
      onMouseDown={props.onMouseDown}
      className={classes.join(' ')}
      style={{
        transform:
          props.isResizing
            ? `translateX(${
                (props.table.options.columnResizeDirection ===
                'rtl'
                  ? -1
                  : 1) *
                (props.table.getState().columnSizingInfo
                  .deltaOffset ?? 0)
              }px)`
            : ''
      }}
    />
  )
}

export { Resizer }
