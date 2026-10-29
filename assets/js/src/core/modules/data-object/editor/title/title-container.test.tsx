/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { render } from '@testing-library/react'
import { type TabNode } from 'flexlayout-react'
import { TitleContainer } from './title-container'
import { useDataObjectDraft } from '@Pimcore/modules/data-object/hooks/use-data-object-draft'

jest.mock('@Pimcore/app/router/router', () => ({ baseUrl: '' }))
jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))
jest.mock('@Pimcore/modules/widget-manager/title/tab-title-container', () => ({ TabTitleContainer: () => null }))
jest.mock('@Pimcore/modules/data-object/hooks/use-data-object-draft', () => ({ useDataObjectDraft: jest.fn() }))

const mockDraft = (dataObject: Record<string, unknown> | undefined): void => {
  (useDataObjectDraft as jest.Mock).mockReturnValue({ dataObject })
}

const renderTitle = (nodeName: string): TabNode => {
  const node = {
    getConfig: () => ({ id: 1 }),
    getName: () => nodeName
  } as unknown as TabNode

  render(<TitleContainer node={ node } />)

  return node
}

const customAttributes = (key: string | null): Record<string, unknown> => ({
  icon: null,
  tooltip: null,
  additionalIcons: [],
  key,
  additionalCssClasses: []
})

describe('DataObject TitleContainer', () => {
  it('uses the custom attribute key as tab title', () => {
    mockDraft({ key: 'real-key', parentId: 1, customAttributes: customAttributes('custom-key') })

    expect(renderTitle('node-name').getName()).toBe('custom-key')
  })

  it('uses the real key when no custom attribute key is set', () => {
    mockDraft({ key: 'real-key', parentId: 1, customAttributes: customAttributes(null) })

    expect(renderTitle('node-name').getName()).toBe('real-key')
  })

  it('falls back to the node name while the draft is not loaded', () => {
    mockDraft(undefined)

    expect(renderTitle('node-name').getName()).toBe('node-name')
  })
})
