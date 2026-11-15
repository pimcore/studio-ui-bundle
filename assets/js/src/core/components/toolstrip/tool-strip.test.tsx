/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

// The `.styles` files pull in antd-style's untranspiled ESM build, which jest does not
// transform. Only the class names asserted below matter here, and those come from
// `classnames`, not from emotion.
jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: {}, cx: () => '', theme: {} }),
  css: () => '',
  cx: () => '',
  keyframes: () => ''
}))

// `Flex` is imported from the SDK barrel, which transitively pulls in the router and the
// base layout — a circular import that cannot be resolved outside the running app.
jest.mock('@sdk/components', () => ({
  Flex: ({ children, align, ...props }: any) => {
    const { createElement } = jest.requireActual('react')
    return createElement('div', props, children)
  }
}))

// The icon component resolves its registry through the DI container, which only exists in
// the running app. The drag handle icon is irrelevant to what is asserted here.
jest.mock('../icon/icon', () => ({ Icon: () => null }))

// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { render, screen } from '@testing-library/react'
// eslint-disable-next-line import/first
import userEvent from '@testing-library/user-event'
// eslint-disable-next-line import/first
import { ToolStrip } from './tool-strip'

describe('ToolStrip', () => {
  // https://github.com/pimcore/studio-ui-bundle/issues/3544: the actions became reachable
  // by keyboard, which exposed that they sat inside the element carrying dnd-kit's drag
  // listeners. dnd-kit's KeyboardSensor activates on Space/Enter and calls preventDefault(),
  // so activating a focused action did nothing at all.
  it('keeps the drag listeners off the revealed actions', async () => {
    const user = userEvent.setup()
    const onDragKeyDown = jest.fn()
    const onAction = jest.fn()

    render(
      <ToolStrip
        activateOnHover
        dragger={ { listeners: { onKeyDown: onDragKeyDown, onPointerDown: jest.fn() } } }
        title="Headline"
      >
        <button onClick={ onAction }>action</button>
      </ToolStrip>
    )

    await user.tab()
    await user.tab()
    expect(screen.getByRole('button', { name: 'action' })).toHaveFocus()

    await user.keyboard('{Enter}')
    expect(onAction).toHaveBeenCalledTimes(1)
    expect(onDragKeyDown).not.toHaveBeenCalled()

    await user.keyboard(' ')
    expect(onAction).toHaveBeenCalledTimes(2)
    expect(onDragKeyDown).not.toHaveBeenCalled()
  })

  it('still hands pointer presses on the drag handle to the drag listeners', async () => {
    const user = userEvent.setup()
    const onDragPointerDown = jest.fn()
    const onDragKeyDown = jest.fn()

    render(
      <ToolStrip
        activateOnHover
        dragger={ { listeners: { onKeyDown: onDragKeyDown, onPointerDown: onDragPointerDown } } }
        title="Headline"
      >
        <button>action</button>
      </ToolStrip>
    )

    await user.click(screen.getByText('Headline'))
    expect(onDragPointerDown).toHaveBeenCalled()

    // Keyboard dragging stays as unreachable as it was before the strip became focusable:
    // the tab stop is the strip itself, so key presses never reach the handle below it.
    // dnd-kit's KeyboardSensor cannot resolve a drop anyway — the dropzones are found by
    // `pointerWithin` collision detection.
    await user.keyboard('{Enter}')
    expect(onDragKeyDown).not.toHaveBeenCalled()
  })
})
