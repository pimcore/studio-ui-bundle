/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
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
