/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*/

import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@test-utils/test-utils'
import { Example } from '../example'

test('displays button', async () => {
  const { getByText } = render(<Example value='Example text' />)

  const button = getByText('Example text')

  expect(button).toBeInTheDocument()
})
