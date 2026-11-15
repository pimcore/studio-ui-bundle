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
import { HotspotImage } from './hotspot-image'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('@Pimcore/components/asset-target/asset-target', () => jest.requireActual('@test-utils/mocks/asset-target-mock'))
jest.mock('@Pimcore/components/drag-and-drop/droppable', () => ({ Droppable: ({ children }: any) => <div>{children}</div> }))
jest.mock('@Pimcore/components/inline-upload', () => ({ InlineUpload: ({ children }: any) => <div>{children}</div> }))
jest.mock('@Pimcore/components/modal-upload/hooks/use-upload-modal', () => ({ useUploadModal: () => ({ triggerUpload: jest.fn() }) }))
jest.mock('@Pimcore/modules/element/element-selector/provider/element-selector/use-element-selector', () => ({ useElementSelector: () => ({ open: jest.fn() }) }))
jest.mock('@Pimcore/modules/element/element-selector/provider/element-selector/element-selector-provider', () => ({ SelectionType: { Single: 'single', Multiple: 'multiple' } }))

jest.mock('./hotspot-image.styles', () => ({ useStyles: () => ({ styles: { image: 'image' } }) }))
jest.mock('@Pimcore/components/card/card', () => ({ Card: ({ children }: any) => <div>{children}</div> }))
jest.mock('./footer', () => ({ HotspotImageFooter: () => <div /> }))
jest.mock('./image-preview', () => ({ HotspotImagePreview: () => <div /> }))
jest.mock('@Pimcore/components/modal/form-modal/hooks/use-form-modal', () => ({ useFormModal: () => ({ confirm: jest.fn() }) }))
jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/hotspot-image/utils/hotspot-converter', () => ({ fromIHotspots: jest.fn(), toIHotspots: jest.fn() }))
jest.mock('@Pimcore/modules/element/components/crop-modal/hooks/use-crop-modal', () => ({ useCropModal: () => ({ openModal: jest.fn() }) }))
jest.mock('@Pimcore/modules/element/components/hotspot-markers-modal/hooks/use-hotspot-markers-modal', () => ({ useHotspotMarkersModal: () => ({ openModal: jest.fn() }) }))

describe('HotspotImage', () => {
  it('offers search and upload on the empty placeholder when editable', () => {
    render(<HotspotImage
      height={ null }
      width={ null }
           />)

    expect(screen.getByText('search')).toBeInTheDocument()
    expect(screen.getByText('upload')).toBeInTheDocument()
  })

  it('offers no search or upload on the empty placeholder when disabled', () => {
    render(<HotspotImage
      disabled
      height={ null }
      width={ null }
           />)

    expect(screen.getByTestId('asset-target')).toBeInTheDocument()
    expect(screen.queryByText('search')).not.toBeInTheDocument()
    expect(screen.queryByText('upload')).not.toBeInTheDocument()
  })
})
