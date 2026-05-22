/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ElementIcon } from '@Pimcore/components/icon/icon'
import { normalizeIcon } from '@Pimcore/components/icon/normalize-icon'

const FALLBACK_AREABLOCK_ICON: ElementIcon = { type: 'name', value: 'area-brick' }

export const getAreablockTypeIcon = (icon: string | undefined): ElementIcon =>
  normalizeIcon(icon) ?? FALLBACK_AREABLOCK_ICON
