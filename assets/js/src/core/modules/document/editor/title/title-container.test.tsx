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
import { render, screen } from '@testing-library/react'
import { type TabNode } from 'flexlayout-react'
import { TitleContainer } from './title-container'
import { useDocumentDraft } from '../../hooks/use-document-draft'

jest.mock('@Pimcore/app/router/router', () => ({ baseUrl: '' }))
jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))
// like the real TabTitleContainer: memoised, resolves the title from the node unless a title prop is given
jest.mock('@Pimcore/modules/widget-manager/title/tab-title-container', () => {
  const { memo } = jest.requireActual('react')
  return {
    TabTitleContainer: memo(({ node, title }: { node: { getName: () => string }, title?: string }) => (
      <span data-testid="tab-title">{ title ?? node.getName() }</span>
    ))
  }
})
jest.mock('../../hooks/use-document-draft', () => ({ useDocumentDraft: jest.fn() }))

const mockDraft = (document: Record<string, unknown> | undefined): void => {
  (useDocumentDraft as jest.Mock).mockReturnValue({ document })
}

const createNode = (nodeName: string): TabNode => ({
  getConfig: () => ({ id: 1 }),
  getName: () => nodeName
} as unknown as TabNode)

const renderTitle = (nodeName: string): TabNode => {
  const node = createNode(nodeName)

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

describe('Document TitleContainer', () => {
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

  it('shows the new key in the rendered tab title after a rename', () => {
    const node = createNode('node-name')
    mockDraft({ key: 'old-key', parentId: 1, customAttributes: customAttributes(null) })
    const { rerender } = render(<TitleContainer node={ node } />)

    expect(screen.getByTestId('tab-title')).toHaveTextContent('old-key')

    mockDraft({ key: 'new-key', parentId: 1, customAttributes: customAttributes(null) })
    rerender(<TitleContainer node={ node } />)

    expect(screen.getByTestId('tab-title')).toHaveTextContent('new-key')
  })
})
