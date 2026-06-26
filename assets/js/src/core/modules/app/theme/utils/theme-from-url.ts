/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNil, isEmpty } from 'lodash'

/**
 * Query parameter used to select the theme via URL. The value must be the id
 * of a registered theme, e.g. `?theme=studio-default-light`.
 */
export const themeUrlParameter = 'theme'

/**
 * Resolve the theme id requested through the URL query string.
 *
 * Returns `undefined` when no theme parameter is present so that the default
 * theme is applied.
 */
export const getThemeIdFromUrl = (search: string = window.location.search): string | undefined => {
  const value = new URLSearchParams(search).get(themeUrlParameter)?.trim()

  if (isNil(value) || isEmpty(value)) {
    return undefined
  }

  return value
}
