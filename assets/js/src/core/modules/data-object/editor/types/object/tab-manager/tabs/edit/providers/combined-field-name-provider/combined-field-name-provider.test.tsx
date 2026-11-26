/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import { CombinedFieldNameProvider } from './combined-field-name-provider'
import { useCombinedFieldName } from './use-combined-field-name'

const Probe = (): React.JSX.Element => {
  const context = useCombinedFieldName()

  return (
    <span
      data-combined={ JSON.stringify(context?.combinedFieldNameParent) }
      data-path={ JSON.stringify(context?.fieldPathParent) }
      data-testid="probe"
    />
  )
}

describe('CombinedFieldNameProvider', () => {
  it('uses the combined field name as field path when no path of its own is given', () => {
    render(
      <CombinedFieldNameProvider combinedFieldNameParent={ ['attributes', 'Dimensions'] }>
        <Probe />
      </CombinedFieldNameProvider>
    )

    expect(screen.getByTestId('probe')).toHaveAttribute('data-path', JSON.stringify(['attributes', 'Dimensions']))
  })

  // the combined field name addresses the field definition (e.g. for the allowed types of a
  // relation), so it must not carry the item index a list adds to the field path
  it('keeps the item index in the field path only, through nested providers', () => {
    render(
      <CombinedFieldNameProvider
        combinedFieldNameParent={ ['features'] }
        fieldPathParent={ ['features', 2] }
      >
        <CombinedFieldNameProvider
          combinedFieldNameParent={ ['parts', 'Wheel'] }
          fieldPathParent={ ['parts', 0, 'Wheel'] }
        >
          <CombinedFieldNameProvider combinedFieldNameParent={ ['localizedfields'] }>
            <Probe />
          </CombinedFieldNameProvider>
        </CombinedFieldNameProvider>
      </CombinedFieldNameProvider>
    )

    const probe = screen.getByTestId('probe')
    expect(probe).toHaveAttribute('data-combined', JSON.stringify(['features', 'parts', 'Wheel', 'localizedfields']))
    expect(probe).toHaveAttribute('data-path', JSON.stringify(['features', 2, 'parts', 0, 'Wheel', 'localizedfields']))
  })
})
