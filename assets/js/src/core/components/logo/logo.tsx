/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
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
