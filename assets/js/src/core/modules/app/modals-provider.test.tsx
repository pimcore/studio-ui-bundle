/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect } from 'react'
import { render, screen } from '@testing-library/react'
import { ModalsProvider } from './modals-provider'
import { useModalHolder } from './modal-holder/use-modal-holder'
import { useUploadModalContext } from '@Pimcore/components/modal-upload/provider/upload-modal-provider/use-upload-modal-context'

// A function declaration, so the hoisted `jest.mock` factories below can call it.
function passThroughComponent (name: string): Record<string, unknown> {
  return {
    __esModule: true,
    [name]: ({ children }: { children?: React.ReactNode }) => <>{ children }</>
  }
}

// The real upload provider renders the upload widget (store, settings, i18n). Only the context
// contract matters here, so it is replaced by a provider that publishes a value through a real
// React context — `useUploadModalContext` keeps reading that same context object.
jest.mock('@Pimcore/components/modal-upload/provider/upload-modal-provider/upload-modal-provider', () => {
  const { createContext } = jest.requireActual<typeof React>('react')
  const UploadContext = createContext<unknown>(undefined)
  const uploadContextValue = { triggerUpload: jest.fn() }

  return {
    __esModule: true,
    UploadContext,
    UploadModalProvider: ({ children }: { children?: React.ReactNode }) => (
      <UploadContext.Provider value={ uploadContextValue }>
        { children }
      </UploadContext.Provider>
    )
  }
})

jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/link/provider/link-modal-provider', () => passThroughComponent('LinkModalProvider'))
jest.mock('../element/components/crop-modal/provider/crop-modal-provider', () => passThroughComponent('CropModalProvider'))
jest.mock('../element/components/hotspot-markers-modal/provider/hotspot-markers-modal-provider', () => passThroughComponent('HotspotMarkersModalProvider'))
jest.mock('../element/components/video-modal/provider/video-modal-provider', () => passThroughComponent('VideoModalProvider'))
jest.mock('../email/test-mail/provider/send-test-email-provider', () => passThroughComponent('SendTestEmailProvider'))
jest.mock('../document/actions/site/provider/site-modal-provider', () => passThroughComponent('SiteModalProvider'))
jest.mock('@Pimcore/modules/about/components/about-dialog/about-dialog-wrapper', () => passThroughComponent('AboutDialogWrapper'))
jest.mock('@Pimcore/modules/bulk-export/components/bulk-export-modal/bulk-export-wrapper', () => passThroughComponent('BulkExportWrapper'))
jest.mock('@Pimcore/modules/bulk-import/components/bulk-import-modal/bulk-import-wrapper', () => passThroughComponent('BulkImportWrapper'))
jest.mock('@Pimcore/modules/open-element/open-element-wrapper', () => passThroughComponent('OpenElementWrapper'))
jest.mock('@Pimcore/modules/app/component-registry/slot-renderer', () => ({
  __esModule: true,
  SlotRenderer: () => null
}))
jest.mock('@Pimcore/modules/app/component-registry/component-config', () => ({
  __esModule: true,
  componentConfig: { global: { modal: { name: 'global.modal' } } }
}))

const HELD_MODAL_ID = 'held-modal'

// Stands in for a modal that contains an upload button (e.g. a relation field with assets allowed).
const UploadAwareModal = (): React.JSX.Element => {
  useUploadModalContext()

  return <div data-testid="upload-aware-modal">upload aware modal</div>
}

const AddModalOnMount = ({ modal }: { modal: React.ReactElement }): null => {
  const { addModal } = useModalHolder()

  useEffect(() => {
    addModal(HELD_MODAL_ID, modal)
  }, [])

  return null
}

describe('ModalsProvider', () => {
  it('renders modals added through the modal holder inside the upload modal provider', () => {
    render(
      <ModalsProvider>
        <AddModalOnMount modal={ <UploadAwareModal /> } />
      </ModalsProvider>
    )

    expect(screen.getByTestId('upload-aware-modal')).toBeInTheDocument()
  })
})
