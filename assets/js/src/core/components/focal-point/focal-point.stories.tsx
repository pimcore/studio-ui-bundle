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

import type { Meta } from '@storybook/react'
import { FocalPoint } from '@Pimcore/components/focal-point/focal-point'
import React from 'react'
import { PimcoreImage } from '../pimcore-image/pimcore-image'

// @todo Component needs refactoring because it contains business logic
const config: Meta = {
  title: 'Components/__Refactor__/Focal Point',
  component: () => {
    return (
      <FocalPoint>
        <PimcoreImage src={ 'https://picsum.photos/800/600.jpg' } />
      </FocalPoint>
    )
  },
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

export const _default = {}
