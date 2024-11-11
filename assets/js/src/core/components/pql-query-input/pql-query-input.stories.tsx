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
import { PQLQueryInput } from './pql-query-input'

const config: Meta = {
  title: 'Components/Others/PQLQueryInput',
  component: PQLQueryInput,
  tags: ['autodocs']
}

export const _default = {
  args: {
    value: ''
  }
}

export const WithValue = {
  args: {
    value: "id='67'"
  }
}

export const WithErrorMessage = {
  args: {
    value: 'id=csdghsgdh',
    isShowError: true
  }
}

export default config
