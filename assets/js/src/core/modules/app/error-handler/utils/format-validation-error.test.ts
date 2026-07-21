/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { formatValidationErrorHtml } from './format-validation-error'

describe('formatValidationErrorHtml', () => {
  it('renders a single violation as a plain line (no list)', () => {
    expect(formatValidationErrorHtml('Die Beschreibung darf nicht leer sein.'))
      .toBe('Die Beschreibung darf nicht leer sein.')
  })

  it('renders multiple newline-separated violations as a list', () => {
    const message =
      'Für den Button muss ein Text angegeben werden.\n' +
      'Link 1: Es muss ein Text angegeben werden.'
    expect(formatValidationErrorHtml(message)).toBe(
      '<ul><li>Für den Button muss ein Text angegeben werden.</li>' +
        '<li>Link 1: Es muss ein Text angegeben werden.</li></ul>'
    )
  })

  it('ignores blank lines and surrounding whitespace', () => {
    expect(formatValidationErrorHtml('\n A \n\n B \n')).toBe('<ul><li>A</li><li>B</li></ul>')
  })

  it('returns an empty string for an empty message', () => {
    expect(formatValidationErrorHtml('')).toBe('')
  })
})
