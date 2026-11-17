/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type InheritanceState } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/inheritance-state-provider/inheritance-state-provider'
import { filterInheritedFields } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/utils/group-value'
import { collectChangedFieldPaths, createIsInherited } from './comparison-inheritance'

const STORE_FIELD = 'store'
const GROUP_ID = '7'
const LOCALE = 'de'
const KEY_ID = '11'
const OTHER_KEY_ID = '12'
const TYPED_VALUE = 'typed'
const KEY_PATH = `${STORE_FIELD}.${GROUP_ID}.${LOCALE}.${KEY_ID}`
const OTHER_KEY_PATH = `${STORE_FIELD}.${GROUP_ID}.${LOCALE}.${OTHER_KEY_ID}`

describe('the paths a comparison change carries', () => {
  it('reports the key inside the buckets of a classification store', () => {
    const changedValues = { [STORE_FIELD]: { [GROUP_ID]: { [LOCALE]: { [KEY_ID]: TYPED_VALUE } } } }

    expect(collectChangedFieldPaths(changedValues)).toEqual([KEY_PATH])
  })

  it('reports the key itself where its value is a list of entries', () => {
    const changedValues = { [STORE_FIELD]: { [GROUP_ID]: { [LOCALE]: { [KEY_ID]: [{ v: TYPED_VALUE }] } } } }

    expect(collectChangedFieldPaths(changedValues)).toEqual([KEY_PATH])
  })

  it('reports a field that holds its value directly by its name', () => {
    expect(collectChangedFieldPaths({ title: TYPED_VALUE })).toEqual(['title'])
  })
})

describe('whether a field of the comparison still inherits', () => {
  const inheritanceStates: Record<string, InheritanceState> = {
    [KEY_PATH]: { inherited: true },
    [OTHER_KEY_PATH]: { inherited: true }
  }

  const getInheritanceState = (name: string[]): InheritanceState | undefined => inheritanceStates[name.join('.')]

  it('reads a field the comparison did not touch from the editor state', () => {
    const isInherited = createIsInherited({ changedFieldPaths: new Set(), getInheritanceState })

    expect(isInherited(KEY_PATH)).toBe(true)
  })

  it('reports a field the comparison typed into as holding an own value', () => {
    const isInherited = createIsInherited({ changedFieldPaths: new Set([KEY_PATH]), getInheritanceState })

    expect(isInherited(KEY_PATH)).toBe(false)
    expect(isInherited(OTHER_KEY_PATH)).toBe(true)
  })

  describe('applying an edit of an inherited key', () => {
    const storeValue = { [GROUP_ID]: { [LOCALE]: { [KEY_ID]: TYPED_VALUE, [OTHER_KEY_ID]: 'inherited value' } } }

    const buildPayload = (changedFieldPaths: Set<string>): Record<string, any> => {
      const isInherited = createIsInherited({ changedFieldPaths, getInheritanceState })

      // what mergeChangedValues of the store does with the dialog's isInherited, named relative
      // to the field the way the editor's own control names it
      return filterInheritedFields(storeValue, name => isInherited(`${STORE_FIELD}.${name}`))
    }

    it('writes the typed value as an own value', () => {
      expect(buildPayload(new Set([KEY_PATH]))).toEqual({ [GROUP_ID]: { [LOCALE]: { [KEY_ID]: TYPED_VALUE } } })
    })

    // The editor state cannot see the edit: nothing in the dialog breaks inheritance, so reading
    // it alone drops the value and encodes the group as holding no own value at all.
    it('keeps writing nothing where no edit was collected', () => {
      expect(buildPayload(new Set())).toEqual({ [GROUP_ID]: [] })
    })
  })
})
