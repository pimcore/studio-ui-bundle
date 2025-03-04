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
import { SearchInput } from './search-input'

const config: Meta = {
  title: 'Components/Controls/SearchInput',
  component: SearchInput,
  tags: ['autodocs']
}

export const _default = {
  args: {
    placeholder: 'Search'
  }
}

export const SearchWithButton = {
  args: {
    withoutAddon: false,
    withPrefix: false,
    placeholder: 'Search'
  }
}
export const Filled = {
  args: {
    value: 'Filled value'
  }
}

export default config
