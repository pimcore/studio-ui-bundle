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
import { resolveIconString } from '@Pimcore/utils/icon-path'

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
