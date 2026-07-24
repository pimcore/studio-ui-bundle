/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

jest.mock('../components/areablock-editable/with-areablock-render-query', () => ({
  WithAreablockRenderQuery: (): null => null
}))

jest.mock('@Pimcore/app/public-api/helpers/api-helper', () => ({
  getPimcoreStudioApi: jest.fn()
}))

// eslint-disable-next-line import/first
import { DynamicTypeDocumentEditableAreablock, type AreablockEditableDefinition } from './dynamic-type-document-editable-areablock'

const EDITABLE_NAME = 'content'
const EDITABLE_ID = 'pimcore_editable_content'

const createContainer = (entryKeys: Array<string | null>): HTMLDivElement => {
  const container = document.createElement('div')
  container.id = EDITABLE_ID
  container.setAttribute('data-name', EDITABLE_NAME)
  container.setAttribute('data-type', 'areablock')

  entryKeys.forEach(key => {
    const element = document.createElement('div')
    element.className = 'pimcore_area_entry pimcore_block_entry'
    element.setAttribute('data-name', EDITABLE_NAME)
    element.setAttribute('type', 'hero-teaser')

    if (key !== null) {
      element.setAttribute('key', key)
    }

    container.appendChild(element)
  })

  document.body.appendChild(container)

  return container
}

const createProps = (): AreablockEditableDefinition => ({
  id: EDITABLE_ID,
  name: EDITABLE_NAME,
  realName: EDITABLE_NAME,
  data: null,
  type: 'areablock',
  inherited: false,
  inDialogBox: null,
  defaultFieldWidth: { small: 100, medium: 200, large: 300 }
})

describe('DynamicTypeDocumentEditableAreablock', () => {
  const dynamicType = new DynamicTypeDocumentEditableAreablock()

  afterEach(() => {
    document.body.innerHTML = ''
  })

  describe('transformValue', () => {
    it('uses the server-provided indices as the source of truth', () => {
      createContainer([null, null, null])

      const serverValue = [
        { key: '5', type: 'hero-teaser', hidden: false },
        { key: '2', type: 'standard-teaser', hidden: false },
        { key: '12', type: 'hero-grid', hidden: false }
      ]

      expect(dynamicType.transformValue(serverValue, createProps())).toEqual(serverValue)
    })

    it('falls back to the DOM when no server value is available', () => {
      createContainer(['5', '2'])

      expect(dynamicType.transformValue(null, createProps())).toEqual([
        { key: '5', type: 'hero-teaser', hidden: false },
        { key: '2', type: 'hero-teaser', hidden: false }
      ])
    })
  })
})
