/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type DragAndDropInfo } from '@Pimcore/components/drag-and-drop/droppable'
import { dndIsValidData, dndValidRelationElements, type IRelationAllowedTypesDataComponent } from './allowed-types'

const carsOnly: IRelationAllowedTypesDataComponent = {
  dataObjectsAllowed: true,
  allowedClasses: ['CAR']
}

const car = { id: 1, type: 'object', className: 'CAR' }
const news = { id: 2, type: 'object', className: 'NEWS' }

const drag = (type: string, data: any): DragAndDropInfo => ({
  type,
  data,
  icon: { value: 'folder' },
  title: 'drag'
})

describe('dndValidRelationElements', () => {
  it('accepts a single element of an allowed class', () => {
    expect(dndValidRelationElements(drag('data-object', car), carsOnly)).toEqual([car])
  })

  it('rejects a single element of another class', () => {
    expect(dndValidRelationElements(drag('data-object', news), carsOnly)).toEqual([])
  })

  it('keeps only the allowed classes out of a dragged set', () => {
    const elements = dndValidRelationElements(drag('data-object-list', [car, news]), carsOnly)

    expect(elements).toEqual([car])
  })

  it('rejects a set that holds no allowed class', () => {
    expect(dndValidRelationElements(drag('data-object-list', [news]), carsOnly)).toEqual([])
  })

  it('accepts every class when none are configured', () => {
    const elements = dndValidRelationElements(drag('data-object-list', [car, news]), { dataObjectsAllowed: true })

    expect(elements).toEqual([car, news])
  })
})

describe('dndIsValidData', () => {
  it('stays a single element check, so list drags never match it', () => {
    expect(dndIsValidData(drag('data-object', car), carsOnly)).toBe(true)
    expect(dndIsValidData(drag('data-object-list', [car]), carsOnly)).toBe(false)
  })
})
