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
import { useStyles } from './icon-view.styles'
import { Icon, type IconProps } from '@Pimcore/components/icon/icon'

const IconView = (props: IconProps): React.JSX.Element => {
  const { styles } = useStyles()

  return (
    <div className={ [styles['icon-view'], 'default-cell__content'].join(' ') }>
      <Icon { ...props } />
    </div>
  )
}

export { IconView }
