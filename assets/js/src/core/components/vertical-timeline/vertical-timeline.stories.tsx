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

import React from 'react'
import { type Meta } from '@storybook/react'
import { VerticalTimeline as VerticalTimelineComponent } from './vertical-timeline'
import { VersionCard } from '@Pimcore/components/version-card/version-card'

const config: Meta = {
  title: 'Pimcore studio/UI/VerticalTimeline',
  component: VerticalTimelineComponent,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    timeStamps: [
      <VersionCard
        activeDefault
        autosaved={ false }
        className={ 'is-active' }
        date={ '2020-05-12' }
        id={ 112 }
        key={ 1 }
        onClickDelete={ () => {
          console.log('Delete')
        } }
        onClickPublish={ () => {
          console.log('Publish')
        } }
        published={ false }
        savedBy={ 'admin' }
        version={ 1 }
      />,
      <VersionCard
        autosaved
        date={ '2020-07-12' }
        id={ 112 }
        key={ 2 }
        onClickDelete={ () => {
          console.log('Delete')
        } }
        onClickPublish={ () => {
          console.log('Publish')
        } }
        published={ false }
        savedBy={ 'auto saved' }
        version={ 2 }
      />,
      <VersionCard
        autosaved={ false }
        className={ 'is-published' }
        date={ '2020-10-12' }
        id={ 112 }
        key={ 3 }
        onClickDelete={ () => {
          console.log('Delete')
        } }
        onClickPublish={ () => {
          console.log('Publish')
        } }
        published
        savedBy={ 'admin' }
        version={ 3 }
      />
    ]
  }
}
