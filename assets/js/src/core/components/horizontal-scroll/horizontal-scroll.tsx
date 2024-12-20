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

export const HorizontalScroll = ({ children, scrollWidth }: HorizontalScrollProps): React.JSX.Element => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const scrollAmount = 50
  const scrollSpeed = 30
  const [scrollInterval, setScrollInterval] = useState<number | null>(null)
  const [isAtStart, setIsAtStart] = useState(true)
  const [isAtEnd, setIsAtEnd] = useState(false)
  const [scrollRequired, setScrollRequired] = useState(false)
  const [hideElement, setHideElement] = useState(false)
  const { styles } = useStyles({ scrollWidth, hideElement })

  const updateScrollState = (): void => {
    if (scrollContainerRef.current !== null) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current

      setIsAtStart(scrollLeft === 0)
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth)
      setScrollRequired(scrollContainerRef.current.scrollWidth > scrollContainerRef.current.clientWidth)
      setHideElement(scrollContainerRef.current.clientWidth < 50)
    }
  }

  useEffect(() => {
    if (scrollContainerRef.current !== null) {
      updateScrollState()
      scrollContainerRef.current.addEventListener('scroll', updateScrollState)

      const resizeObserver = new ResizeObserver(() => {
        updateScrollState()
      })

      const mutationObserver = new MutationObserver(() => {
        updateScrollState()
      })

      resizeObserver.observe(scrollContainerRef.current)
      mutationObserver.observe(scrollContainerRef.current, { childList: true, subtree: true })

      return () => {
        scrollContainerRef.current?.removeEventListener('scroll', updateScrollState)
        resizeObserver.disconnect()
        mutationObserver.disconnect()
        setScrollInterval(null)
      }
    }
  }, [])

  const startScrolling = (direction: 'left' | 'right'): void => {
    if (scrollInterval === null) {
      // @ts-expect-error temporary
      const interval: number = setInterval(() => {
        if (scrollContainerRef.current !== null) {
          const scrollOffset = direction === 'left' ? -scrollAmount : scrollAmount
          scrollContainerRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' })
        }
      }, scrollSpeed)
      setScrollInterval(interval)
    }
  }

  const startScrollingLeft = (): void => { startScrolling('left') }
  const startScrollingRight = (): void => { startScrolling('right') }

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
      className={ ['horizontal-scroll', styles.scrollContainer].join(' ') }
    >
      {scrollRequired && (
        <IconButton
          disabled={ isAtStart }
          icon={ {
            value: 'chevron-left',
            options: { height: 18, width: 18 }
          } }
          onKeyDown={ (e) => {
            handleKeyDown(e, 'left')
          } }
          onKeyUp={ handleKeyUp }
          onMouseDown={ startScrollingLeft }
          onMouseLeave={ stopScrolling }
          onMouseUp={ stopScrolling }
          theme="secondary"
        />
      )}
      <Flex
        align={ 'center' }
        className={ [styles.scroll, 'w-full'].join(' ') }
        ref={ scrollContainerRef }
      >
        {children}
      </Flex>
      {
                scrollRequired && (
                <IconButton
                  disabled={ isAtEnd }
                  icon={ {
                    value: 'chevron-right',
                    options: { height: 18, width: 18 }
                  } }
                  onKeyDown={ (e) => {
                    handleKeyDown(e, 'right')
                  } }
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
