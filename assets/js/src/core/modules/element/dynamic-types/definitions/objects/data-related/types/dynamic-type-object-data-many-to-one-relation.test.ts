/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-abstract', () => ({
  DynamicTypeObjectDataAbstract: class DynamicTypeObjectDataAbstract {
    getGridCellEditComponent (): unknown {
      return 'super-grid-cell-edit-component'
    }
  }
}))

jest.mock('@Pimcore/app/depency-injection', () => ({
  container: { get: () => undefined }
}))

jest.mock('@Pimcore/app/config/services/service-ids', () => ({
  serviceIds: {}
}))

const ManyToOneRelation = (): null => null
const ManyToOneRelationComboField = (): null => null

jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-one-relation/many-to-one-relation', () => ({
  ManyToOneRelation
}))

jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-one-relation/components/combo-field/many-to-one-relation-combo-field', () => ({
  ManyToOneRelationComboField
}))

jest.mock('../../grid-cell-preview/relation-list/formatted-relation-list', () => ({
  FormattedRelationList: () => null
}))

const {
  DynamicTypeObjectDataManyToOneRelation
} = jest.requireActual('./dynamic-type-object-data-many-to-one-relation')

interface DynamicTypeLike {
  getObjectDataComponent: (props: any) => { type: unknown, props: Record<string, any> }
  getGridCellEditComponent: (props: any) => any
}

const objectRelation = (overrides: Record<string, unknown> = {}): Record<string, unknown> => ({
  name: 'supplier',
  objectsAllowed: true,
  assetsAllowed: false,
  documentsAllowed: false,
  classes: [{ classes: 'Supplier' }],
  ...overrides
})

describe('DynamicTypeObjectDataManyToOneRelation display mode', () => {
  let type: DynamicTypeLike

  beforeEach(() => {
    type = new DynamicTypeObjectDataManyToOneRelation()
  })

  it('renders the inline search field for display mode combo', () => {
    const element = type.getObjectDataComponent(objectRelation({ displayMode: 'combo' }))

    expect(element.type).toBe(ManyToOneRelationComboField)
  })

  it('renders the path reference input for display mode grid', () => {
    const element = type.getObjectDataComponent(objectRelation({ displayMode: 'grid' }))

    expect(element.type).toBe(ManyToOneRelation)
  })

  it('renders the path reference input when no display mode is configured', () => {
    const element = type.getObjectDataComponent(objectRelation())

    expect(element.type).toBe(ManyToOneRelation)
  })

  it('keeps the path reference input when more than one class is allowed', () => {
    const element = type.getObjectDataComponent(objectRelation({
      displayMode: 'combo',
      classes: [{ classes: 'Supplier' }, { classes: 'Breeder' }]
    }))

    expect(element.type).toBe(ManyToOneRelation)
  })

  it('keeps the path reference input when objects are not allowed', () => {
    const element = type.getObjectDataComponent(objectRelation({
      displayMode: 'combo',
      objectsAllowed: false,
      assetsAllowed: true,
      classes: []
    }))

    expect(element.type).toBe(ManyToOneRelation)
  })

  // The combo searches a single data object class, so anything else the relation
  // accepts would become unselectable. Those configurations must keep the path input.
  describe('mixed target configurations', () => {
    it('keeps the path reference input when assets are also allowed', () => {
      const element = type.getObjectDataComponent(objectRelation({
        displayMode: 'combo',
        assetsAllowed: true
      }))

      expect(element.type).toBe(ManyToOneRelation)
    })

    it('keeps the path reference input when documents are also allowed', () => {
      const element = type.getObjectDataComponent(objectRelation({
        displayMode: 'combo',
        documentsAllowed: true
      }))

      expect(element.type).toBe(ManyToOneRelation)
    })

    it('keeps the path reference input when object folders are also allowed', () => {
      const element = type.getObjectDataComponent(objectRelation({
        displayMode: 'combo',
        classes: [{ classes: 'Supplier' }, { classes: 'folder' }]
      }))

      expect(element.type).toBe(ManyToOneRelation)
    })
  })

  it('passes the edited row id to the inline search field in the grid', () => {
    const element = type.getGridCellEditComponent({
      objectProps: objectRelation({ displayMode: 'combo' }),
      cellProps: { row: { original: { id: 4711 } } }
    })

    expect(element.type).toBe(ManyToOneRelationComboField)
    expect(element.props.objectId).toBe(4711)
  })

  it('delegates grid cell editing to the default component without inline search', () => {
    const element = type.getGridCellEditComponent({
      objectProps: objectRelation({ displayMode: 'grid' }),
      cellProps: { row: { original: { id: 4711 } } }
    })

    expect(element).toBe('super-grid-cell-edit-component')
  })
})
