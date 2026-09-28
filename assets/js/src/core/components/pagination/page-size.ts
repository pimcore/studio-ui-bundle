/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { appConfig } from '@Pimcore/app/config/app-config'

/**
 * Some endpoints cap the page size below the configured maximum. A pager and the listing that owns
 * its page-size state have to agree on that cap, otherwise the first request is sent with a size
 * the API rejects.
 */
export const getMaxPageSize = (endpointMaxPageSize?: number): number => Math.min(
  endpointMaxPageSize ?? appConfig.maxPageSize,
  appConfig.maxPageSize
)

export const getDefaultPageSize = (endpointMaxPageSize?: number): number => Math.min(
  appConfig.defaultPageSize,
  getMaxPageSize(endpointMaxPageSize)
)

export const getPageSizeOptions = (endpointMaxPageSize?: number): number[] => {
  const maxPageSize = getMaxPageSize(endpointMaxPageSize)
  const options = appConfig.pageSizeOptions.filter((option) => option <= maxPageSize)

  // Every configured option exceeds the cap, so the cap itself is the only size this pager can offer.
  return options.length > 0 ? options : [maxPageSize]
}
