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
import { Skeleton } from 'antd'

const SKELETON_ROWS = 3

export const LoadingRows = (): React.JSX.Element => (
  <>
    { Array.from({ length: SKELETON_ROWS }).map((_, i) => (
      <div
        key={ i }
        style={ { padding: '5px 12px', display: 'flex', alignItems: 'center' } }
      >
        <Skeleton.Input
          active
          block
          size="small"
        />
      </div>
    )) }
  </>
)

interface DropdownFooterProps {
  loaded: number
  total: number | undefined
  allLoaded: boolean
  backgroundMode: boolean
}

export const DropdownFooter = ({ loaded, total, allLoaded, backgroundMode }: DropdownFooterProps): React.JSX.Element | null => {
  // In background mode the loading is silent — no footer needed.
  // Once all items are loaded the footer is also not needed.
  if (loaded === 0 || allLoaded || backgroundMode || total === undefined) return null
  return (
    <div style={ {
      padding: '4px 12px',
      fontSize: '11px',
      color: '#999',
      borderTop: '1px solid #f0f0f0',
      textAlign: 'right'
    } }
    >
      { `Showing ${loaded} of ${total}` }
    </div>
  )
}
