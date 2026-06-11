/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type AvailableColumn } from './context-layer/provider/available-columns/available-columns-provider'

export interface GridConfigColumnPayload {
  key: string
  locale: string | null
  group: string[]
  width: number | null
}

export const prepareGridConfigColumn = (column: AvailableColumn): GridConfigColumnPayload => ({
  key: column.key,
  locale: column.locale ?? null,
  group: column.group as string[],
  width: column.width ?? null
})
