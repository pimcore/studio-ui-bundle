/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ComponentType } from 'react'
import { useStyles } from './widget-view.styles'
import { useCssContainer, type UseCssContainerProps } from '@Pimcore/utils/hooks/use-css-container/use-css-container'
import { type ElementIcon } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { type TabNode } from 'flexlayout-react'
import { type WidgetContentTitleContainerProps, WidgetContentTitleContainer } from './widget-content-title-container'

interface WidgetViewProps {
  title: string
  showTitle?: boolean
  icon: ElementIcon
  node: TabNode
  contentTitleComponent?: ComponentType<WidgetContentTitleContainerProps>
  children: React.ReactNode
}

export const cssContainerWidget: UseCssContainerProps = {
  name: 'widget'
}

export const WIDGET_CONTENT_CLASS = 'widget__content'

const WidgetView = (props: WidgetViewProps): React.JSX.Element => {
  const { styleDefinition } = useCssContainer(cssContainerWidget)
  const { styles } = useStyles()
  const { title, showTitle, icon, node, contentTitleComponent, children } = props

  return (
    <div className={ ['widget', styles.Widget, styleDefinition.styles.container].join(' ') }>
      {showTitle === true && (
        <WidgetContentTitleContainer
          contentTitleComponent={ contentTitleComponent }
          icon={ icon }
          node={ node }
          title={ title }
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
