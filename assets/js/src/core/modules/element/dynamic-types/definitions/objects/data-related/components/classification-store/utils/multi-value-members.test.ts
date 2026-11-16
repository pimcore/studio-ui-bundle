/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ClassificationStoreCollection2 } from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'
import { defaultVariantDeclarationOf, multiValueMembersOf } from './multi-value-members'

const METRIC = 'Metric'
const MULTI_VALUE = 'multiValue'

const keyWith = (overrides: Partial<ClassificationStoreCollection2> = {}): ClassificationStoreCollection2 => ({
  id: 12,
  name: 'color',
  description: '',
  definition: { fieldtype: MULTI_VALUE, name: 'color', delegateDatatype: 'input' },
  variants: [{ name: METRIC }],
  ...overrides
})

describe('multiValueMembersOf', () => {
  it('reads each member off the layout, falling back to the definition blob', () => {
    const key = keyWith({
      definition: { fieldtype: MULTI_VALUE, multiValue: false, maximum: 2, unqualifiedValue: false, unqualifiedValueLabel: 'Blob' },
      multiValue: true,
      defaultVariant: true
    })

    expect(multiValueMembersOf(key)).toEqual({
      variants: [{ name: METRIC }],
      multiValue: true,
      maximum: 2,
      defaultVariant: true,
      defaultVariantLabel: 'Blob'
    })
  })

  it('resolves no members for a definition blob that is not recognisably multiValue', () => {
    expect(multiValueMembersOf(keyWith({ definition: { name: 'color' }, defaultVariant: false }))).toEqual({})
  })
})

describe('defaultVariantDeclarationOf', () => {
  it('takes the resolved members over what the layout published', () => {
    const key = keyWith({ definition: { fieldtype: MULTI_VALUE, unqualifiedValue: false }, defaultVariant: undefined })

    expect(defaultVariantDeclarationOf(key).defaultVariant).toBe(false)
  })

  // the floor: a blob that merely omits the field type resolves to no members, and must not read as permitting it
  it('falls back to what the layout published when no member resolves', () => {
    const key = keyWith({ definition: { name: 'color' }, defaultVariant: false, defaultVariantLabel: 'Base' })

    expect(defaultVariantDeclarationOf(key)).toMatchObject({ defaultVariant: false, defaultVariantLabel: 'Base' })
  })

  it('states nothing about the default slot for a key that declares nothing, which permits it', () => {
    expect(defaultVariantDeclarationOf(keyWith()).defaultVariant).toBeUndefined()
  })
})
