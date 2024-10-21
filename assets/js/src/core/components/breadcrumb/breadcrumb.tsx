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
import { type ElementType } from 'types/element-type.d'
import { useStyle } from './breadcrumb.styles'

export const Breadcrumb = ({ path, elementType, editorTabsWidth }: { path: string, elementType: ElementType, editorTabsWidth?: number }): React.JSX.Element => {
  const [size, setSize] = useState<'S' | 'M' | 'L'>('L')

  const [isHideBreadcrumb, setIsHideBreadcrumb] = useState(false)
  const [initialBreadcrumbLastElementWidth, setInitialBreadcrumbLastElementWidth] = useState<number>(0)
  const [currentBreadcrumbWidth, setCurrentBreadcrumbWidth] = useState<number>(0)

  const breadcrumbElementRef = useRef<HTMLSpanElement>(null)

  console.log('----->>>> INITIAL: ', initialBreadcrumbLastElementWidth)
  console.log('----->>>> CURRENT: ', currentBreadcrumbWidth)
  console.log('----->>>> isHideBreadcrumb: ', isHideBreadcrumb)

  const { styles } = useStyle()
  const { openElement } = useElementHelper()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (editorTabsWidth == null) return

    if (initialBreadcrumbLastElementWidth === 0) {
      const initialBreadcrumbWidth = breadcrumbElementRef?.current?.offsetWidth ?? 0

      setInitialBreadcrumbLastElementWidth(initialBreadcrumbWidth)
    }

    console.log('----- editorTabsWidth: ', editorTabsWidth)

    if (editorTabsWidth <= 375) {
      console.log('------ 111111 -------')
      setIsHideBreadcrumb(true)
      setCurrentBreadcrumbWidth(50)
    }

    if (editorTabsWidth > 375 && editorTabsWidth <= 450) {
      setIsHideBreadcrumb(true)
      setCurrentBreadcrumbWidth(70)
    }

    if (editorTabsWidth > 450 && editorTabsWidth <= 550) {
      setIsHideBreadcrumb(true)
      setCurrentBreadcrumbWidth(100)
    }

    if (editorTabsWidth > 550 && editorTabsWidth <= 700) {
      setIsHideBreadcrumb(true)
      setCurrentBreadcrumbWidth(150)
    }

    if (editorTabsWidth > 700 && editorTabsWidth <= 800) {
      setIsHideBreadcrumb(true)
      setCurrentBreadcrumbWidth(200)
    }

    if (editorTabsWidth > 800 && editorTabsWidth <= 900) {
      setIsHideBreadcrumb(true)
      setCurrentBreadcrumbWidth(300)
    }

    if (editorTabsWidth > 900 && editorTabsWidth <= 1000) {
      setIsHideBreadcrumb(true)
      setCurrentBreadcrumbWidth(400)
    }

    if (editorTabsWidth > 1000 && editorTabsWidth <= 1100) {
      setIsHideBreadcrumb(true)
      setCurrentBreadcrumbWidth(500)
    }

    if (editorTabsWidth > 1100) {
      console.log('------ 333333333 -------')
      setIsHideBreadcrumb(false)
      setCurrentBreadcrumbWidth(initialBreadcrumbLastElementWidth)
    }

    if (editorTabsWidth < 550) {
      setSize('S')

      return
    }

    if (editorTabsWidth <= 800) {
      setSize('M')

      return
    }

    if (editorTabsWidth > 800) {
      setSize('L')
    }
  }, [editorTabsWidth])

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

    if (partListAmount > 2 && size === 'L') {
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

    if (partListAmount > 2 && size !== 'L') {
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
