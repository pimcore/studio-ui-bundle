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
import { VersionCard as VersionCardComponent } from './version-card'

const config: Meta = {
  title: 'Pimcore studio/UI/VersionCard',
  component: VersionCardComponent,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    version: 1,
    date: '2021.09.10',
    savedBy: 'John Doe',
    isPublished: false,
    isOwnDraft: false,
    id: 112,
    scheduledDate: '2023.02.19',
    note: 'This is a note'
  }
}

export const _active = {
  args: {
    version: 1,
    date: '2021.09.10',
    savedBy: 'John Doe',
    isActiveDefault: true,
    isPublished: false,
    isOwnDraft: false,
    id: 112,
    note: 'This is a note'
  }
}

export const _published = {
  args: {
    version: 1,
    date: '2021.09.10',
    savedBy: 'John Doe',
    isPublished: true,
    isAutosaved: true,
    isOwnDraft: false,
    id: 112,
    scheduledDate: '2023.02.19'
  }
}

export const _ownDraft = {
  args: {
    version: 1,
    date: '2021.09.10',
    savedBy: 'John Doe',
    isActiveDefault: true,
    isPublished: false,
    isAutosaved: true,
    isOwnDraft: true,
    id: 112,
    scheduledDate: '2023.02.19'
  }
}
