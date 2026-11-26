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
import { render, screen, act } from '@testing-library/react'
import { PreviewContainer } from './preview-container'

const mockRefetch = jest.fn()
const mockZone = jest.fn()

jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (k: string) => k }) }))
jest.mock('@Pimcore/app/config/app-config', () => ({ appConfig: { defaultPageSize: 20 } }))
jest.mock('@Pimcore/modules/asset/asset-api-slice-enhanced', () => ({
  useAssetGetTreeQuery: () => ({ data: { items: [], totalItems: 0 }, isFetching: false, refetch: mockRefetch })
}))
jest.mock('@Pimcore/modules/asset/hooks/use-asset-draft', () => ({
  useAssetDraft: () => ({ asset: { fullPath: '/Images' } })
}))
jest.mock('./hooks/use-folder-preview-image-size', () => ({
  useFolderPreviewImageSize: () => ({ imageSize: 'small', setImageSize: jest.fn() })
}))
jest.mock('./pagination/pagination', () => ({ Pagination: () => null }))
jest.mock('@Pimcore/modules/asset/editor/types/folder/tab-manager/tabs/preview/card/preview-card-container', () => ({ PreviewCardContainer: () => null }))
jest.mock('@Pimcore/components/content-layout/content-layout', () => ({
  ContentLayout: ({ children }: any) => <div>{children}</div>
}))
jest.mock('@Pimcore/components/content/content', () => ({ Content: ({ children }: any) => <div>{children}</div> }))
jest.mock('@Pimcore/components/toolbar/toolbar', () => ({ Toolbar: () => null }))
jest.mock('@Pimcore/components/flex/flex', () => ({ Flex: ({ children }: any) => <div>{children}</div> }))
jest.mock('@Pimcore/components/segmented/segmented', () => ({ Segmented: () => null }))
jest.mock('@Pimcore/components/text/text', () => ({ Text: () => null }))
jest.mock('@sdk/components', () => ({ IconButton: () => null, Split: ({ children }: any) => <div>{children}</div> }))
jest.mock('@Pimcore/modules/asset/listing/dnd-upload/listing-drop-zone', () => ({
  ListingDropZone: (props: any) => {
    mockZone(props)
    return <div data-testid="drop-zone">{props.children}</div>
  }
}))

describe('Folder PreviewContainer drop upload', () => {
  beforeEach(() => {
    mockZone.mockClear()
    mockRefetch.mockClear()
  })

  it('AC1: wraps the preview content in the shared listing drop zone', () => {
    render(<PreviewContainer />)
    expect(screen.getByTestId('drop-zone')).toBeInTheDocument()
  })

  it('AC2: uses the listing drop zone, which renders the same drop indicator as the listing', () => {
    render(<PreviewContainer />)
    expect(mockZone).toHaveBeenCalled()
  })

  it('AC3: refetches the preview when the upload is done', () => {
    render(<PreviewContainer />)
    act(() => { mockZone.mock.calls[0][0].onUploaded() })
    expect(mockRefetch).toHaveBeenCalledTimes(1)
  })

  it('AC4: adds no drag handling of its own, so tree-asset drags behave as before', () => {
    render(<PreviewContainer />)
    const keys = Object.keys(mockZone.mock.calls[0][0]).sort()
    expect(keys).toEqual(['children', 'onUploaded'])
  })
})
