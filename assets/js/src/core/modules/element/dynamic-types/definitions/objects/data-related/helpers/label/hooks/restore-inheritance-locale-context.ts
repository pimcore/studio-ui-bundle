/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { createContext } from 'react'

/**
 * Locale of the fields below, for the edit permission check of useRestoreInheritance,
 * where the locale is not carried by the localized fields context. The classification
 * store is the case: it holds the language of its keys in their path (group, language,
 * key), and its language independent keys carry none.
 */
export const RestoreInheritanceLocaleContext = createContext<string | undefined>(undefined)
