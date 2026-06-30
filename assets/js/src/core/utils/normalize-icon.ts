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

const ICON_PATH_SCHEME_PATTERN = /^[a-z][\w+.-]*:/i
const ICON_PATH_EXTENSION_PATTERN = /\.(svg|png|jpe?g|gif|webp|avif|ico|bmp)$/i

// Whether an unregistered icon string is a usable image path (slash, URL scheme or image
// extension) rather than a bare token like a legacy `pimcore_icon_*` class.
export const looksLikeIconPath = (value: string): boolean =>
  value.includes('/') ||
  ICON_PATH_SCHEME_PATTERN.test(value) ||
  ICON_PATH_EXTENSION_PATTERN.test(value)

// Registered name -> 'name'; path-like value -> 'path'; otherwise warn and skip, so an
// unknown token (e.g. a legacy `pimcore_icon_*` class) never becomes a 404-ing `<img src>`.
export const resolveIconString = (
  value: string,
  isKnownIcon: (name: string) => boolean,
  source: string
): ElementIcon | null => {
  if (isKnownIcon(value)) {
    return { type: 'name', value }
  }

  if (looksLikeIconPath(value)) {
    return { type: 'path', value }
  }

  console.warn(
    `[${source}] Icon "${value}" is not a registered icon and is not a valid image path; skipping it to avoid a broken request.`
  )
  return null
}

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

  return resolveIconString(value, (name) => iconLibrary.get(name) !== undefined, 'normalizeIcon')
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
