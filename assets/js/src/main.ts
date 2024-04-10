import '@Pimcore/bootstrap';
import { runApp } from './modules/app/utils/app-runner'

if (module.hot !== undefined) {
  module.hot.accept()
}

runApp()
