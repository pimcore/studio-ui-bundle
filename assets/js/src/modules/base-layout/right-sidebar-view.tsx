import { Logo } from '@Pimcore/components/logo/logo'
import React from 'react'
import { useStlyes } from './right-sidebar-view.styles'

export const RightSidebarView = (): React.JSX.Element => {
  const { styles } = useStlyes()

  return (
    <div className={styles.rightSidebar}>
      <Logo />
    </div>
  )
}
