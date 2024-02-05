import React from 'react'
import PimcoreLogo from '@Pimcore/assets/images/pimcore.inline.svg'
import { useStlyes } from './logo.styles'

export const Logo = (): React.JSX.Element => {
  const { styles } = useStlyes()

  return (
    <div className={['logo', styles.logo].join(' ')}>
      <PimcoreLogo width={24} height={24} color='#333' fill='#ff0000' />
    </div>
  )
}
