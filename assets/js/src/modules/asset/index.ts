import { registerWidget } from '@Pimcore/modules/widget-manager/utils/widget-registry'
import { EditorContainer } from './editor/editor-container'
import { TreeContainer } from './tree/tree-container'

registerWidget({
  name: 'asset-editor',
  component: EditorContainer
})

registerWidget({
  name: 'asset-tree',
  component: TreeContainer
})
