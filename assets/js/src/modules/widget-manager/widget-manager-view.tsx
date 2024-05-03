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
import { Layout, type ILayoutProps } from 'flexlayout-react'
import { useStlyes } from './widget-manager-view.styles'

export interface WidgetManagerProps extends ILayoutProps {
  className?: string
}

export const WidgetManagerView = ({ className, ...props }: WidgetManagerProps): React.JSX.Element => {
  const { styles } = useStlyes()

  return (
    <div className={ ['widget-manager', className, styles.widgetManager].join(' ') }>
      <Layout { ...props } />
    </div>
  )
}
