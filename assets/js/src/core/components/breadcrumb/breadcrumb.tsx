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

import React, { useEffect, useRef, useState } from 'react'
import { Breadcrumb as AntBreadcrumb, type BreadcrumbProps } from 'antd'
import { type MenuItemType } from 'antd/es/menu/hooks/useItems'
import { CaretDownOutlined } from '@ant-design/icons'
import { useAppDispatch } from '@Pimcore/app/store'
import { api as elementApi } from '@Pimcore/modules/element/element-api-slice.gen'
import { useElementHelper } from '@Pimcore/modules/element/hooks/use-element-helper'
import { Text } from '@Pimcore/components/text/text'
import { useBreadcrumbSize } from './hooks/use-breadcrumb-size'
import { type ElementType } from 'types/element-type.d'
import { useStyle } from './breadcrumb.styles'

export const Breadcrumb = ({ path, elementType, editorTabsWidth }: { path: string, elementType: ElementType, editorTabsWidth?: number }): React.JSX.Element => {
  const dispatch = useAppDispatch()

  const [pageSize, setPageSize] = useState<'S' | 'L'>('L')
  const [initialBreadcrumbLastElementWidth, setInitialBreadcrumbLastElementWidth] = useState<number>(0)

  const breadcrumbElementRef = useRef<HTMLSpanElement>(null)
  const { openElement } = useElementHelper()

  const { styles } = useStyle()

  useEffect(() => {
    if (initialBreadcrumbLastElementWidth === 0) {
      const initialBreadcrumbWidth = breadcrumbElementRef?.current?.offsetWidth ?? 0

      setInitialBreadcrumbLastElementWidth(initialBreadcrumbWidth)
    }
  }, [])

  useEffect(() => {
    if (editorTabsWidth == null) return

    editorTabsWidth <= 800 ? setPageSize('S') : setPageSize('L')
  }, [editorTabsWidth])

  const { isHideBreadcrumb, currentBreadcrumbWidth } = useBreadcrumbSize(editorTabsWidth, initialBreadcrumbLastElementWidth)

  let items: NonNullable<BreadcrumbProps['items']> = []

  function getBreadcrumbItems (path: string): BreadcrumbProps['items'] {
    // Split to check if it has more that just a single key
    const partList = path.split('/')
    const partListAmount = partList.length

    // Handle click event for intermediate parts
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

    if (partListAmount > 2 && pageSize === 'L') {
      items.push({
        title: (
          <Text
            className={ styles.breadcrumbLink }
            ellipsis={ { tooltip: { title: partList[partListAmount - 2], placement: 'top' } } }
            style={ { maxWidth: '150px' } }
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
            className: styles.dropdownItem,
            label: (
              partList[i]
            ),
            onClick: () => {
              onMenuItemClick(partList.slice(0, i + 1).join('/'))
            }
          })
        }

        // Prepend the "..." menu to the existing items array
        items = [
          {
            title: '...',
            menu: { items: dotsMenuItems }
          },
          ...items
        ]
      }
    }

    if (partListAmount > 2 && pageSize !== 'L') {
      const dotsMenuItems: MenuItemType[] = []

      for (let i = 1; i < partListAmount; i++) {
        const isFirstItem = i === 1
        const isLastItem = i === partListAmount - 1
        const paddingSize = 24

        dotsMenuItems.push({
          key: i,
          className: styles.dropdownItem,
          label: (
            partList[i]
          ),
          onClick: () => {
            onMenuItemClick(partList.slice(0, i + 1).join('/'))
          },
          ...(!isFirstItem && { style: { paddingLeft: `${paddingSize * (i - 1)}px` } }),
          ...(!isLastItem && { icon: <CaretDownOutlined /> })
        })
      }

      // Prepend the "..." menu to the existing items array
      items = [
        {
          title: '...',
          menu: { items: dotsMenuItems }
        },
        ...items
      ]
    }

    // Add the last item of the breadcrumb
    items.push({
      title: (
        <span ref={ breadcrumbElementRef }>
          <Text
            ellipsis={ { tooltip: { title: partList[partListAmount - 1], placement: 'top' } } }
            style={ { ...(isHideBreadcrumb && { maxWidth: `${currentBreadcrumbWidth}px` }) } }
          >
            {partList[partListAmount - 1]}
          </Text>
        </span>
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
