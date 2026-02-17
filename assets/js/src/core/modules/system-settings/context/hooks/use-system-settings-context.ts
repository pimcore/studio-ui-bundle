/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useContext } from 'react'
import { SystemSettingsContext, type SystemSettingsContextProps } from '../system-settings-provider'

export const useSystemSettingsContext = (): SystemSettingsContextProps => {
  const context = useContext(SystemSettingsContext)

  if (context === undefined) {
    throw new Error('useSystemSettingsContext must be used within a SystemSettingsProvider')
  }

  return context
}
