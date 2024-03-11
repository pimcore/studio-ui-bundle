import React, { type ReactNode } from 'react'
import { useStyles } from '@Pimcore/modules/asset/types/folder/editor-tabs/tabs/preview/flex-container-view.styles'

interface FlexContainerProps {
  renderElements: ReactNode[]
}

const FlexContainerView = (props: FlexContainerProps): React.JSX.Element => {
  const { styles } = useStyles()
  return (
        <div className={styles.flexContainer}>
            {props.renderElements}
        </div>
  )
}

export { FlexContainerView }
