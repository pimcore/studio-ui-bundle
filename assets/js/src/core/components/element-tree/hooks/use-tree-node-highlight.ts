/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useTemporaryValue } from '@Pimcore/utils/hooks/use-temporary-value'
import { recentlyAddedHighlightDuration } from './use-recently-added-ids'

/**
 * A node is briefly highlighted when it was just added to its list, or when it was located,
 * so the eye finds it in the tree.
 */
export const useTreeNodeHighlight = (isRecentlyAdded: boolean): { isHighlighted: boolean, highlight: () => void } => {
  const [isLocated, showLocated] = useTemporaryValue<boolean>(recentlyAddedHighlightDuration)

  return {
    isHighlighted: isRecentlyAdded || isLocated === true,
    highlight: () => { showLocated(true) }
  }
}
