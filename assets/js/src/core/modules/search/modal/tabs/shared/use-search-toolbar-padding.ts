/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type BoxProps } from '@Pimcore/components/box/box'
import { useSearch } from '@Pimcore/modules/search/provider/use-search'

/**
 * Horizontal padding for the search listings' top bar and toolbar. Inside the search modal the
 * modal body already supplies the gutter, so they drop their own. Hosted as a saved-search tab in
 * the main area nothing else does (its own SearchProvider is never "open"), so they keep the
 * default padding.
 */
export const useSearchToolbarPadding = (): BoxProps['padding'] => {
  const { isOpen } = useSearch()

  return isOpen ? { left: 'none', right: 'none' } : undefined
}
