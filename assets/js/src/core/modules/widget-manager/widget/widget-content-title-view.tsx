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
import { type TabNode } from 'flexlayout-react'
import { TitleView } from './title/title-view'
import { type IconProps } from '@Pimcore/components/icon/icon'

export interface WidgetContentTitleViewProps {
  node: TabNode
  icon: IconProps
  title: string
}

/**
 * Widget content title view component for SDK usage.
 * Renders a TitleView with the provided title without translation.
 */
export const WidgetContentTitleView = ({
  icon,
  title
}: WidgetContentTitleViewProps): React.JSX.Element => {
  return (
    <TitleView
      className="widget__title"
      icon={ icon }
      title={ title }
    />
  )
}
