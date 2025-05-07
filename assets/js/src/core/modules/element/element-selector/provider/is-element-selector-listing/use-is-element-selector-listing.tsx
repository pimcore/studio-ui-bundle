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
import { IsElementSelectorContext, type IsElementSelectorContextProps } from './is-element-selector-listing-provider'

export interface UseIsElementSelectorListingReturn extends IsElementSelectorContextProps {}

export const useIsElementSelectorListing = (): UseIsElementSelectorListingReturn => {
  const context = useContext(IsElementSelectorContext)

  return {
    isElementSelector: context.isElementSelector
  }
}
