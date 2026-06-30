/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type DynamicTypeIconSetRegistry } from '@Pimcore/components/icon-selector/dynamic-types/registry/dynamic-type-icon-set-registry'
import { type ElementIcon } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { looksLikeIconPath } from '@Pimcore/utils/icon-path'

const isElementIcon = (value: unknown): value is ElementIcon => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    'value' in value
  )
}

const isLibraryIcon = (name: string): boolean => {
  const registry = container.get<DynamicTypeIconSetRegistry>(serviceIds['DynamicTypes/IconSetRegistry'])

  return registry.getDynamicTypes().some((iconSet) =>
    iconSet.getIcons().some((icon) => icon.value === name)
  )
}

export const toElementIcon = (input: ElementIcon | string | null | undefined): ElementIcon | undefined => {
  if (input === null || input === undefined || input === '') {
    return undefined
  }

  if (isElementIcon(input)) {
    return input
  }

  if (isLibraryIcon(input)) {
    return { type: 'name', value: input }
  }

  if (looksLikeIconPath(input)) {
    return { type: 'path', value: input }
  }

  // Neither a known icon-set entry nor a usable image path (e.g. a legacy
  // "pimcore_icon_*" CSS class). Rendering it as `<img src>` would resolve to a
  // wrong relative URL and trigger a 404, so skip it instead.
  console.warn(
    `[toElementIcon] Icon "${input}" is not a known icon-set entry and is not a valid image path; skipping it to avoid a broken request.`
  )
  return undefined
}

export const toIconString = (input: ElementIcon | string | null | undefined): string => {
  if (input === null || input === undefined) {
    return ''
  }

  if (typeof input === 'string') {
    return input
  }

  return input.value
}
