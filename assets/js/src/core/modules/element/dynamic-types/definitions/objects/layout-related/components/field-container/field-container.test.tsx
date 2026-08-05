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
import { FieldContainer, type FieldContainerProps } from './field-container'

// The real Flex and Form barrels transitively import antd-style (untranspiled
// ESM), which jest cannot load — same reason as keyed-list.test.tsx. Both are
// replaced by plain elements that keep the props asserted on here: the outer
// container is the one without a `flex` prop, the child wrappers carry flex={1}.
jest.mock('@Pimcore/components/flex/flex', () => ({
  Flex: ({ children, className, flex, style, vertical }: any) => (
    <div
      className={ className }
      data-testid={ flex === undefined ? 'container' : 'child' }
      data-vertical={ vertical === true ? 'true' : 'false' }
      style={ style }
    >
      {children}
    </div>
  )
}))

jest.mock('@Pimcore/components/form/form', () => ({
  Form: {
    Item: ({ children, label }: any) => (
      <div>
        <span data-testid='field-label'>{label}</span>
        {children}
      </div>
    )
  }
}))

jest.mock('@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/object-component', () => ({
  ObjectComponent: ({ name }: any) => <div>{name}</div>
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

// The @sdk/utils barrel re-exports date-time, which pulls the whole app (and
// antd-style) in with it. Only these two helpers are needed here, so they are
// taken from the modules they actually live in.
jest.mock('@sdk/utils', () => ({
  isNonEmptyString: jest.requireActual('@Pimcore/utils/type-utils').isNonEmptyString,
  toCssDimension: jest.requireActual('@Pimcore/utils/css').toCssDimension
}))

describe('FieldContainer', () => {
  const child = (name: string): any => ({ name, datatype: 'data', fieldtype: 'input' })

  const renderContainer = (props: Partial<FieldContainerProps> = {}): HTMLElement => {
    render(
      <FieldContainer
        { ...props as FieldContainerProps }
        name='container'
      >
        { [child('first'), child('second')] }
      </FieldContainer>
    )

    return screen.getByTestId('container')
  }

  it('keeps its full-width default when no width is configured', () => {
    const container = renderContainer()

    expect(container.classList.contains('w-full')).toBe(true)
    expect(container.style.width).toBe('')
  })

  // Layout::$width defaults to 0, which is what an untouched class definition
  // sends — it must not turn into `width: 0px`.
  it('treats the class definition default of 0 as unset', () => {
    const container = renderContainer({ width: 0, height: 0 })

    expect(container.classList.contains('w-full')).toBe(true)
    expect(container.style.width).toBe('')
    expect(container.style.height).toBe('')
  })

  it('applies a numeric width in pixels and drops the full-width class', () => {
    const container = renderContainer({ width: 400 })

    expect(container.classList.contains('w-full')).toBe(false)
    expect(container.style.width).toBe('400px')
  })

  it('passes a string width through unchanged', () => {
    const container = renderContainer({ width: '50%' })

    expect(container.style.width).toBe('50%')
  })

  it('applies the configured height', () => {
    const container = renderContainer({ height: 200 })

    expect(container.style.height).toBe('200px')
    // height alone must not affect the width handling
    expect(container.classList.contains('w-full')).toBe(true)
  })

  it('still distributes its children evenly and honours the vbox layout', () => {
    renderContainer({ layout: 'vbox', width: 400 })

    expect(screen.getByTestId('container').getAttribute('data-vertical')).toBe('true')
    expect(screen.getAllByTestId('child')).toHaveLength(2)
    expect(screen.queryByText('first')).not.toBeNull()
    expect(screen.queryByText('second')).not.toBeNull()
  })

  it('renders the width on the container inside a labelled field container', () => {
    render(
      <FieldContainer
        datatype='layout'
        fieldLabel='my-label'
        name='container'
        width={ 300 }
      >
        { [child('first')] }
      </FieldContainer>
    )

    expect(screen.getByTestId('field-label').textContent).toBe('my-label')
    expect(screen.getByTestId('container').style.width).toBe('300px')
  })
})
