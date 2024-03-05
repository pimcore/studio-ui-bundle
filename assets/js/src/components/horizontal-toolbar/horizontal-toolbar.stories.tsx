import { type Meta } from '@storybook/react'
import { HorizontalToolbar as HorizontalToolbarComponent, type PinnableToolbarElement } from './horizontal-toolbar'
import i18n from '@Pimcore/app/i18n'

const config: Meta = {
  title: 'Pimcore studio/UI/HorizontalToolbar',
  component: HorizontalToolbarComponent,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

const pinnableToolbarElements: PinnableToolbarElement[] = [
  {
    iconName: 'translation',
    label: i18n.t('horizontal-toolbar.translate'),
    pinning: true
  },
  {
    iconName: 'expand-alt-outlined',
    label: i18n.t('horizontal-toolbar.expand'),
    displayingArrowIcon: true
  },
  {
    iconName: 'eye-outlined',
    label: i18n.t('horizontal-toolbar.preview')
  },
  {
    iconName: 'share-alt-outlined',
    label: i18n.t('horizontal-toolbar.share'),
    pinning: true
  },
  {
    iconName: 'edit-outlined',
    label: i18n.t('horizontal-toolbar.rename')
  },
  {
    iconName: 'delete-outlined',
    label: i18n.t('horizontal-toolbar.delete')
  },
  {
    iconName: 'download-02',
    label: i18n.t('horizontal-toolbar.download'),
    pinning: true
  },
  {
    iconName: 'refresh',
    label: i18n.t('horizontal-toolbar.reload')
  },
  {
    iconName: 'target',
    label: i18n.t('horizontal-toolbar.locate-in-tree')
  },
  {
    iconName: 'info-circle-outlined',
    label: i18n.t('horizontal-toolbar.copy-id'),
    displayingArrowIcon: true,
    pinning: true
  }
]

export const _default = {
  args: {
    pinnableToolbarElements
  }
}
