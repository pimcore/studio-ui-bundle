/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useEffect } from 'react'
import { isNil } from 'lodash'
import { iconClickMotionClass, iconClickMotionIcons } from '@Pimcore/styles/icon-motion.styles'

const controlSelector = '.ant-btn, .ant-dropdown-menu-item, [role="button"]'
const iconSelector = iconClickMotionIcons.map((icon) => `.pimcore-icon-${icon}`).join(', ')

/**
 * Plays the one-off click animation of action icons (see IconMotionGlobalStyles), e.g. a single turn
 * of the refresh icon. CSS alone can't start an animation on click, so a single delegated listener
 * marks the icon until its animation ends. Without an animation (reduced motion) nothing is marked.
 */
export const useIconClickMotion = (): void => {
  useEffect(() => {
    const onClick = (event: MouseEvent): void => {
      if (!(event.target instanceof Element)) {
        return
      }

      const icon = event.target.closest(controlSelector)?.querySelector(iconSelector)

      if (isNil(icon)) {
        return
      }

      icon.classList.remove(iconClickMotionClass)
      // restart the animation when clicking again before it has finished
      void (icon as HTMLElement).offsetWidth
      icon.classList.add(iconClickMotionClass)

      icon.addEventListener('animationend', () => {
        icon.classList.remove(iconClickMotionClass)
      }, { once: true })
    }

    document.addEventListener('click', onClick, true)

    return () => {
      document.removeEventListener('click', onClick, true)
    }
  }, [])
}
