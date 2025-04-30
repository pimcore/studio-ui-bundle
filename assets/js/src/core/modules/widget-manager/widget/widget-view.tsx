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
import { TitleView } from './title/title-view'
import { useStyles } from './widget-view.styles'
import { useTranslation } from 'react-i18next'
import { useCssContainer, type UseCssContainerProps } from '@Pimcore/utils/hooks/use-css-container/use-css-container'
import { type ElementIcon } from '@Pimcore/modules/asset/asset-api-slice.gen'

interface WidgetViewProps {
  title: string
  showTitle?: boolean
  icon: ElementIcon
  children: React.ReactNode
}

export const cssContainerWidget: UseCssContainerProps = {
  name: 'widget'
}

export const WIDGET_CONTENT_CLASS = 'widget__content'

const WidgetView = (props: WidgetViewProps): React.JSX.Element => {
  const { styleDefinition } = useCssContainer(cssContainerWidget)
  const { styles } = useStyles()
  const { title, showTitle, icon, children } = props
  const { t } = useTranslation()

  return (
    <div className={ ['widget', styles.Widget, styleDefinition.styles.container].join(' ') }>
      {showTitle === true && (
        <TitleView
          className={ 'widget__title' }
          icon={ icon }
          title={ t(title) }
        />
      )}

      <div className={ WIDGET_CONTENT_CLASS }>
        {children}
      </div>
    </div>
  )
}

const memorizedWidgetView = React.memo(WidgetView)

export { memorizedWidgetView as WidgetView }
