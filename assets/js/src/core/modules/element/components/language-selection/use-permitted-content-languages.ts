/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useUser } from '@Pimcore/modules/auth/hooks/use-user'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { useElementDraft } from '@Pimcore/modules/element/hooks/use-element-draft'

/**
 * The content languages the current user may view/edit for the current element, i.e. the user's
 * content languages narrowed by the element's `localizedView` permission. Requires an element
 * context. This is the same set PermissionBasedLanguageSelectionControl offers, so callers that
 * need to stay in sync with that picker (e.g. deriving available locales) should use it too.
 */
export const usePermittedContentLanguages = (): string[] => {
  const user = useUser()
  const elementContext = useElementContext()
  const elementDraft = useElementDraft(elementContext.id, elementContext.elementType)
  const contentLanguages = Array.isArray(user.contentLanguages) ? user.contentLanguages as string[] : []

  if (!('permissions' in elementDraft)) {
    return contentLanguages
  }

  const permissions = elementDraft.permissions as Record<string, any>
  const viewableLanguages: string[] = permissions?.localizedView?.split(',') ?? []

  if (viewableLanguages.length === 0 || (viewableLanguages.length === 1 && viewableLanguages[0] === 'default')) {
    return contentLanguages
  }

  return contentLanguages.filter(language => viewableLanguages.includes(language))
}
