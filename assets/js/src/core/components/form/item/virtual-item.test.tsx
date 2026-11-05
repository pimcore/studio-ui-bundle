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
import { render } from '@testing-library/react'
import { isNull } from 'lodash'
import { VirtualItem } from './virtual-item'

// the styling and layout helpers transitively import antd-style (untranspiled ESM);
// the required marker logic does not depend on them
jest.mock('./virtual-item.styles', () => ({
  useStyles: () => ({ styles: { virtualItem: 'virtual-item' } })
}))
jest.mock('@Pimcore/components/space/space', () => ({
  Space: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))
jest.mock('@Pimcore/components/tooltip/tooltip', () => ({
  Tooltip: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))
jest.mock('@Pimcore/components/icon/icon', () => ({
  Icon: () => null
}))
jest.mock('@Pimcore/components/form/use-form', () => ({
  useFormInstance: () => null
}))

const hasRequiredMarker = (container: HTMLElement): boolean =>
  !isNull(container.querySelector('.required-indicator'))

describe('VirtualItem required marker', () => {
  it('shows the marker for an explicit required prop (mandatory field in a field collection / object brick)', () => {
    const { container } = render(
      <VirtualItem
        label="Mytext"
        name={ ['mytext'] }
        required
      />
    )

    expect(hasRequiredMarker(container)).toBe(true)
  })

  it('shows the marker for a required rule', () => {
    const { container } = render(
      <VirtualItem
        label="Mytext"
        name={ ['mytext'] }
        rules={ [{ required: true }] }
      />
    )

    expect(hasRequiredMarker(container)).toBe(true)
  })

  it('lets an explicit required={false} override a required rule, like antd Form.Item', () => {
    const { container } = render(
      <VirtualItem
        label="Mytext"
        name={ ['mytext'] }
        required={ false }
        rules={ [{ required: true }] }
      />
    )

    expect(hasRequiredMarker(container)).toBe(false)
  })

  it('shows no marker when neither required nor a required rule is set', () => {
    const { container } = render(
      <VirtualItem
        label="Mytext"
        name={ ['mytext'] }
      />
    )

    expect(hasRequiredMarker(container)).toBe(false)
  })
})
