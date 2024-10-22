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
import { useStyles } from './horizontal-scroll.styles'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Flex } from 'antd'

export interface HorizontalScrollProps {
  children: React.ReactNode
  scrollWidth?: number
}

export const HorizontalScroll = ({ children, scrollWidth = 200 }: HorizontalScrollProps): React.JSX.Element => {
  const { styles } = useStyles({ scrollWidth })
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const scrollAmount = 50
  const scrollSpeed = 30
  const [scrollInterval, setScrollInterval] = useState<NodeJS.Timeout | null>(null)
  const [isAtStart, setIsAtStart] = useState(true)
  const [isAtEnd, setIsAtEnd] = useState(false)
  const [scrollRequired, setScrollRequired] = useState(false)

  const updateScrollState = (): void => {
    if (scrollContainerRef.current !== null) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current

      setIsAtStart(scrollLeft === 0)
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth)
      setScrollRequired(scrollContainerRef.current.scrollWidth > scrollContainerRef.current.clientWidth)
    }
  }

  useEffect(() => {
    if (scrollContainerRef.current !== null) {
      updateScrollState()
      scrollContainerRef.current.addEventListener('scroll', updateScrollState)

      const resizeObserver = new ResizeObserver(() => {
        updateScrollState()
      })

      resizeObserver.observe(scrollContainerRef.current)

      return () => {
        scrollContainerRef.current?.removeEventListener('scroll', updateScrollState)
        resizeObserver.disconnect()
      }
    }
  }, [])

  const startScrollingLeft = (): void => {
    if (scrollInterval === null) {
      const interval = setInterval(() => {
        if (scrollContainerRef.current !== null) {
          scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
        }
      }, scrollSpeed)
      setScrollInterval(interval)
    }
  }
  const startScrollingRight = (): void => {
    if (scrollInterval === null) {
      const interval = setInterval(() => {
        if (scrollContainerRef.current !== null) {
          scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
        }
      }, scrollSpeed)
      setScrollInterval(interval)
    }
  }

  const stopScrolling = (): void => {
    if (scrollInterval !== null) {
      clearInterval(scrollInterval)
      setScrollInterval(null)
    }
  }

  const handleKeyUp = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      stopScrolling()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent, direction: 'left' | 'right'): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      if (direction === 'left') {
        startScrollingLeft()
      } else if (direction === 'right') {
        startScrollingRight()
      }
    }
  }

  return (
    <Flex
      align={ 'center' }
      className={ styles.scrollContainer }
      justify={ 'center' }
    >
      { scrollRequired && (
      <IconButton
        disabled={ isAtStart }
        icon={ 'chevron-left' }
        iconOptions={ { height: 18, width: 18 } }
        onKeyDown={ (e) => { handleKeyDown(e, 'left') } }
        onKeyUp={ handleKeyUp }
        onMouseDown={ startScrollingLeft }
        onMouseLeave={ stopScrolling }
        onMouseUp={ stopScrolling }
        theme="secondary"
      />
      )}
      <Flex
        align={ 'center' }
        className={ styles.scroll }
        ref={ scrollContainerRef }
      >
        {children}
      </Flex>
      {scrollRequired && (
      <IconButton
        disabled={ isAtEnd }
        icon={ 'chevron-right' }
        iconOptions={ { height: 18, width: 18 } }
        onKeyDown={ (e) => { handleKeyDown(e, 'right') } }
        onKeyUp={ handleKeyUp }
        onMouseDown={ startScrollingRight }
        onMouseLeave={ stopScrolling }
        onMouseUp={ stopScrolling }
        theme="secondary"
      />
      )}
    </Flex>
  )
}
