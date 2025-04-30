/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
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
export const SearchMinimal = {
  args: {
    withoutAddon: true,
    withPrefix: true,
    value: 'Filled value'
  }
}

export const SearchFullWidth = {
  args: {
    withoutAddon: true,
    withPrefix: true,
    value: 'Filled value',
    maxWidth: '100%'
  }
}

export default config
