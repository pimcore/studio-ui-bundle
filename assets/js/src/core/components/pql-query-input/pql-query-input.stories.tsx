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
import { PQLQueryInput } from './pql-query-input'

const config: Meta = {
  title: 'Components/Data Entry/PQLQueryInput',
  component: PQLQueryInput,
  tags: ['autodocs']
}

export const _default = {
  args: {
    value: '',
    isShowError: false
  }
}

export const WithValue = {
  args: {
    value: "id='67'",
    isShowError: false
  }
}

export const WithErrorMessage = {
  args: {
    value: 'color = "red"\nCar.name = "test"',
    isShowError: true,
    errorData: {
      status: 422,
      data: {
        errorKey: 'error_gdi_parsing_exception',
        message: 'Expected end of input, found `Car.name`.',
        position: 14,
        token: 'Car.name',
        query: 'color = "red"\nCar.name = "test"'
      }
    }
  }
}

export default config
