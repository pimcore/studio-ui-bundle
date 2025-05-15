/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Icon } from '@Pimcore/components/icon/icon'
import React from 'react'
import { useStyles } from './title-view.styles'
import { type ElementIcon } from '@Pimcore/modules/asset/asset-api-slice.gen'

interface TitleViewProps {
  title: string
  icon: ElementIcon
  className?: string
}

const TitleView = (props: TitleViewProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { title, icon, className } = props

  return (
    <div className={ [styles.WidgetTitle, className, 'foobar'].join(' ') }>
      <Icon
        options={ {
          width: 18,
          height: 18
        } }
        { ...icon }
      />

      <span>{title}</span>
    </div>
  )
}

export { TitleView }
