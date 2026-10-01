/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isLanguageIndependentValueAllowed } from '@Pimcore/components/language-selection/helpers'
import { useDataObjectDraft } from '@Pimcore/modules/data-object/hooks/use-data-object-draft'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'

/**
 * Tells whether the current user may see the language independent ("default") column of a
 * localized field on the data object that is currently open.
 */
export const useLanguageIndependentValuePermission = (): boolean => {
  const { id } = useElementContext()
  const { dataObject } = useDataObjectDraft(id)

  return isLanguageIndependentValueAllowed(dataObject?.permissions?.localizedView)
}
