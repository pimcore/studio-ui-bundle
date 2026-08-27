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
import { ManyToOneRelation } from './many-to-one-relation'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('antd', () => ({
  ...jest.requireActual('antd'),
  Tooltip: ({ children }: { children?: React.ReactNode }) => children
}))

jest.mock('./many-to-one-relation-input', () => ({
  ManyToOneRelationInput: () => <div data-testid="many-to-one-relation-input" />
}))

jest.mock('@Pimcore/components/flex/flex', () => ({
  Flex: ({ children, ...props }: { children?: React.ReactNode }) => <div { ...props }>{ children }</div>
}))

jest.mock('@Pimcore/components/icon-button/icon-button', () => ({
  IconButton: (props: { onClick?: () => void }) => <button onClick={ props.onClick }>icon-button</button>
}))

jest.mock('./many-to-one-relation.styles', () => ({
  useStyles: () => ({ styles: {} })
}))

jest.mock('@Pimcore/modules/element/element-selector/provider/element-selector/element-selector-provider', () => ({
  SelectionType: { Single: 'single', Multiple: 'multiple' }
}))

jest.mock('@Pimcore/modules/element/hooks/use-element-helper', () => ({
  useElementHelper: () => ({
    openElement: jest.fn(),
    mapToElementType: jest.fn(),
    mapToLegacyElementType: jest.fn(),
    executeElementTask: jest.fn()
  })
}))

jest.mock('@Pimcore/modules/asset/actions/download/use-download', () => ({
  useDownload: () => ({ download: jest.fn() })
}))

jest.mock('@Pimcore/modules/element/element-selector/components/triggers/button/element-selector-button', () => ({
  ElementSelectorButton: () => <button data-testid="element-selector-button">select</button>
}))

const uploadSuccessHandlers: Array<(assets: Array<{ id: number, type?: string, fullPath?: string }>) => Promise<void>> = []

jest.mock('@Pimcore/components/modal-upload/components/modal-upload-button/modal-upload-button', () => ({
  ModalUploadButton: (props: { targetFolderPath?: string, onSuccess?: (assets: Array<{ id: number, type?: string, fullPath?: string }>) => Promise<void> }) => {
    uploadSuccessHandlers.push(props.onSuccess ?? (async () => {}))
    return (
      <button
        data-target-folder-path={ props.targetFolderPath }
        data-testid="modal-upload-button"
      >
        upload
      </button>
    )
  }
}))

describe('ManyToOneRelation upload button', () => {
  beforeEach(() => {
    uploadSuccessHandlers.length = 0
  })

  it('renders an upload button with the configured upload path when assets are allowed', () => {
    render(
      <ManyToOneRelation
        assetUploadPath="/images/uploads"
        assetsAllowed
        onChange={ jest.fn() }
      />
    )

    const uploadButton = screen.getByTestId('modal-upload-button')
    expect(uploadButton.getAttribute('data-target-folder-path')).toBe('/images/uploads')
  })

  it('does not render an upload button when assets are not allowed', () => {
    render(
      <ManyToOneRelation
        assetsAllowed={ false }
        onChange={ jest.fn() }
      />
    )

    expect(screen.queryByTestId('modal-upload-button')).toBeNull()
  })

  it('does not render an upload button when the field is disabled', () => {
    render(
      <ManyToOneRelation
        assetsAllowed
        disabled
        onChange={ jest.fn() }
      />
    )

    expect(screen.queryByTestId('modal-upload-button')).toBeNull()
  })

  it('sets the field value to the uploaded asset on successful upload', async () => {
    const onChange = jest.fn()

    render(
      <ManyToOneRelation
        assetsAllowed
        onChange={ onChange }
      />
    )

    await act(async () => {
      await uploadSuccessHandlers[0]([{ id: 42, type: 'image', fullPath: '/images/uploads/photo.jpg' }])
    })

    expect(onChange).toHaveBeenCalledWith({
      type: 'asset',
      subtype: 'image',
      id: 42,
      fullPath: '/images/uploads/photo.jpg'
    })
  })
})
