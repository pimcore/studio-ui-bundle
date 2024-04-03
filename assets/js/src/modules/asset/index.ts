import { registerWidget } from '@Pimcore/modules/widget-manager/utils/widget-registry'
import { EditorContainer } from './editor/editor-container'

registerWidget({
  name: 'asset',
  component: EditorContainer
})
