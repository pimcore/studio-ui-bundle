/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useCallback } from 'react'
import { isLanguageEditable } from '@Pimcore/components/language-selection/helpers'
import { useDataObjectDraft } from '@Pimcore/modules/data-object/hooks/use-data-object-draft'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'

/**
 * Tells whether a content language of the data object that is currently open may be edited, by the
 * same `localizedEdit` permission the localized control disables itself by (see
 * FormControlWithElementContext) and the restore of a localized field checks (see
 * useRestoreInheritance).
 *
 * Only concrete languages are answered. The language independent ("default") value is not a
 * content language - `isLanguageEditable` ignores it on purpose - and is covered by
 * {@link useLanguageIndependentValuePermission}.
 */
export const useLanguageEditPermission = (): ((language: string) => boolean) => {
  const { id } = useElementContext()
  const { dataObject } = useDataObjectDraft(id)
  const languagePermission = dataObject?.permissions?.localizedEdit

  return useCallback(
    (language: string) => isLanguageEditable(languagePermission, language),
    [languagePermission]
  )
}
