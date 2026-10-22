/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

jest.mock(
  '@Pimcore/modules/document/editor/shared-tab-manager/tabs/edit/components/editables-renderer/render-editable',
  () => ({ EDITABLE_DEFAULT_FIELD_WIDTHS: {} })
)

// eslint-disable-next-line import/first
import { processBlockTemplate } from './template-processor'
// eslint-disable-next-line import/first
import { type BlockManager } from './block-manager'

const blockManagerFor = (editableName: string): BlockManager => ({
  getEditableName: () => editableName,
  getRealEditableName: () => editableName.split(':').pop() ?? editableName
}) as unknown as BlockManager

const templateEditable = (name: string, type = 'input'): any => ({
  id: `pimcore_editable_${name.replace(/[:.]/g, '_')}`,
  name,
  type,
  config: {}
})

describe('processBlockTemplate', () => {
  let warnSpy: jest.SpyInstance

  beforeEach(() => {
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
  })

  afterEach(() => {
    warnSpy.mockRestore()
  })

  it('replaces the placeholder key in editable names without warning', () => {
    const { editableDefinitions } = processBlockTemplate(
      {
        templateHtml: '<div data-name="items:1000000.term"></div>',
        blockManager: blockManagerFor('items'),
        nextKey: 5
      },
      [templateEditable('items:1000000.term')]
    )

    expect(editableDefinitions.map(definition => definition.name)).toEqual(['items:5.term'])
    expect(warnSpy).not.toHaveBeenCalled()
  })

  it('warns when an editable name built from the block index still contains the placeholder', () => {
    const { editableDefinitions } = processBlockTemplate(
      {
        templateHtml: '<div data-name="items:1000000.details1000001"></div>',
        blockManager: blockManagerFor('items'),
        nextKey: 5
      },
      [templateEditable('items:1000000.term'), templateEditable('items:1000000.details1000001', 'areablock')]
    )

    expect(warnSpy).toHaveBeenCalledTimes(1)
    const message = warnSpy.mock.calls[0][0] as string
    expect(message).toContain('items')
    expect(message).toContain('items:5.details1000001')
    expect(message).toContain('reload(true)')
    expect(editableDefinitions.map(definition => definition.name)).toEqual([
      'items:5.term',
      'items:5.details1000001'
    ])
  })
})
