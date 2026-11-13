/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { DynamicTypeFieldDefinitionMultiValue } from './dynamic-type-field-definition-multi-value'
import { type FieldDefinitionContext } from '@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-abstract'
import { getMultiValueRefusals, narrowsDeclaration } from './multi-value-refusals'

// The SDK barrels are untranspiled ESM; the tags chain needs neither the base class body nor FormKit.
jest.mock('@sdk/modules/element', () => ({
  DynamicTypeAbstract: class DynamicTypeAbstract {} // eslint-disable-line @typescript-eslint/no-extraneous-class
}))

jest.mock('@sdk/components', () => ({
  FormKit: { Panel: () => null }
}))

jest.mock('@sdk/app', () => ({
  container: { get: () => undefined },
  serviceIds: {}
}))

jest.mock('@sdk/utils', () => ({
  isNonEmptyString: (value: unknown) => typeof value === 'string' && value !== ''
}))

jest.mock('@Pimcore/modules/field-definitions/dynamic-types/types/data/_abstracts/field-defintion-data-form-fields', () => ({
  FieldDefinitionDataFormFields: () => null
}))

jest.mock('./field-definition-multi-value-form-fields', () => ({
  FieldDefinitionMultiValueFormFields: () => null
}))

const storeContext: FieldDefinitionContext = { area: ['classification-store'], path: [], fieldDefinitions: {} }
const classContext: FieldDefinitionContext = { area: ['class-definition'], path: [], fieldDefinitions: {} }

describe('DynamicTypeFieldDefinitionMultiValue', () => {
  it('is offered as a Classification Store key type', () => {
    expect(new DynamicTypeFieldDefinitionMultiValue().getTags(storeContext)).toContain('classificationStore')
  })

  it('is not offered as a field type of the class definition', () => {
    const tags = new DynamicTypeFieldDefinitionMultiValue().getTags(classContext)

    expect(tags).not.toContain('group:data')
    expect(tags).not.toContain('classificationStore')
  })

  it('starts without a delegate, so that it cannot be saved before one is chosen', () => {
    const data = new DynamicTypeFieldDefinitionMultiValue().getDefaultData()

    expect(data.delegateDatatype).toBeNull()
    expect(getMultiValueRefusals(data).map((refusal) => refusal.id)).toEqual(['classification-store.multi-value.delegate-required'])
  })

  it('starts permitting the default variant, and keeps the declaration out of the delegate', () => {
    const type = new DynamicTypeFieldDefinitionMultiValue()
    const hoisted = type.normalizeFieldDefinition({ delegate: { defaultVariant: 'delegate', defaultVariantLabel: 'delegate' } })

    expect(type.getDefaultData().defaultVariant).toBe(true)
    expect(hoisted).not.toHaveProperty('defaultVariant')
    expect(hoisted).not.toHaveProperty('defaultVariantLabel')
  })

  it('hoists the delegate settings without overwriting its own members', () => {
    const hoisted = new DynamicTypeFieldDefinitionMultiValue().normalizeFieldDefinition({
      variants: [{ name: 'metric' }],
      delegate: { variants: 'delegate', defaultUnit: 'cm' }
    })

    expect(hoisted).toMatchObject({ variants: [{ name: 'metric' }], defaultUnit: 'cm' })
  })
})

describe('getMultiValueRefusals', () => {
  const delegated = { delegateDatatype: 'input' }

  it('refuses an empty variant name and a duplicate one, each with its reason', () => {
    expect(getMultiValueRefusals({ ...delegated, variants: [{ name: 'metric' }, { name: ' ' }] }).map((refusal) => refusal.id))
      .toEqual(['classification-store.multi-value.variant-name-empty'])
    expect(getMultiValueRefusals({ ...delegated, variants: [{ name: 'metric' }, { name: 'metric' }] }))
      .toEqual([{ id: 'classification-store.multi-value.variant-name-duplicate', params: { name: 'metric' } }])
  })

  it('treats null and an empty list as declaring no variants', () => {
    expect(getMultiValueRefusals({ ...delegated, variants: null })).toEqual([])
    expect(getMultiValueRefusals({ ...delegated, variants: [] })).toEqual([])
  })

  // The variants are read out of the stored definition blob, so a row an API client wrote without
  // a name at all reaches the dialog. It declares no name, which is the reason already stated.
  it('refuses a row carrying no name at all rather than failing on it', () => {
    expect(getMultiValueRefusals({ ...delegated, variants: [{ name: 'metric' }, {}] }).map((refusal) => refusal.id))
      .toEqual(['classification-store.multi-value.variant-name-empty'])
  })
})

describe('getMultiValueRefusals without a writable slot', () => {
  const delegated = { delegateDatatype: 'input' }
  const NO_SLOT = ['classification-store.multi-value.no-writable-slot']

  it('refuses a key declaring no named variant and declining the default variant', () => {
    expect(getMultiValueRefusals({ ...delegated, defaultVariant: false }).map((refusal) => refusal.id)).toEqual(NO_SLOT)
    expect(getMultiValueRefusals({ ...delegated, defaultVariant: false, variants: [] }).map((refusal) => refusal.id)).toEqual(NO_SLOT)
  })

  it('accepts a declined default variant beside a named variant, and any key permitting it', () => {
    expect(getMultiValueRefusals({ ...delegated, defaultVariant: false, variants: [{ name: 'metric' }] })).toEqual([])
    expect(getMultiValueRefusals({ ...delegated, defaultVariant: true, variants: [] })).toEqual([])
    expect(getMultiValueRefusals({ ...delegated, defaultVariant: null, variants: [] })).toEqual([])
    expect(getMultiValueRefusals({ ...delegated, variants: [] })).toEqual([])
  })
})

describe('narrowsDeclaration', () => {
  const declared = { variants: [{ name: 'metric' }, { name: 'imperial' }], maximum: 3 }

  it('is true when a variant is removed or the maximum is lowered or introduced', () => {
    expect(narrowsDeclaration(declared, { ...declared, variants: [{ name: 'metric' }] })).toBe(true)
    expect(narrowsDeclaration(declared, { ...declared, maximum: 2 })).toBe(true)
    expect(narrowsDeclaration({ ...declared, maximum: null }, declared)).toBe(true)
  })

  it('is true when the default variant is declined, whether it was declared true, null or absent', () => {
    for (const before of [true, null, undefined]) {
      expect(narrowsDeclaration({ ...declared, defaultVariant: before }, { ...declared, defaultVariant: false })).toBe(true)
    }
  })

  it('is false when the default variant stays declined or is permitted again', () => {
    expect(narrowsDeclaration({ ...declared, defaultVariant: false }, { ...declared, defaultVariant: false })).toBe(false)
    expect(narrowsDeclaration({ ...declared, defaultVariant: false }, { ...declared, defaultVariant: true })).toBe(false)
  })

  it('is false when nothing is narrowed, including a cap removed or raised', () => {
    expect(narrowsDeclaration(declared, declared)).toBe(false)
    expect(narrowsDeclaration(declared, { ...declared, maximum: null })).toBe(false)
    expect(narrowsDeclaration(declared, { ...declared, maximum: 5, variants: [...declared.variants, { name: 'x' }] })).toBe(false)
  })
})
