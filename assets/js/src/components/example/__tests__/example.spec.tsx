import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@test-utils/test-utils'
import { Example } from '../example'

test('displays button', async () => {
  const { getByText } = render(<Example value='Example text' />)

  const button = getByText('Example text')

  expect(button).toBeInTheDocument()
})
