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
import { type TabNode } from 'flexlayout-react'
import { type ElementIcon } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { TitleView } from './title/title-view'

export interface WidgetContentTitleContainerProps {
  node: TabNode
  icon: ElementIcon
  title: string
}

interface WidgetContentTitleProps {
  contentTitleComponent?: ComponentType<WidgetContentTitleContainerProps>
  node: TabNode
  icon: ElementIcon
  title: string
}

export const WidgetContentTitleContainer = ({
  contentTitleComponent: ContentTitleComponent,
  node,
  icon,
  title
}: WidgetContentTitleProps): React.JSX.Element => {

  return (
    <>
      {ContentTitleComponent !== undefined
        ? (
          <ContentTitleComponent
            icon={ icon }
            node={ node }
            title={ title }
          />
          )
        : (
          <TitleView
            className={ 'widget__title' }
            icon={ icon }
            title={ title }
          />
          )
      }
    </>
  )
}
