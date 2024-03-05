import React, { type ReactNode } from 'react'
import { useStyles } from './list-view.styles'

interface ListViewProps {
  renderGrid: ReactNode
  renderToolbar: ReactNode
}

const ListView = (props: ListViewProps): React.JSX.Element => {
  const { styles } = useStyles()

  return (
    <div className={['folder-listing', styles.folderListing].join(' ')}>
      <div className='folder-listing__grid'>
        {props.renderGrid}
      </div>

      <div className='folder-listing__toolbar'>
        {props.renderToolbar}
      </div>
    </div>
  )
}

export { ListView }
