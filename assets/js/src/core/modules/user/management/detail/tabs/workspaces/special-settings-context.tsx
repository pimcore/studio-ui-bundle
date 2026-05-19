/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { createContext, useContext } from 'react'

export enum WorkspaceType {
  DOCUMENT = 'document',
  ASSET = 'asset',
  OBJECT = 'object'
}

export interface SpecialSettingsContextType {
  showSpecialSettings: (id: number) => void
}

export const SpecialSettingsContext = createContext<SpecialSettingsContextType | null>(null)

export const useSpecialSettingsContext = (): SpecialSettingsContextType | null => useContext(SpecialSettingsContext)
