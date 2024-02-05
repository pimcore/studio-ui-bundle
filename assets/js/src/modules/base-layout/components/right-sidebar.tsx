import { Logo } from '@Pimcore/components/logo/logo'
import React from 'react'
import { useStlyes } from './right-sidebar.styles'

export const RightSidebar = (): React.JSX.Element => {
  const { styles } = useStlyes()

  return (
    <div className={styles.rightSidebar}>
      <Logo />
    </div>
  )
}
