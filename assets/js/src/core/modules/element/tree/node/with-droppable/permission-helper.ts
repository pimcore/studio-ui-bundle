/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'
import { type Element } from '@Pimcore/modules/element/element-helper'

export const isDndTargetAllowed = (element: Element): boolean => {
  return checkElementPermission(element.permissions, 'create')
}

export const isDndSourceAllowed = (element: Element): boolean => {
  return checkElementPermission(element.permissions, 'settings') && !element.isLocked
}
