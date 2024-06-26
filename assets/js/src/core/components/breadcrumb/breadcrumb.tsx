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
import { Breadcrumb as AntBreadcrumb, type BreadcrumbProps } from 'antd'
import { type MenuItemType } from 'antd/es/menu/hooks/useItems'
import { useStyle } from './breadcrumb.styles'

export const Breadcrumb = ({ path }: { path: string }): React.JSX.Element => {
  const { styles } = useStyle()
  const items: NonNullable<BreadcrumbProps['items']> = []

  function getBreadcrumbItems (path: string): BreadcrumbProps['items'] {
    // split to check if it has more that just the key
    const parts = path.split('/')

    if (parts.length > 2) {
      items.push({ title: parts[1] })

      if (parts.length > 3) {
        const dotsMenuItems: MenuItemType[] = []

        for (let i = 2; i < parts.length - 1; i++) {
          dotsMenuItems.push({
            key: i,
            label: (
              parts[i]
            )
          })
        }

        items.push({
          title: '...',
          menu: { items: dotsMenuItems }
        })
      }
    }

    // key to breadcrumb
    items.push({ title: parts[parts.length - 1] })

    return items
  }

  return (
    <AntBreadcrumb
      className={ styles.breadcrumb }
      items={ getBreadcrumbItems(path) }
    />
  )
}
