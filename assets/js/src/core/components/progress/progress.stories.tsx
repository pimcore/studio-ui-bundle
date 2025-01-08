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
import { Progress } from './progress'

const config: Meta = {
  title: 'Components/Feedback/Progress',
  component: Progress,
  args: {
    percent: 30
  }
}

export default config

export const _default = {}

export const Small = {
  args: {
    size: 'small'
  }
}

export const Circular = {
  args: {
    type: 'circle'
  }
}

export const CircularSuccess = {
  args: {
    percent: 100,
    type: 'circle'
  }
}

export const CircularReject = {
  args: {
    type: 'circle',
    status: 'exception'
  }
}

export const WithTextProgress = {
  args: {
    format: () => 'Text Format'
  }
}
