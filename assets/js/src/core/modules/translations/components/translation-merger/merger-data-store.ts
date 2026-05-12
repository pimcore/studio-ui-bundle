/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { DeltaItem } from '../../../app/translations/translations-api-slice.gen'

interface MergerData {
  domain: string
  deltaItems: DeltaItem[]
}

let pendingMergerData: MergerData | null = null

export const setMergerData = (data: MergerData): void => {
  pendingMergerData = data
}

export const getMergerData = (): MergerData | null => {
  return pendingMergerData
}

export const clearMergerData = (): void => {
  pendingMergerData = null
}
