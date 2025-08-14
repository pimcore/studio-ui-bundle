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
import { ToolStrip } from '@Pimcore/components/toolstrip/tool-strip'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { useBlockEditableStyles } from '../../block-editable.styles'

export interface EmptyStateBlockToolbarProps {
  onClick: () => void
}

export const EmptyStateBlockToolbar = ({
  onClick
}: EmptyStateBlockToolbarProps): React.JSX.Element => {
  const { styles } = useBlockEditableStyles()

  return (
    <ToolStrip className={ styles.blockToolstrip } theme="inverse">
      <IconButton
        icon={ { value: 'new' } }
        onClick={ onClick }
        size="small"
      />
    </ToolStrip>
  )
}
