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
import { fireEvent, render, screen } from '@testing-library/react'
import { TagsTabContainer } from './tags-container'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

// antd-style ships untranspiled ESM. Styling is irrelevant to this behaviour.
jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: {}, cx: (...classNames: unknown[]) => classNames.filter(Boolean).join(' '), theme: {} }),
  css: jest.fn(),
  cx: jest.fn(),
  keyframes: jest.fn()
}))

jest.mock('@Pimcore/components/split-layout/split-layout', () => ({
  SplitLayout: ({ rightItem }: { rightItem: { children: React.ReactNode } }) => <div>{rightItem.children}</div>
}))

jest.mock('@Pimcore/components/content/content', () => ({
  Content: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

jest.mock('@Pimcore/components/header/header', () => ({
  Header: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

jest.mock('./components/assigned-tags/assigned-tags', () => ({
  AssignedTagsTable: () => null
}))

jest.mock('./components/tags-tree/tags-tree-container', () => ({
  TagsTreeContainer: () => null
}))

jest.mock('./hooks/use-shortcut-actions', () => ({
  useShortcutActions: () => ({ applyTagsToChildren: jest.fn(), removeAndApplyTagsToChildren: jest.fn() })
}))

jest.mock('@Pimcore/modules/element/hooks/use-element-context', () => ({
  useElementContext: () => ({ id: 1, elementType: 'asset' })
}))

jest.mock('@Pimcore/modules/element/hooks/use-element-draft', () => ({
  useElementDraft: () => ({ element: { hasChildren: true } })
}))

jest.mock('./tags-api-slice-enhanced', () => ({
  useTagGetCollectionForElementByTypeAndIdQuery: () => ({ data: { totalItems: 1, items: [] }, isLoading: false })
}))

describe('TagsTabContainer', () => {
  it('shows a tooltip on the more button next to apply to children and still opens its menu', async () => {
    render(<TagsTabContainer />)

    const button = screen.getByText('tags.apply-tags-to-children').closest('.ant-space-compact')!.querySelectorAll('button')[1]

    fireEvent.mouseEnter(button)
    expect(await screen.findByRole('tooltip')).toHaveTextContent('more-actions')
    expect(await screen.findByText('tags.remove-and-apply-tags-to-children')).toBeInTheDocument()
  })
})
