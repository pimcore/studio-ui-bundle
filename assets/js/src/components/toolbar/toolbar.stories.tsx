import {type Meta} from '@storybook/react'
import {type PinnableToolbarElement, Toolbar as ToolbarComponent} from './toolbar'

const config: Meta = {
  title: 'Pimcore studio/UI/Toolbar',
  component: ToolbarComponent,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

const pinnableToolbarElements: PinnableToolbarElement[] = [
  {
    iconName: 'translation',
    label: 'toolbar.translate',
    pinning: true
  },
  {
    iconName: 'expand-alt-outlined',
    label: 'toolbar.expand',
    displayingArrowIcon: true
  },
  {
    iconName: 'eye-outlined',
    label: 'toolbar.preview'
  },
  {
    iconName: 'share-alt-outlined',
    label: 'toolbar.share',
    pinning: true
  },
  {
    iconName: 'edit-outlined',
    label: 'toolbar.rename'
  },
  {
    iconName: 'delete-outlined',
    label: 'toolbar.delete'
  },
  {
    iconName: 'download-02',
    label: 'toolbar.download',
    pinning: true
  },
  {
    iconName: 'refresh',
    label: 'toolbar.reload'
  },
  {
    iconName: 'target',
    label: 'toolbar.locate-in-tree'
  },
  {
    iconName: 'info-circle-outlined',
    label: 'toolbar.copy-id',
    displayingArrowIcon: true,
    pinning: true
  }
]

export const _default = {
  args: {
    pinnableToolbarElements
  }
}
