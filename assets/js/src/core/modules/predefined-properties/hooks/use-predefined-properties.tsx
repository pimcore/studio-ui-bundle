/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type PredefinedProperty } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/properties/properties-api-slice-enhanced'
import { useContext } from 'react'
import { PredefinedPropertyContext } from '../predefined-properties-provider'

interface UsePredefinedPropertiesReturn {
  predefinedProperties: PredefinedProperty[] 
  isLoading: boolean
}

export const usePredefinedProperties = (): UsePredefinedPropertiesReturn => {
  const context = useContext(PredefinedPropertyContext)
  if (context === undefined) {
    throw new Error('usePredefinedProperties must be used within a PredefinedPropertyProvider')
  }

  const { predefinedProperties, isLoading } = context

  return {
    predefinedProperties,
    isLoading
  }
}
