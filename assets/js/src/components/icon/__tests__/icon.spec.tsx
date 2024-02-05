import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@test-utils/test-utils'
import { Icon } from '../icon'
import { waitFor } from '@testing-library/dom'

test('displays button', async () => {
  const { container } = render(<Icon name='camera' />);

  waitFor(() => {
    const icon = container.querySelector('svg');

    expect(icon).toBeInTheDocument()
  });
})
