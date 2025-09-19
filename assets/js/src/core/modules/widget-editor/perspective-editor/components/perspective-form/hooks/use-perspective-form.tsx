/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { usePerspectiveGetConfigByIdQuery } from '@Pimcore/modules/perspectives/perspectives-slice.gen'
import { useMemo } from 'react'

type MenuEntriesSection = Record<string, boolean>

type MenuEntries = Record<string, MenuEntriesSection>

interface UsePerspectiveFormReturn {
  menuEntries: MenuEntries
  isLoading: boolean
}

export const usePerspectiveForm = (): UsePerspectiveFormReturn => {
  const { data: perspective, isLoading } = usePerspectiveGetConfigByIdQuery({ perspectiveId: 'studio_default_perspective' })

  const menuEntries = useMemo(() => {
    const contextPermissions = perspective?.contextPermissions as MenuEntries | undefined

    return contextPermissions ?? {}
  }, [perspective])

  return {
    menuEntries,
    isLoading
  }
}
