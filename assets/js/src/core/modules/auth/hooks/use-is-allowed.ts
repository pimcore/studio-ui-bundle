import {useUser} from "@Pimcore/modules/auth/hooks/use-user";

interface UseIsAllowedReturn {
  isAllowed: (permission: string) => boolean
}

export const useIsAllowed = (): UseIsAllowedReturn => {
  const user = useUser()!

  const isAllowed = (permission: string) => {
    if(user.isAdmin) {
      return true
    }

    return user.permissions.includes(permission)
  }

  return {
    isAllowed
  }
}
