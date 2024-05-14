import { useUser } from '@Pimcore/components/login-form/hooks/use-user'
import { useMemo } from 'react'

export const useIsAuthenticated = (): boolean => {
  const user = useUser()

  return useMemo(() => (user !== null), [user])
}
