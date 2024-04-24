import { container } from '@Pimcore/app/depency-injection'
import { EditorContainer } from '@Pimcore/modules/asset/editor/editor-container'
import { FolderContainer } from '@Pimcore/modules/asset/editor/folder/folder-container'
import { ImageContainer } from '@Pimcore/modules/asset/editor/image/image-container'
import { type ComponentRegistry, serviceName } from '@Pimcore/modules/asset/editor/services/component-registry'
import { type WidgetRegistry, serviceName as widgetServiceName } from '@Pimcore/modules/widget-manager/utils/widget-registry'
import { UnknownContainer } from './unknown/unknown-container'

const componentRegistryService = container.get<ComponentRegistry>(serviceName)

componentRegistryService.registerComponent({
  name: 'image',
  component: ImageContainer
})

componentRegistryService.registerComponent({
  name: 'folder',
  component: FolderContainer
})

componentRegistryService.registerComponent({
  name: 'unknown',
  component: UnknownContainer
})

const widgetRegistryService = container.get<WidgetRegistry>(widgetServiceName)

widgetRegistryService.registerWidget({
  name: 'asset-editor',
  component: EditorContainer
})
