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
import { Alert } from './alert'

const config: Meta = {
  title: 'Components/Feedback/Alert',
  component: Alert,
  parameters: {
  },
  tags: ['autodocs']
}

export const _default = {
  args: {
    description: 'Error Description'
  }
}

export const ErrorType = {
  args: {
    ..._default.args,
    type: 'error'
  }
}

export const WarningType = {
  args: {
    ..._default.args,
    type: 'warning'
  }
}

export default config
