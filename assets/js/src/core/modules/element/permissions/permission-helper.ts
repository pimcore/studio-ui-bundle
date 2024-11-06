export const checkElementPermission = (permissions: string[], permission: string): boolean => {
  return permissions.includes(permission)
}
