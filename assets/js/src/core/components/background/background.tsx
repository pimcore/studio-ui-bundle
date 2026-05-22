/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useStyle } from './background.styles'
import { useAdminThumbnails } from '@Pimcore/modules/app/branding/hooks/use-admin-thumbnails'
import { getAdminSettings } from '@Pimcore/modules/app/settings/settings-slice'
import { type LoadPhase } from '@Pimcore/modules/app/app-loader/app-loader'

export interface BackgroundProps {
  phase?: LoadPhase
}

const Background = ({ phase = 'idle' }: BackgroundProps): React.JSX.Element => {
  const adminSettings = useSelector(getAdminSettings)
  const backgroundShade = adminSettings?.branding?.backgroundShade ?? ''
  const { styles } = useStyle({ phase, backgroundShade })
  const { logoUrl } = useAdminThumbnails()

  useEffect(() => {
    requestAnimationFrame(() => {
      const preloader = document.getElementById('app-preloader')
      if (preloader !== null) {
        preloader.classList.add('app-preloader--fading')
        preloader.addEventListener('transitionend', () => { preloader.remove() }, { once: true })
      }
    })
  }, [])

  return (
    <div
      className={ styles.background }
      data-testid="studio-background"
    >
      <div className='background-figure background-figure--bottom-left'></div>
      <div className='background-figure background-figure--bottom-right'></div>
      <div className='background-figure background-figure--top-left'></div>
      <div className={ styles.logoOrbitCW } />
      <div className={ styles.logoOrbitCCW } />
      <div className={ styles.backdropBlur } />
      <img
        alt="Logo"
        className={ styles.logoImage }
        data-testid="studio-background-logo"
        src={ logoUrl }
      />
    </div>
  )
}

export { Background }
