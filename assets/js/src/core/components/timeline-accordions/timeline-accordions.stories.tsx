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
import { TimelineAccordions as VersionAccordionComponent } from './timeline-accordions'

const config: Meta = {
  title: 'Components/__Refactor__/TimelineAccordions',
  component: VersionAccordionComponent,
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
    note: 'This is a note',
    onClickDelete: () => {
      console.log('Delete')
    },
    onClickPublish: () => {
      console.log('Publish')
    }
  }
}

export const _active = {
  args: {
    version: 1,
    date: '2021.09.10',
    savedBy: 'John Doe',
    activeDefault: true,
    published: false,
    ownDraft: false,
    id: 112,
    note: 'This is a note',
    onClickDelete: () => {
      console.log('Delete')
    },
    onClickPublish: () => {
      console.log('Publish')
    }
  }
}

export const _published = {
  args: {
    version: 1,
    date: '2021.09.10',
    savedBy: 'John Doe',
    published: true,
    autosaved: true,
    ownDraft: false,
    id: 112,
    scheduledDate: '2023.02.19',
    onClickDelete: () => {
      console.log('Delete')
    },
    onClickPublish: () => {
      console.log('Publish')
    }
  }
}

export const _ownDraft = {
  args: {
    version: 1,
    date: '2021.09.10',
    savedBy: 'John Doe',
    activeDefault: true,
    published: false,
    autosaved: true,
    ownDraft: true,
    id: 112,
    scheduledDate: '2023.02.19',
    onClickDelete: () => {
      console.log('Delete')
    },
    onClickPublish: () => {
      console.log('Publish')
    }
  }
}
