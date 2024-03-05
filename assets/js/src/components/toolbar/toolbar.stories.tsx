import { type Meta } from '@storybook/react'
import { Toolbar as ToolbarComponent, type PinnableToolbarElement } from './toolbar'
import i18n from '@Pimcore/app/i18n'

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
    label: i18n.t('toolbar.translate'),
    pinning: true
  },
  {
    iconName: 'expand-alt-outlined',
    label: i18n.t('toolbar.expand'),
    displayingArrowIcon: true
  },
  {
    iconName: 'eye-outlined',
    label: i18n.t('toolbar.preview')
  },
  {
    iconName: 'share-alt-outlined',
    label: i18n.t('toolbar.share'),
    pinning: true
  },
  {
    iconName: 'edit-outlined',
    label: i18n.t('toolbar.rename')
  },
  {
    iconName: 'delete-outlined',
    label: i18n.t('toolbar.delete')
  },
  {
    iconName: 'download-02',
    label: i18n.t('toolbar.download'),
    pinning: true
  },
  {
    iconName: 'refresh',
    label: i18n.t('toolbar.reload')
  },
  {
    iconName: 'target',
    label: i18n.t('toolbar.locate-in-tree')
  },
  {
    iconName: 'info-circle-outlined',
    label: i18n.t('toolbar.copy-id'),
    displayingArrowIcon: true,
    pinning: true
  }
]

export const _default = {
  args: {
    pinnableToolbarElements
  }
}
