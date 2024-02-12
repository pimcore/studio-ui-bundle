import '@Pimcore/app/i18n'
import '@Pimcore/modules/example'
import '@Pimcore/modules/asset-tree'
import 'flexlayout-react/style/light.css'
import '../../css/globals.css'
import { runApp } from './modules/app/utils/app-runner'

if (module.hot !== undefined) {
  module.hot.accept()
}

runApp()
