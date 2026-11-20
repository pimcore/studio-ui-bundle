/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { TFunction } from 'i18next'
import type { RelationVisibleField } from '@Pimcore/modules/class-definition/class-definition-slice.gen'
import {
  groupRelationVisibleFields,
  toRelationVisibleFieldsConfiguration
} from './use-relation-visible-fields-options'

jest.mock('@Pimcore/modules/class-definition/class-definition-slice-enhanced', () => ({
  useClassGetAvailableVisibleFieldsForRelationQuery: jest.fn()
}))

const t = ((key: string) => `t(${key})`) as unknown as TFunction

const field = (name: string, sources: string[], title: string = name): RelationVisibleField => ({
  name, title, fieldtype: 'input', sources, localized: false
})

describe('toRelationVisibleFieldsConfiguration', () => {
  it('sends the allowed types of the form as plain names', () => {
    expect(toRelationVisibleFieldsConfiguration('advancedManyToManyRelation', {
      objectsAllowed: true,
      classes: [{ classes: 'Product' }, { classes: '' }, 'Category'],
      assetsAllowed: true,
      assetTypes: [{ assetTypes: 'image' }],
      documentsAllowed: false,
      documentTypes: [{ documentTypes: 'page' }]
    })).toEqual({
      fieldtype: 'advancedManyToManyRelation',
      objectsAllowed: true,
      classes: ['Product', 'Category'],
      assetsAllowed: true,
      assetTypes: ['image'],
      documentsAllowed: false,
      documentTypes: []
    })
  })

  it('treats unset settings as not allowed', () => {
    expect(toRelationVisibleFieldsConfiguration('manyToManyRelation', {})).toEqual({
      fieldtype: 'manyToManyRelation',
      objectsAllowed: false,
      classes: [],
      assetsAllowed: false,
      assetTypes: [],
      documentsAllowed: false,
      documentTypes: []
    })
  })
})

describe('groupRelationVisibleFields', () => {
  it('groups the fields by their sources, in the order the relation offers them', () => {
    const groups = groupRelationVisibleFields([
      field('creationDate', ['object', 'asset', 'document'], 'Creation Date'),
      field('name', ['object:Product']),
      field('title', ['object:Product', 'asset'], 'Title'),
      field('color', ['object:Product']),
      field('copyright', ['asset'])
    ], t)

    expect(groups).toEqual([
      {
        label: 't(relations.visible-fields.source.object) · t(relations.visible-fields.source.asset) · t(relations.visible-fields.source.document)',
        options: [{ label: 'Creation Date (creationDate)', value: 'creationDate' }]
      },
      { label: 'Product', options: [{ label: 'name', value: 'name' }, { label: 'color', value: 'color' }] },
      { label: 'Product · t(relations.visible-fields.source.asset)', options: [{ label: 'Title (title)', value: 'title' }] },
      { label: 't(relations.visible-fields.source.asset)', options: [{ label: 'copyright', value: 'copyright' }] }
    ])
  })
})
