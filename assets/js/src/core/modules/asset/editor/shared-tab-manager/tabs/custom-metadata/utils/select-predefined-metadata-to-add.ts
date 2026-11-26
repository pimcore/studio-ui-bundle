/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { CustomMetadata } from '@Pimcore/modules/asset/draft/hooks/use-custom-metadata'
import type { PredefinedMetadata } from '../metadata-api-slice-enhanced'

/**
 * Rows are identified by name + language, so a definition is only added once per pair —
 * counting entries added earlier in the same run, not just those present before it.
 */
export const selectPredefinedMetadataToAdd = (
  definitions: PredefinedMetadata[],
  existing: Array<Pick<CustomMetadata, 'name' | 'language'>>
): CustomMetadata[] => {
  const taken = [...existing]
  const toAdd: CustomMetadata[] = []

  definitions.forEach((definition) => {
    const language = definition.language ?? ''

    if (taken.some((entry) => entry.name === definition.name && entry.language === language)) {
      return
    }

    taken.push({ name: definition.name, language })
    toAdd.push({
      ...definition,
      rowId: definition.id,
      language,
      data: definition.data ?? null
    })
  })

  return toAdd
}
