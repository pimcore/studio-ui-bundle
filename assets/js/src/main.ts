import '@Pimcore/bootstrap'
import { runApp } from './modules/app/utils/app-runner'
import { store } from './app/store'
import { container } from './app/depency-injection'
import { serviceName } from './modules/widget-manager/utils/widget-registry'

if (module.hot !== undefined) {
  module.hot.accept()
}

const Pimcore = {
  log: (): void => {
    console.log('Hello World')
  },

  store,

  container,

  serviceIds: {
    widgetManagerService: serviceName
  }
}

declare global {
  interface Window {
    Pimcore: typeof Pimcore
  }
}

const { log, serviceIds } = Pimcore

export { log, store, container, serviceIds }
export type * from './modules/widget-manager/utils/widget-registry'

runApp()
