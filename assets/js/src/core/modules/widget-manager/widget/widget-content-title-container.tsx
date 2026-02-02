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
import { type ElementIcon } from '@sdk/components'
import { TitleView } from './title/title-view'
import { useWidgetManager } from '../hooks/use-widget-manager'
import { type IconColorGroup } from '@Pimcore/components/icon/icon-color-groups-registry'

export interface WidgetContentTitleContainerProps {
  node: TabNode
  icon: ElementIcon
  title: string
  iconColorGroup?: IconColorGroup
}

interface WidgetContentTitleProps {
  contentTitleComponent?: ComponentType<WidgetContentTitleContainerProps>
  node: TabNode
  icon: ElementIcon
  title: string
  iconColorGroup?: IconColorGroup
}

export const WidgetContentTitleContainer = ({
  contentTitleComponent: ContentTitleComponent,
  node,
  icon,
  title,
  iconColorGroup
}: WidgetContentTitleProps): React.JSX.Element => {
  const { closeWidget } = useWidgetManager()
  const isCloseable = node.isEnableClose()

  const onClose = (): void => {
    closeWidget(node.getId())
  }

  return (
    <>
      {ContentTitleComponent !== undefined
        ? (
          <ContentTitleComponent
            icon={ icon }
            iconColorGroup={ iconColorGroup }
            node={ node }
            title={ title }
          />
          )
        : (
          <TitleView
            className={ 'widget__title' }
            icon={ icon }
            iconColorGroup={ iconColorGroup }
            onClose={ isCloseable ? onClose : undefined }
            title={ title }
          />
          )
      }
    </>
  )
}
