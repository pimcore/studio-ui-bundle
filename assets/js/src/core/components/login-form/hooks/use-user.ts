import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '@Pimcore/app/auth/auth-slice'
import { type User } from '@Pimcore/components/login-form/services/auth'

export const useUser = (): User | null => {
  const user = useSelector(selectCurrentUser)

  return useMemo(() => (user), [user])
}
