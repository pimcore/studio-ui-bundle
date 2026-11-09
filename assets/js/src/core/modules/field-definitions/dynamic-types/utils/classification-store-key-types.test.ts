/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import fs from 'node:fs'
import path from 'node:path'
import { type DynamicTypeFieldDefinitionAbstract, type FieldDefinitionContext } from '@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-abstract'
import {
  CLASSIFICATION_STORE_EXCLUDED_TYPES,
  CLASSIFICATION_STORE_KEY_TYPE_TAG,
  ENGINE_CAPABILITY_RELATIONS,
  ENGINE_CAPABILITY_STRUCTURED_VALUES,
  isKeyTypeHeldByEngine,
  KEY_TYPE_REQUIRED_CAPABILITIES
} from './classification-store-key-types'

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

jest.mock('@sdk/utils', () => ({}))

const context: FieldDefinitionContext = { area: ['classification-store'], path: [], fieldDefinitions: {} }

const DATA_TYPES_DIR = path.resolve(__dirname, '../types/data')
const CALCULATED_VALUE = 'calculatedValue'
const NEWLY_OFFERED_TYPES = [
  'advancedManyToManyObjectRelation', 'advancedManyToManyRelation', 'consent', 'dateRange', 'email', 'externalImage',
  'firstname', 'gender', 'geobounds', 'geopoint', 'geopolygon', 'geopolyline', 'hotspotimage', 'imageGallery',
  'lastname', 'link', 'manyToManyObjectRelation', 'manyToManyRelation', 'manyToOneRelation', 'numericRange',
  'structuredTable', 'video'
]

// The form fields reach antd and the whole application; only the tags are read here.
const mockFormFields = (dir: string): void => {
  fs.readdirSync(dir)
    .filter((file) => /form-fields.*\.tsx$/.test(file) && !file.includes('.test.'))
    .forEach((file) => {
      jest.doMock(path.join(dir, file.replace(/\.tsx$/, '')), () => new Proxy({ __esModule: true }, { get: (target, name) => name === '__esModule' ? true : () => null }))
    })
}

// Every concrete data type of this bundle is a module of its own below types/data; _abstracts is the base classes.
const typeDirectories = fs
  .readdirSync(DATA_TYPES_DIR, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => path.join(DATA_TYPES_DIR, entry.name))

const loadDataTypes = (): DynamicTypeFieldDefinitionAbstract[] => {
  typeDirectories.forEach(mockFormFields)

  return typeDirectories
    .filter((dir) => path.basename(dir) !== '_abstracts')
    .flatMap((dir) => fs
      .readdirSync(dir)
      .filter((file) => /^dynamic-type-field-definition-.*\.tsx$/.test(file))
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      .flatMap((file) => Object.entries(require(path.join(dir, file)) as Record<string, new () => DynamicTypeFieldDefinitionAbstract>))
      .filter(([name, exported]) => name.startsWith('DynamicTypeFieldDefinition') && typeof exported === 'function')
      .map(([, TypeClass]) => new TypeClass()))
}

describe('classification store key types', () => {
  const types = loadDataTypes()
  const offered = types.filter((type) => type.getTags(context).includes(CLASSIFICATION_STORE_KEY_TYPE_TAG)).map((type) => type.id)

  it('finds the data types of the bundle', () => {
    expect(types).toHaveLength(55)
  })

  it('classifies every data type as offered or excluded', () => {
    const unclassified = types
      .map((type) => type.id)
      .filter((id) => !offered.includes(id) && !CLASSIFICATION_STORE_EXCLUDED_TYPES.includes(id))

    // The id in the message is the type to tag with classificationStore or to add to the exclusion set.
    expect(unclassified).toEqual([])
  })

  it('offers no type that is excluded', () => {
    expect(offered.filter((id) => CLASSIFICATION_STORE_EXCLUDED_TYPES.includes(id))).toEqual([])
  })

  it('offers 48 types, among them calculatedValue', () => {
    // 2026-11-05 option-A decision: the calculated type stays offered, the exclusion only scopes the unlocked set.
    expect(offered).toContain(CALCULATED_VALUE)
    expect(offered).toHaveLength(48)
  })

  it('offers the 22 structured types next to the ones offered before', () => {
    expect(offered).toEqual(expect.arrayContaining(NEWLY_OFFERED_TYPES))
  })

  it('declares a capability requirement only for offered types', () => {
    expect(Object.keys(KEY_TYPE_REQUIRED_CAPABILITIES).filter((id) => !offered.includes(id))).toEqual([])
  })
})

describe('isKeyTypeHeldByEngine', () => {
  it('holds everything when the store reported no capability set', () => {
    expect(isKeyTypeHeldByEngine('geopoint', null)).toBe(true)
    expect(isKeyTypeHeldByEngine('geopoint', undefined)).toBe(true)
  })

  it('refuses a structured type on an engine that reports no capability', () => {
    expect(isKeyTypeHeldByEngine('geopoint', [])).toBe(false)
    expect(isKeyTypeHeldByEngine('input', [])).toBe(true)
  })

  it('needs the relations capability for a relation as well', () => {
    expect(isKeyTypeHeldByEngine('manyToOneRelation', [ENGINE_CAPABILITY_STRUCTURED_VALUES])).toBe(false)
    expect(isKeyTypeHeldByEngine('manyToOneRelation', [ENGINE_CAPABILITY_STRUCTURED_VALUES, ENGINE_CAPABILITY_RELATIONS])).toBe(true)
  })
})
