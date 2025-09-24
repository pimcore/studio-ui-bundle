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
import { FlagIcon } from '@Pimcore/components/flag-icon/flag-icon'

interface LanguageColumnHeaderProps {
  language: string
  display: string
}

export const LanguageColumnHeader = ({ language, display }: LanguageColumnHeaderProps): React.JSX.Element => {
  return (
    <div style={ { display: 'flex', alignItems: 'center', gap: '8px' } }>
      <FlagIcon value={ language } />
      <span>{display}</span>
    </div>
  )
}
