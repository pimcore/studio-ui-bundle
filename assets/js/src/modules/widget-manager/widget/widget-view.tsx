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
import { TitleView } from './title/title-view'
import { useStyles } from './widget-view.styles'
import { useTranslation } from 'react-i18next'

interface WidgetViewProps {
  title: string
  showTitle?: boolean
  icon: string
  children: React.ReactNode
}

const WidgetView = (props: WidgetViewProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { title, showTitle, icon, children } = props
  const { t } = useTranslation()

  return (
    <div className={ ['widget', styles.Widget].join(' ') }>
      {showTitle === true && (
        <TitleView
          icon={ icon }
          title={ t(title) }
        />
      )}

      <div className='widget__content'>
        {children}
      </div>
    </div>
  )
}

export { WidgetView }
