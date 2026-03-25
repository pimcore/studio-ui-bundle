/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { useStyle } from './background.styles'
import { useAdminThumbnails } from '@Pimcore/modules/app/branding/hooks/use-admin-thumbnails'

const Background = (): React.JSX.Element => {
  const { styles } = useStyle()
  const { logoUrl } = useAdminThumbnails()

  return (
    <div
      className={ styles.background }
      data-testid="studio-background"
    >
      <div className='background-figure background-figure--bottom-left'></div>
      <div className='background-figure background-figure--bottom-right'></div>
      <div className='background-figure background-figure--top-left'></div>
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
