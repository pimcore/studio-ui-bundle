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

import React, { useEffect, useRef, useState, type ReactElement, type CSSProperties } from 'react'
import { Breadcrumb as AntBreadcrumb, type MenuItemProps, type BreadcrumbProps as AntBreadcrumbProps } from 'antd'
import { type BreadcrumbItemType, type ItemType } from 'antd/es/breadcrumb/Breadcrumb'
import cn from 'classnames'
import { useAppDispatch } from '@Pimcore/app/store'
import { api as elementApi } from '@Pimcore/modules/element/element-api-slice.gen'
import { useElementHelper } from '@Pimcore/modules/element/hooks/use-element-helper'
import { Text } from '@Pimcore/components/text/text'
import { useBreadcrumbSize } from './hooks/use-breadcrumb-size'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { useStyle } from './breadcrumb.styles'
import { Filename } from '../filename/filename'

export { useBreadcrumbSize }

interface BreadcrumbProps {
  path: string
  elementType: ElementType
  editorTabsWidth?: number
  pageSize?: 'S' | 'L' | null
}

export const Breadcrumb = ({ path, elementType, editorTabsWidth, pageSize }: BreadcrumbProps): React.JSX.Element => {
  const dispatch = useAppDispatch()
  const hasFilename = elementType === 'asset'

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

  const { isHideBreadcrumb, currentBreadcrumbWidth } = useBreadcrumbSize(editorTabsWidth, initialBreadcrumbLastElementWidth)

  let items: NonNullable<AntBreadcrumbProps['items']> = []

  // Handle click event for intermediate parts of breadcrumb
  const handleMenuItemClick = (path: string): void => {
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

  function getBreadcrumbItems (path: string): AntBreadcrumbProps['items'] {
    // Split to check if it has more that just a single key
    const partList = path.split('/')
    const partListAmount = partList.length

    // Generate the breadcrumb text with ellipsis
    const generateBreadcrumbText = ({ content, style, className, hasFilename = false }: { content: string, style?: CSSProperties, className?: string, hasFilename?: boolean }): ReactElement => {
      if (hasFilename) {
        return (
          <Filename
            className={ cn(styles.breadcrumbLink, className) }
            ellipsis
            style={ style }
            value={ content }
          />
        )
      }

      return (
        <Text
          className={ cn(styles.breadcrumbLink, className) }
          ellipsis={ { tooltip: { title: content } } }
          style={ style }
        >
          {content}
        </Text>
      )
    }

    // Prepend the "..." menu to the existing items array
    const addDotsMenu = ({ dotsMenuItems, items }: { dotsMenuItems: MenuItemProps[], items: BreadcrumbItemType[] }): ItemType[] => [
      {
        title: '...',
        menu: { items: dotsMenuItems, className: styles.dropdownMenu }
      },
      ...items
    ]

    if (partListAmount > 2 && pageSize === 'L') {
      items.push({
        title: generateBreadcrumbText({ content: partList[partListAmount - 2], style: { maxWidth: '100px' } }),
        className: styles.pathItem,
        onClick: () => {
          handleMenuItemClick(partList.slice(0, partListAmount - 1).join('/'))
        }
      })

      if (partListAmount > 3) {
        const dotsMenuItems: MenuItemProps[] = []
        for (let i = 1; i < partListAmount - 2; i++) {
          dotsMenuItems.push({
            title: (
              partList[i]
            ),
            onClick: () => {
              handleMenuItemClick(partList.slice(0, i + 1).join('/'))
            }
          })
        }

        items = addDotsMenu({ dotsMenuItems, items })
      }
    }

    if (partListAmount > 2 && pageSize !== 'L') {
      const dotsMenuItems: MenuItemProps[] = []

      for (let i = 1; i < partListAmount; i++) {
        dotsMenuItems.push({
          title: (
            partList[i]
          ),
          onClick: () => {
            handleMenuItemClick(partList.slice(0, i + 1).join('/'))
          }
        })
      }

      items = addDotsMenu({ dotsMenuItems, items })
    }

    // Add the last item of the breadcrumb
    items.push({
      title: (
        <span ref={ breadcrumbElementRef }>
          {generateBreadcrumbText({
            content: partList[partListAmount - 1],
            style: { ...(isHideBreadcrumb && { maxWidth: `${currentBreadcrumbWidth}px` }) },
            className: styles.breadcrumbLinkLast,
            hasFilename
          })}
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
