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

import { useContext } from 'react'
import { SettingsContext, type SettingsContextProps } from './settings-provider'

export interface UseSettingsReturn extends SettingsContextProps {}

export const useSettings = (): UseSettingsReturn => {
  const context = useContext(SettingsContext)

  if (context === undefined || context === null) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }

  return context
}
