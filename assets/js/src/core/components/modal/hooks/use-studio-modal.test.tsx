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
import { type ModalFuncProps } from 'antd'
import { useStudioModal } from './use-studio-modal'

const modal = {
  confirm: jest.fn(),
  info: jest.fn(),
  success: jest.fn(),
  error: jest.fn(),
  warning: jest.fn()
}

jest.mock('antd', () => ({
  ...jest.requireActual('antd'),
  App: { useApp: () => ({ modal }) }
}))

jest.mock('@Pimcore/utils/iframe', () => ({ isInIframe: () => false }))

// Pulls in the theme styles, which this suite has no need of.
jest.mock('@Pimcore/components/modal/hooks/draggable-modal-render', () => ({
  withDraggableModalRender: (render?: unknown) => render
}))

jest.mock('@Pimcore/components/icon/icon', () => ({
  Icon: ({ value }: { value: string }) => <span data-testid={ `icon-${value}` } />
}))

// Opens one dialog off the wrapped instance and hands back the config antd was called with.
const open = (method: keyof typeof modal, props: ModalFuncProps): ModalFuncProps => {
  const Harness = (): null => {
    useStudioModal().modal[method](props)

    return null
  }

  render(<Harness />)

  return modal[method].mock.calls.at(-1)![0]
}

describe('useStudioModal', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('gives a confirmation without an icon the studio one', () => {
    expect(open('confirm', { content: 'sure?' }).icon).toBeDefined()
  })

  /**
   * `icon` is a ReactNode, so null is a caller saying "no icon" - the form-style dialogs pass it
   * to suppress the glyph. Defaulting it away would put an icon back on every rename prompt.
   */
  it('leaves an explicitly suppressed icon suppressed', () => {
    expect(open('confirm', { content: 'rename', icon: null }).icon).toBeNull()
  })

  it('leaves a caller-supplied icon alone', () => {
    const icon = <span data-testid="custom" />

    expect(open('confirm', { content: 'sure?', icon }).icon).toBe(icon)
  })

  it.each(['info', 'success', 'error', 'warning'] as const)('does not add an icon to %s', (method) => {
    expect(open(method, { content: 'hello' }).icon).toBeUndefined()
  })
})
