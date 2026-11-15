/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { clearFormField } from './clear-form-field'

describe('clearFormField', () => {
  it('clears a top level field', () => {
    expect(clearFormField({}, ['manufacturer'])).toEqual({ manufacturer: null })
  })

  it('accepts a plain field name', () => {
    expect(clearFormField({}, 'manufacturer')).toEqual({ manufacturer: null })
  })

  it('replaces a value that was already collected for the field', () => {
    expect(clearFormField({ manufacturer: 'AC Cars' }, ['manufacturer'])).toEqual({ manufacturer: null })
  })

  it('keeps the other collected fields', () => {
    const current = { manufacturer: 'AC Cars', name: 'Cobra 475' }

    expect(clearFormField(current, ['manufacturer'])).toEqual({ manufacturer: null, name: 'Cobra 475' })
  })

  it('clears a single locale of a localized field', () => {
    const current = { localizedfields: { description: { de: 'Beschreibung', en: 'Description' } } }

    expect(clearFormField(current, ['localizedfields', 'description', 'de'])).toEqual({
      localizedfields: { description: { de: null, en: 'Description' } }
    })
  })

  it('builds the nested path when nothing was collected yet', () => {
    expect(clearFormField({}, ['localizedfields', 'description', 'de'])).toEqual({
      localizedfields: { description: { de: null } }
    })
  })

  it('uses the empty value the field type asks for', () => {
    expect(clearFormField({ myBlock: [{ headline: 'Hello' }] }, ['myBlock'], [])).toEqual({ myBlock: [] })
  })

  it('does not mutate the given map', () => {
    const current = { localizedfields: { description: { de: 'Beschreibung' } } }

    clearFormField(current, ['localizedfields', 'description', 'de'])

    expect(current).toEqual({ localizedfields: { description: { de: 'Beschreibung' } } })
  })
})
