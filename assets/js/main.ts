import { runApp } from './modules/app/utils/app-runner'

if (module.hot !== undefined) {
  module.hot.accept()
}

runApp()

export * from '@Pimcore/pimcore'
