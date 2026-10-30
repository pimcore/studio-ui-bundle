/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type AbstractDocumentEditableDefinition } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/dynamic-type-document-editable-abstract'

const dynamicType = {
  transformValueForApi: (value: unknown) => ({ transformed: value })
}

jest.mock('@Pimcore/app/depency-injection', () => ({
  container: { get: () => ({ hasDynamicType: () => true, getDynamicType: () => dynamicType }) }
}))
jest.mock('@Pimcore/app/config/services/service-ids', () => ({
  serviceIds: { 'DynamicTypes/DocumentEditableRegistry': 'documentEditableRegistry' }
}))

const { documentEditableApi } = jest.requireActual('./editable-data')

const definition = (id: string, name: string): AbstractDocumentEditableDefinition =>
  ({ id, name, type: 'link', realName: name } as unknown as AbstractDocumentEditableDefinition)

describe('documentEditableApi dynamic editables', () => {
  beforeEach(() => {
    (window as unknown as { editableDefinitions: unknown[] }).editableDefinitions = []
    documentEditableApi.removeValues(['block:1.link', 'block:2.link'])
    documentEditableApi.unregisterDynamicEditables(['row-1', 'row-2'])
  })

  it('keeps the definition of an unregistered editable as long as its value is still part of the document', () => {
    documentEditableApi.registerDynamicEditables([definition('row-1', 'block:1.link'), definition('row-2', 'block:2.link')])
    documentEditableApi.initializeValues({ 'block:1.link': { type: 'link', data: { internal: 5 } } })

    // The renderer of a dialog-owned block row unmounts with the dialog, before the autosave serializes.
    documentEditableApi.unregisterDynamicEditables(['row-1', 'row-2'])

    expect(documentEditableApi.getEditableDefinitions().map((d: AbstractDocumentEditableDefinition) => d.id)).toEqual(['row-1'])
    expect(documentEditableApi.getValues(true)['block:1.link']).toEqual({ type: 'link', data: { transformed: { internal: 5 } } })
  })

  it('drops the definition once the value is gone', () => {
    documentEditableApi.registerDynamicEditables([definition('row-1', 'block:1.link')])
    documentEditableApi.initializeValues({ 'block:1.link': { type: 'link', data: {} } })

    documentEditableApi.removeValues(['block:1.link'])
    documentEditableApi.unregisterDynamicEditables(['row-1'])
    documentEditableApi.initializeValues({ 'block:1.link': { type: 'link', data: { internal: 5 } } })

    expect(documentEditableApi.getEditableDefinitions()).toEqual([])
    expect(documentEditableApi.getValues(true)['block:1.link']).toEqual({ type: 'link', data: { internal: 5 } })
  })

  it('drops a kept definition once it is unregistered again after its value was removed', () => {
    documentEditableApi.registerDynamicEditables([definition('row-1', 'block:1.link')])
    documentEditableApi.initializeValues({ 'block:1.link': { type: 'link', data: {} } })

    documentEditableApi.unregisterDynamicEditables(['row-1'])
    expect(documentEditableApi.getEditableDefinitions().map((d: AbstractDocumentEditableDefinition) => d.id)).toEqual(['row-1'])

    documentEditableApi.removeValues(['block:1.link'])
    documentEditableApi.unregisterDynamicEditables(['row-1'])
    documentEditableApi.initializeValues({ 'block:1.link': { type: 'link', data: { internal: 5 } } })

    expect(documentEditableApi.getEditableDefinitions()).toEqual([])
  })

  it('ignores ids that were never registered', () => {
    documentEditableApi.registerDynamicEditables([definition('row-1', 'block:1.link')])
    documentEditableApi.initializeValues({ 'block:1.link': { type: 'link', data: {} } })

    expect(() => { documentEditableApi.unregisterDynamicEditables(['unknown', 'row-1']) }).not.toThrow()
    expect(documentEditableApi.getEditableDefinitions().map((d: AbstractDocumentEditableDefinition) => d.id)).toEqual(['row-1'])
  })

  it('replaces a kept definition when the same id is registered again', () => {
    documentEditableApi.registerDynamicEditables([definition('row-1', 'block:1.link')])
    documentEditableApi.initializeValues({ 'block:1.link': { type: 'link', data: {} }, 'block:2.link': { type: 'link', data: {} } })
    documentEditableApi.unregisterDynamicEditables(['row-1'])

    documentEditableApi.registerDynamicEditables([definition('row-1', 'block:2.link')])

    expect(documentEditableApi.getEditableDefinitions().map((d: AbstractDocumentEditableDefinition) => d.name)).toEqual(['block:2.link'])
  })

  it('never lists a kept definition without a value, even next to the initial editables', () => {
    (window as unknown as { editableDefinitions: unknown[] }).editableDefinitions = [definition('initial', 'headline')]
    documentEditableApi.registerDynamicEditables([definition('row-1', 'block:1.link')])
    documentEditableApi.initializeValues({ headline: { type: 'input', data: 'x' }, 'block:1.link': { type: 'link', data: {} } })
    documentEditableApi.unregisterDynamicEditables(['row-1'])
    documentEditableApi.removeValues(['block:1.link'])

    expect(documentEditableApi.getEditableDefinitions().map((d: AbstractDocumentEditableDefinition) => d.id)).toEqual(['initial'])

    documentEditableApi.removeValues(['headline'])
  })
})
