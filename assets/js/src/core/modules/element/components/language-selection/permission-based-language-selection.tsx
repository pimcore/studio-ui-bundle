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
import { useLanguageSelection } from '@Pimcore/components/language-selection/provider/use-language-selection'
import { PermissionBasedLanguageSelectionControl } from './permission-based-language-selection-control'

export interface PermissionBasedLanguageSelectionProps {
  isNullable?: boolean
}

export const PermissionBasedLanguageSelection = (props: PermissionBasedLanguageSelectionProps): React.JSX.Element => {
  const { currentLanguage, setCurrentLanguage } = useLanguageSelection()

  return (
    <PermissionBasedLanguageSelectionControl
      isNullable={ props.isNullable }
      onChange={ setCurrentLanguage }
      value={ currentLanguage }
    />
  )
}
