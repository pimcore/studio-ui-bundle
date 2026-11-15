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

interface AssetTargetMockProps {
  onSearch?: () => void
  onUpload?: () => void
  onRemove?: () => void
}

/**
 * Stand-in for the real AssetTarget: its context menu is built from whichever callbacks it receives,
 * so exposing each callback as a labelled item lets tests assert which actions a field offers.
 */
export const AssetTarget = ({ onSearch, onUpload, onRemove }: AssetTargetMockProps): React.JSX.Element => (
  <div data-testid="asset-target">
    {onSearch !== undefined && (
    <button
      onClick={ onSearch }
      type="button"
    >search</button>
    )}
    {onUpload !== undefined && (
    <button
      onClick={ onUpload }
      type="button"
    >upload</button>
    )}
    {onRemove !== undefined && (
    <button
      onClick={ onRemove }
      type="button"
    >remove</button>
    )}
  </div>
)
