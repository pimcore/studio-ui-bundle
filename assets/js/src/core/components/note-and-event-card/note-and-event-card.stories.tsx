/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { type Meta } from '@storybook/react'
import { NoteAndEventCard as NoteAndEventCardComponent } from './note-and-event-card'
import i18n from '@Pimcore/app/i18n'

// @todo: check for more generic naming
const config: Meta = {
  title: 'Components/__Refactor__/NoteAndEventCard',
  component: NoteAndEventCardComponent,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    title: 'Note title',
    description: 'Note description',
    date: '2021-08-02 12:43',
    type: 'Note',
    data: [
      {
        [i18n.t('notes-and-events.name')]: 'myAsset',
        [i18n.t('notes-and-events.type')]: 'Asset',
        [i18n.t('notes-and-events.value')]: '/Brand Logos/Porsche_logo.svg'
      }, {
        [i18n.t('notes-and-events.name')]: 'yourAsset',
        [i18n.t('notes-and-events.type')]: 'Asset',
        [i18n.t('notes-and-events.value')]: '/Brand Logos/BMW.png'
      }
    ]
  }
}
