/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { buildFieldTypeMap } from './build-field-type-map'

describe('buildFieldTypeMap', () => {
  it('collects only top-level data fields and their type ids', () => {
    const layout = {
      datatype: 'layout',
      children: [
        {
          datatype: 'data',
          name: 'sku',
          fieldtype: 'input'
        },
        {
          datatype: 'data',
          name: 'localizedfields',
          fieldtype: 'localizedfields',
          children: [
            {
              datatype: 'data',
              name: 'name',
              fieldtype: 'input'
            },
            {
              datatype: 'data',
              name: 'title',
              fieldType: 'input'
            }
          ]
        }
      ]
    }

    const fieldTypeMap = buildFieldTypeMap(layout)

    expect(fieldTypeMap.get('sku')).toBe('input')
    expect(fieldTypeMap.get('localizedfields')).toBe('localizedfields')
    expect(fieldTypeMap.has('name')).toBe(false)
    expect(fieldTypeMap.has('title')).toBe(false)
  })
})
