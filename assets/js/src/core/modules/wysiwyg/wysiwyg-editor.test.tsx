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
import { WysiwygEditor } from './wysiwyg-editor'
import { WysiwygContext, type WysiwygProps } from './interface/wysiwyg'

// the styles module reaches antd-style's untranspiled ESM core; only the inline style
// is under test, so the emotion class generation is stubbed out
jest.mock('@Pimcore/modules/wysiwyg/wysiwyg.styles', () => ({
  useStyles: () => ({ styles: { wysiwygEditor: 'wysiwyg-editor', disabledEditor: 'disabled-editor' } })
}))

jest.mock('@Pimcore/components/drag-and-drop/hooks/use-droppable', () => ({
  useDroppable: () => ({ getStateClasses: () => [] })
}))

// the editable branch is not under test; the registry pulls in the whole app config
jest.mock('../app/component-registry/component-registry', () => ({
  componentConfig: { wysiwyg: { editor: { name: 'wysiwyg-editor' } } },
  ComponentRenderer: () => null
}))

jest.mock('@Pimcore/components/sanitize-html/sanitize-html', () => ({
  SanitizeHtml: ({ html }: { html: string }) => <span data-testid="read-only-html">{ html }</span>
}))

const renderReadOnly = (props: Partial<WysiwygProps>): HTMLElement => {
  render(
    <WysiwygEditor
      editorProps={ { disabled: true, value: '', ...props } }
    />
  )
  return screen.getByTestId('read-only-html').parentElement!
}

describe('WysiwygEditor (read-only)', () => {
  it('keeps an empty data-object field at the editable editor height', () => {
    const box = renderReadOnly({ context: WysiwygContext.DATA_OBJECT })

    expect(box.style.minHeight).toBe('100px')
    expect(box.style.height).toBe('')
  })

  it('respects a configured height below the default on data objects', () => {
    const box = renderReadOnly({ context: WysiwygContext.DATA_OBJECT, height: 70 })

    expect(box.style.minHeight).toBe('70px')
    expect(box.style.height).toBe('70px')
  })

  it('respects a configured height above the default on data objects', () => {
    const box = renderReadOnly({ context: WysiwygContext.DATA_OBJECT, height: '300px' })

    expect(box.style.minHeight).toBe('300px')
    expect(box.style.height).toBe('300px')
  })

  it('leaves inherited document editables at their natural height', () => {
    const box = renderReadOnly({ context: WysiwygContext.DOCUMENT })

    expect(box.style.minHeight).toBe('')
    expect(box.style.height).toBe('')
  })
})
