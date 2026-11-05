/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { focusFirstEditableField } from './focus-first-editable-field'

const render = (markup: string): HTMLElement => {
  document.body.innerHTML = `<div id="item">${markup}</div>`

  return document.getElementById('item')!
}

// The item a pipeline renders: the type goes into an input the user never sees, and the editor the
// user does type in follows it. VirtualItem hides the wrapper with an inline display of none.
const hiddenTypeField = '<div style="display: none"><input id="key" type="text" /></div>'
const codeEditor = '<div class="cm-editor"><div contenteditable="true" id="template"></div></div>'

describe('focusFirstEditableField', () => {
  it('skips the hidden type field and focuses the code editor behind it', () => {
    const item = render(`${hiddenTypeField}${codeEditor}`)

    focusFirstEditableField(item)

    expect(document.activeElement).toBe(document.getElementById('template'))
  })

  it('focuses the first field a user can type in', () => {
    const item = render(`${hiddenTypeField}<input id="first" type="text" /><input id="second" type="text" />`)

    focusFirstEditableField(item)

    expect(document.activeElement).toBe(document.getElementById('first'))
  })

  it.each([
    ['a hidden input', '<input id="skipped" type="hidden" />'],
    ['a disabled field', '<input disabled id="skipped" type="text" />'],
    ['a read-only field', '<input id="skipped" readonly type="text" />'],
    ['a field hidden by the hidden attribute', '<div hidden><input id="skipped" type="text" /></div>'],
    ['a field hidden by visibility', '<div style="visibility: hidden"><input id="skipped" type="text" /></div>']
  ])('passes over %s', (_name, markup) => {
    const item = render(`${markup}<input id="target" type="text" />`)

    focusFirstEditableField(item)

    expect(document.activeElement).toBe(document.getElementById('target'))
  })

  it('leaves the focus alone when the item holds no editable field', () => {
    const item = render(`${hiddenTypeField}<button type="button">Delete</button>`)

    focusFirstEditableField(item)

    expect(document.activeElement).toBe(document.body)
  })
})
