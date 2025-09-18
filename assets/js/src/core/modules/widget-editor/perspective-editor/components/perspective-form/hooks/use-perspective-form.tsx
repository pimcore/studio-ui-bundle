import { usePerspectiveGetConfigByIdQuery } from "@Pimcore/modules/perspectives/perspectives-slice.gen"
import { useMemo } from "react"

interface MenuEntriesSection {
  [key: string]: boolean
}

interface MenuEntries {
  [category: string]: MenuEntriesSection
}

interface UsePerspectiveFormReturn {
  menuEntries: MenuEntries,
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