import { readonlyContainer } from '../depency-injection'
import { pluginSystem } from '../plugin-system/plugin-system'
import { serviceIds } from '../config/services'

export interface sdk {
  container: typeof readonlyContainer
  serviceIds: typeof serviceIds
  pluginSystem: typeof pluginSystem
}

export const Pimcore: sdk = {
  container: readonlyContainer,
  serviceIds,
  pluginSystem
}
