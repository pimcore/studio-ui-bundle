import {registerWidget} from '@Pimcore/modules/widget-manager/utils/widget-registry'
import '@Pimcore/modules/asset/toolbar/index'
import {Asset} from './containers/asset'

registerWidget({
    name: 'asset',
    component: Asset
})
