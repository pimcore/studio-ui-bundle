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
import { useAssetDraft } from '../../hooks/use-asset-draft'

jest.mock('@Pimcore/app/router/router', () => ({ baseUrl: '' }))
jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))
jest.mock('@Pimcore/modules/widget-manager/title/tab-title-container', () => ({ TabTitleContainer: () => null }))
jest.mock('../../hooks/use-asset-draft', () => ({ useAssetDraft: jest.fn() }))

const mockDraft = (asset: Record<string, unknown> | undefined): void => {
  (useAssetDraft as jest.Mock).mockReturnValue({ asset })
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

describe('Asset TitleContainer', () => {
  it('uses the custom attribute key as tab title', () => {
    mockDraft({ filename: 'real-key', parentId: 1, customAttributes: customAttributes('custom-key') })

    expect(renderTitle('node-name').getName()).toBe('custom-key')
  })

  it('uses the real key when no custom attribute key is set', () => {
    mockDraft({ filename: 'real-key', parentId: 1, customAttributes: customAttributes(null) })

    expect(renderTitle('node-name').getName()).toBe('real-key')
  })

  it('falls back to the node name while the draft is not loaded', () => {
    mockDraft(undefined)

    expect(renderTitle('node-name').getName()).toBe('node-name')
  })
})
