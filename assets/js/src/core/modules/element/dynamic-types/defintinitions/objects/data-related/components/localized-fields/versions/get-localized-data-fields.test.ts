/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { getLocalizedDataFields } from './get-localized-data-fields'

describe('getLocalizedDataFields', () => {
  const name = { datatype: 'data', fieldtype: 'input', name: 'name', title: 'Name' }
  const description = { datatype: 'data', fieldtype: 'wysiwyg', name: 'description', title: 'Description' }
  const price = { datatype: 'data', fieldtype: 'quantityValue', name: 'price', title: 'Price' }

  it('returns direct data children unchanged', () => {
    expect(getLocalizedDataFields([name, description], 'Main')).toEqual([
      { field: name, breadcrumbTitle: 'Main' },
      { field: description, breadcrumbTitle: 'Main' }
    ])
  })

  it('returns data fields from nested layouts in definition order', () => {
    const children = [
      name,
      {
        datatype: 'layout',
        fieldtype: 'tabpanel',
        name: 'tabs',
        title: '',
        children: [
          { datatype: 'layout', fieldtype: 'panel', name: 'text', title: 'Text', children: [description] },
          { datatype: 'layout', fieldtype: 'panel', name: 'pricing', title: 'Pricing', children: [price] }
        ]
      }
    ]

    expect(getLocalizedDataFields(children, 'Main')).toEqual([
      { field: name, breadcrumbTitle: 'Main' },
      { field: description, breadcrumbTitle: 'Main/Text' },
      { field: price, breadcrumbTitle: 'Main/Pricing' }
    ])
  })

  it('handles missing children and layouts without children', () => {
    expect(getLocalizedDataFields(undefined)).toEqual([])
    expect(getLocalizedDataFields([{ datatype: 'layout', fieldtype: 'panel', name: 'empty', title: 'Empty' }])).toEqual([])
  })
})
