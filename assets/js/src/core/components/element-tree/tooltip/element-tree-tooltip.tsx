/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Tooltip } from '../../tooltip/tooltip'
import { type TreeNodeProps } from '../node/tree-node'
import { Box } from '@Pimcore/components/box/box'
import { Image } from '@Pimcore/components/image/image'
import { Flex } from '@Pimcore/components/flex/flex'
import { useTranslation } from 'react-i18next'
import { type DragInfoChangeEvent } from '@Pimcore/components/drag-and-drop/draggable'
import { isNull } from 'lodash'
import { Skeleton } from 'antd'

export interface ElementTreeTooltipProps {
  node: TreeNodeProps
  children: React.ReactNode
}

export const ElementTreeTooltip = ({ node, children }: ElementTreeTooltipProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [isTooltipOpen, setIsTooltipOpen] = useState(false)
  const [isDragActive, setIsDragActive] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseEnterTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const mouseCheckIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const lastMousePositionRef = useRef({ x: 0, y: 0 })

  const element: Record<string, any> | undefined = node.metaData?.asset ?? node.metaData?.dataObject ?? node.metaData?.document
  const isAsset = node.metaData?.asset !== undefined
  const isObject = node.metaData?.dataObject !== undefined
  const hasTooltip = element?.customAttributes?.tooltip !== null && element?.customAttributes?.tooltip !== undefined
  const imageThumbnailPath: string | undefined = element?.imageThumbnailPath

  useEffect(() => {
    setIsImageLoaded(false)
  }, [imageThumbnailPath])

  // Listen for global drag state changes
  useEffect(() => {
    const handleDragInfoChange = (event: DragInfoChangeEvent): void => {
      const isDragging = !isNull(event.detail)
      setIsDragActive(isDragging)

      // Close tooltip immediately when drag starts
      if (isDragging) {
        closeTooltip()
      }
    }

    window.addEventListener('studioui:draggable:change-drag-info', handleDragInfoChange as EventListener)

    return () => {
      window.removeEventListener('studioui:draggable:change-drag-info', handleDragInfoChange as EventListener)
      cleanupTimeouts()
    }
  }, [])

  const cleanupTimeouts = useCallback(() => {
    if (mouseEnterTimeoutRef.current !== null) {
      clearTimeout(mouseEnterTimeoutRef.current)
      mouseEnterTimeoutRef.current = null
    }
    if (mouseCheckIntervalRef.current !== null) {
      clearInterval(mouseCheckIntervalRef.current)
      mouseCheckIntervalRef.current = null
    }
  }, [])

  const closeTooltip = useCallback(() => {
    setIsTooltipOpen(false)
    cleanupTimeouts()
  }, [cleanupTimeouts])

  const isMouseOverElement = useCallback((): boolean => {
    if (containerRef.current === null) return false

    const rect = containerRef.current.getBoundingClientRect()
    const { x: mouseX, y: mouseY } = lastMousePositionRef.current

    return (
      mouseX >= rect.left &&
      mouseX <= rect.right &&
      mouseY >= rect.top &&
      mouseY <= rect.bottom
    )
  }, [])

  const startMousePositionCheck = useCallback(() => {
    // Start checking mouse position every 100ms when tooltip is open
    mouseCheckIntervalRef.current = setInterval(() => {
      if (!isMouseOverElement()) {
        closeTooltip()
      }
    }, 100)
  }, [isMouseOverElement, closeTooltip])

  const handleMouseEnter = useCallback(() => {
    // Don't show tooltip if dragging is active
    if (isDragActive) return

    cleanupTimeouts()

    // Set timeout to match Ant Design's mouseEnterDelay
    mouseEnterTimeoutRef.current = setTimeout(() => {
      setIsTooltipOpen(true)
      startMousePositionCheck()
    }, 500)
  }, [isDragActive, cleanupTimeouts, startMousePositionCheck])

  const handleMouseLeave = useCallback(() => {
    closeTooltip()
  }, [closeTooltip])

  // Global mouse move listener for additional safety
  useEffect(() => {
    const handleGlobalMouseMove = (event: MouseEvent): void => {
      // Update last known mouse position
      lastMousePositionRef.current = { x: event.clientX, y: event.clientY }

      if (!isTooltipOpen || containerRef.current === null) return

      const rect = containerRef.current.getBoundingClientRect()
      const { clientX, clientY } = event

      // Add small buffer zone around the element (10px)
      const buffer = 10
      const isInBufferZone = (
        clientX >= rect.left - buffer &&
        clientX <= rect.right + buffer &&
        clientY >= rect.top - buffer &&
        clientY <= rect.bottom + buffer
      )

      if (!isInBufferZone) {
        closeTooltip()
      }
    }

    document.addEventListener('mousemove', handleGlobalMouseMove, { passive: true })

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove)
    }
  }, [isTooltipOpen, closeTooltip])

  const tooltipTitle = (
    <>
      <div>{t('ID')}: {node.id}</div>
      <div>{t('Type')}: {isObject && (node.type === 'object' || node.type === 'variant') ? t(node.metaData.dataObject.className as string) : t(node.type!)}</div>
    </>
  )

  return (
    <div
      onMouseEnter={ handleMouseEnter }
      onMouseLeave={ handleMouseLeave }
      ref={ containerRef }
    >
      <Tooltip
        open={ isTooltipOpen }
        overlayStyle={ { width: 280 } }
        placement="right"
        title={
          <Box padding={ 'extra-small' }>
            {isAsset && element?.imageThumbnailPath !== undefined && (
            <Box
              className="w-full"
              padding={ { bottom: 'extra-small' } }
            >
              <Flex
                className="w-full"
                justify="center"
                style={ { maxHeight: 200, overflow: 'hidden' } }
              >
                {!isImageLoaded && (
                  <Skeleton.Image
                    active
                    style={ { width: 248, height: 150 } }
                  />
                )}
                <Image
                  alt={ element.filename }
                  onLoad={ () => { setIsImageLoaded(true) } }
                  src={ element.imageThumbnailPath }
                  style={ { maxHeight: 200, display: isImageLoaded ? undefined : 'none' } }
                />
              </Flex>
            </Box>
            )}

            {hasTooltip
              ? (
                <div dangerouslySetInnerHTML={ { __html: element.customAttributes.tooltip } } />
                )
              : (
                  tooltipTitle
                )}
          </Box>
        }
      >
        {children}
      </Tooltip>
    </div>
  )
}
