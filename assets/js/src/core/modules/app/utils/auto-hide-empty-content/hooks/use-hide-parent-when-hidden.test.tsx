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
import { useHideParentWhenHidden } from './use-hide-parent-when-hidden'
import { HIDE_BOUNDARY_CLASS } from '../hide-boundary'

const Probe = ({ hidden }: { hidden: boolean }): React.JSX.Element => {
  const { ref } = useHideParentWhenHidden<HTMLDivElement>({ parentSelector: `.${HIDE_BOUNDARY_CLASS}` })

  return (
    <div
      ref={ ref }
      style={ { display: hidden ? 'none' : 'contents' } }
    >
      field
    </div>
  )
}

const renderInBoundary = (
  boundaryStyle: React.CSSProperties,
  hidden: boolean
): { boundary: HTMLElement, unmount: () => void } => {
  const { container, unmount } = render(
    <div
      className={ HIDE_BOUNDARY_CLASS }
      style={ boundaryStyle }
    >
      <Probe hidden={ hidden } />
    </div>
  )

  return { boundary: container.querySelector<HTMLElement>(`.${HIDE_BOUNDARY_CLASS}`)!, unmount }
}

describe('useHideParentWhenHidden', () => {
  it('collapses the boundary when the field renders nothing', () => {
    expect(renderInBoundary({ flex: 1 }, true).boundary.style.display).toBe('none')
  })

  it('leaves a boundary alone when the field has content', () => {
    expect(renderInBoundary({ flex: 1 }, false).boundary.style.display).toBe('')
  })

  // A layout container hides the wrapper of an `invisible` field with its own
  // inline display. The cleanup used to reset that to '' unconditionally, which
  // unhid the field — React does not re-apply a style it still believes is set.
  it('restores the display the boundary already had instead of clearing it', () => {
    const { boundary, unmount } = renderInBoundary({ display: 'none', flex: 1 }, true)

    expect(boundary.style.display).toBe('none')

    unmount()

    expect(boundary.style.display).toBe('none')
  })
})
