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
import { type ElementType } from 'types/element-type.d'
import { useElementHelper } from '@Pimcore/modules/element/hooks/use-element-helper'
import { Text } from '@Pimcore/components/text/text'

export const Breadcrumb = ({ path, elementType }: { path: string, elementType: ElementType }): React.JSX.Element => {
  const { styles } = useStyle()
  const { openElement } = useElementHelper()
  let items: NonNullable<BreadcrumbProps['items']> = []
  const dispatch = useAppDispatch()

  function getBreadcrumbItems (path: string): BreadcrumbProps['items'] {
    // split to check if it has more that just a single key
    const partList = path.split('/')
    const partListAmount = partList.length

    function onMenuItemClick (path: string): void {
      const elementIdFetcher = dispatch(elementApi.endpoints.elementGetIdByPath.initiate({
        elementType,
        elementPath: path
      }))

      elementIdFetcher
        .then(({ data }) => {
          if (data !== undefined) {
            openElement({
              id: data.id,
              type: elementType
            }).catch(() => {})
          }
        })
        .catch(() => {})
    }

    if (partListAmount > 2) {
      items.push({
        title: (
          <Text
            ellipsis={ { tooltip: { title: partList[partListAmount - 2], placement: 'top' } } }
            style={ { maxWidth: '100px' } }
          >
            {partList[partListAmount - 2]}
          </Text>
        ),
        className: styles.pathItem,
        onClick: () => {
          onMenuItemClick(partList.slice(0, partListAmount - 1).join('/'))
        }
      })

      if (partListAmount > 3) {
        const dotsMenuItems: MenuItemType[] = []
        for (let i = 1; i < partListAmount - 2; i++) {
          dotsMenuItems.push({
            key: i,
            label: (
              partList[i]
            ),
            onClick: () => {
              onMenuItemClick(partList.slice(0, i + 1).join('/'))
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
    items.push({
      title: (
        <Text
          ellipsis={ { tooltip: { title: partList[partListAmount - 1], placement: 'top' } } }
          style={ { maxWidth: '150px' } }
        >
          {partList[partListAmount - 1]}
        </Text>
      )
    })

    return items
  }

  return (
    <AntBreadcrumb
      className={ styles.breadcrumb }
      items={ getBreadcrumbItems(path) }
    />
  )
}
