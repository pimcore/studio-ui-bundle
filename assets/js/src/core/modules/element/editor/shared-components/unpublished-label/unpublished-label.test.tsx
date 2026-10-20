/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
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
import { UnpublishedLabel } from './unpublished-label'

// icons resolve through the dependency injection container, which is not set up here
jest.mock('@Pimcore/components/icon/icon', () => ({
  Icon: ({ value }: { value: string }) => <span data-testid={ `icon-${value}` } />
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

describe('UnpublishedLabel', () => {
  it('names the unpublished state, with the unpublished icon in front', () => {
    render(<UnpublishedLabel published={ false } />)

    const label = screen.getByTestId('element-editor-unpublished-label')
    expect(label).toHaveTextContent('element.state.unpublished')
    expect(label.firstElementChild).toBe(screen.getByTestId('icon-eye-off'))
  })

  it.each([true, undefined])('renders nothing for an element that is not unpublished (%s)', (published) => {
    const { container } = render(<UnpublishedLabel published={ published } />)

    expect(container).toBeEmptyDOMElement()
  })
})
