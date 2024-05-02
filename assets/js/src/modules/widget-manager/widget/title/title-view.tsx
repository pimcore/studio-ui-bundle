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

import { Icon } from '@Pimcore/components/icon/icon'
import React from 'react'
import { useStyles } from './title-view.styles'

interface TitleViewProps {
  title: string
  icon: string
  className?: string
}

const TitleView = (props: TitleViewProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { title, icon } = props

  return (
    <div className={ styles.WidgetTitle }>
      <Icon
        name={ icon }
        options={ {
          width: 18,
          height: 18
        } }
      />

      <span>{title}</span>
    </div>
  )
}

export { TitleView }
