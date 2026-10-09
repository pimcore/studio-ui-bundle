/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/**
 * The tooltip of a tree node names the state of unpublished elements, next to their ID and type.
 */

// The `.styles` files pull in antd-style's untranspiled ESM build, which jest does not transform.
jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: {}, cx: () => '', theme: {} }),
  css: () => '',
  cx: () => '',
  keyframes: () => ''
}))

// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { render, screen } from '@testing-library/react'
// eslint-disable-next-line import/first
import { ElementTreeTooltip } from './element-tree-tooltip'
// eslint-disable-next-line import/first
import { type TreeNodeProps } from '../node/tree-node'

// the tooltip content is rendered right away, opening it is not part of this test
jest.mock('../../tooltip/tooltip', () => ({
  Tooltip: ({ title, children }: { title: React.ReactNode, children: React.ReactNode }) => (
    <>
      <div data-testid='tooltip'>{title}</div>
      {children}
    </>
  )
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

const node = (isPublished?: boolean): TreeNodeProps => ({
  id: '81',
  type: 'page',
  isPublished,
  metaData: { document: {} }
}) as unknown as TreeNodeProps

const renderTooltip = (isPublished?: boolean): void => {
  render(
    <ElementTreeTooltip node={ node(isPublished) }>
      <span>Cobra 427</span>
    </ElementTreeTooltip>
  )
}

describe('ElementTreeTooltip', () => {
  it('names the state of an unpublished element', () => {
    renderTooltip(false)

    expect(screen.getByTestId('tooltip')).toHaveTextContent('element.state: element.state.unpublished')
  })

  it.each([true, undefined])('shows no state for an element that is not unpublished (%s)', (isPublished) => {
    renderTooltip(isPublished)

    expect(screen.getByTestId('tooltip')).toHaveTextContent('ID: 81')
    expect(screen.getByTestId('tooltip')).not.toHaveTextContent('element.state')
  })
})
