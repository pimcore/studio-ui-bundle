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
import { type IconLibrary } from '@Pimcore/modules/icon-library/services/icon-library'
import { type ElementIcon } from '@Pimcore/components/icon/icon'
import { looksLikeIconPath } from '@Pimcore/utils/icon-path'

export const normalizeIcon = (
  value: ElementIcon | string | null | undefined
): ElementIcon | null => {
  if (value === null || value === undefined || value === '') {
    return null
  }

  if (typeof value !== 'string') {
    return value
  }

  const iconLibrary = container.get<IconLibrary>(serviceIds.iconLibrary)

  if (iconLibrary.get(value) !== undefined) {
    return { type: 'name', value }
  }

  if (looksLikeIconPath(value)) {
    return { type: 'path', value }
  }

  // The value is neither a registered library icon nor a usable image path
  // (e.g. a legacy "pimcore_icon_*" CSS class coming from stored config). Rendering
  // it as `<img src>` would resolve to a wrong relative URL and trigger a 404, so
  // skip it instead of fetching a broken resource.
  console.warn(
    `[normalizeIcon] Icon "${value}" was not found in the icon library and is not a valid image path; skipping it to avoid a broken request.`
  )
  return null
}

export const denormalizeIcon = (
  value: ElementIcon | string | null | undefined
): string | null => {
  if (value === null || value === undefined) {
    return null
  }

  if (typeof value === 'string') {
    return value
  }

  return value.value
}

type IconTransform = (value: ElementIcon | string | null | undefined) => unknown

const transformLayoutNodeIcons = (node: unknown, transform: IconTransform): unknown => {
  if (node === null || typeof node !== 'object' || Array.isArray(node)) {
    return node
  }

  const obj = node as Record<string, unknown>
  const result: Record<string, unknown> = { ...obj }

  if ('icon' in obj) {
    result.icon = transform(obj.icon as ElementIcon | string | null | undefined)
  }

  if (Array.isArray(obj.children)) {
    result.children = obj.children.map((child) => transformLayoutNodeIcons(child, transform))
  }

  return result
}

export const normalizeLayoutTreeIcons = <T>(layout: T): T => {
  return transformLayoutNodeIcons(layout, normalizeIcon) as T
}

export const denormalizeLayoutTreeIcons = <T>(layout: T): T => {
  return transformLayoutNodeIcons(layout, denormalizeIcon) as T
}
