/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React from 'react'
import PimcoreLogo from '@Pimcore/assets/images/pimcore.inline.svg'
import { useStlyes } from './logo.styles'

export const Logo = (): React.JSX.Element => {
  const { styles } = useStlyes()

  return (
    <div className={ ['logo', styles.logo].join(' ') }>
      <PimcoreLogo
        color='#333'
        fill='#ff0000'
        height={ 24 }
        width={ 24 }
      />
    </div>
  )
}
