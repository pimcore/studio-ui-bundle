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
import { useSettings } from '@Pimcore/modules/app/settings/hooks/use-settings'

/** Returns the user's profile language if it is a valid system content language, or null otherwise. */
export const useUserContentLanguage = (): string | null => {
  const user = useUser()
  const settings = useSettings()

  const validLanguages: string[] = settings.validLanguages ?? []

  return validLanguages.includes(user.language) ? user.language : null
}
