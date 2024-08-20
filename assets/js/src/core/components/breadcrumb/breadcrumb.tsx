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
import { useAppDispatch } from '@Pimcore/app/store'
import { api as elementApi } from '@Pimcore/modules/element/element-api-slice.gen'
import { useAsset } from '@Pimcore/modules/asset/hooks/use-asset'

export const Breadcrumb = ({ path }: { path: string }): React.JSX.Element => {
  const { styles } = useStyle()
  const { openAsset } = useAsset()
  let items: NonNullable<BreadcrumbProps['items']> = []
  const dispatch = useAppDispatch()

  function getBreadcrumbItems (path: string): BreadcrumbProps['items'] {
    // split to check if it has more that just the key
    const parts = path.split('/')

    function onMenuItemClick (path: string): void {
      const elementIdFetcher = dispatch(elementApi.endpoints.elementGetIdByPath.initiate({
        elementType: 'asset',
        elementPath: path
      }))

      elementIdFetcher
        .then(({ data }) => {
          if (data !== undefined) {
            openAsset({
              config: {
                id: data.id
              }
            })
          }
        })
        .catch(() => {})
    }

    if (parts.length > 2) {
      items.push({
        title: parts[parts.length - 2],
        className: styles.pathItem,
        onClick: () => {
          onMenuItemClick(parts.slice(0, parts.length - 1).join('/'))
        }
      })

      if (parts.length > 3) {
        const dotsMenuItems: MenuItemType[] = []
        for (let i = 1; i < parts.length - 2; i++) {
          dotsMenuItems.push({
            key: i,
            label: (
              parts[i]
            ),
            onClick: () => {
              onMenuItemClick(parts.slice(0, i + 1).join('/'))
            }
          })
        }

        items = [
          {
            title: '...',
            menu: { items: dotsMenuItems }
          },
          ...items
        ]
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
