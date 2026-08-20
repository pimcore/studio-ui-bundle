/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

const mockAlertWarn = jest.fn()

jest.mock('@Pimcore/components/modal/alert-modal/hooks/use-alert-modal', () => ({
  useAlertModal: () => ({ warn: mockAlertWarn })
}))

// antd-style is untranspiled ESM — every `.styles.ts` in the render tree goes through this
// factory, so stubbing it here avoids mocking each `.styles.ts` file individually
jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: {}, cx: (...classNames: unknown[]) => classNames.filter(Boolean).join(' '), theme: {} })
}))

// The upload button is the subject here, so it is stubbed with a probe that records
// the props it was handed instead of pulling in the upload modal and its DI.
let mockUploadButtonProps: Record<string, any> | null = null

jest.mock('@Pimcore/components/modal-upload/components/modal-upload-button/modal-upload-button', () => {
  const react = jest.requireActual('react')

  return {
    ModalUploadButton: (props: Record<string, any>) => {
      mockUploadButtonProps = props
      return react.createElement('button', { 'data-testid': 'upload-button' })
    }
  }
})

// The input, the element selector and the icons resolve through DI and untranspiled
// ESM styles - none of them take part in the upload button decision.
jest.mock('./many-to-one-relation-input', () => ({
  ManyToOneRelationInput: () => null
}))

jest.mock('@Pimcore/modules/element/element-selector/components/triggers/button/element-selector-button', () => ({
  ElementSelectorButton: () => null
}))

jest.mock('@Pimcore/modules/element/element-selector/provider/element-selector/element-selector-provider', () => ({
  SelectionType: { Single: 'single', Multiple: 'multiple' }
}))

jest.mock('@Pimcore/components/icon/icon', () => ({
  Icon: () => null
}))

jest.mock('@Pimcore/modules/asset/actions/download/use-download', () => ({
  useDownload: () => ({ download: jest.fn() })
}))

jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width', () => ({
  useFieldWidth: () => ({ small: 200, medium: 300, large: 900 })
}))

jest.mock('@Pimcore/modules/element/hooks/use-element-helper', () => ({
  useElementHelper: () => ({ openElement: jest.fn(), mapToElementType: () => undefined })
}))

// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { act, render, screen } from '@testing-library/react'
// eslint-disable-next-line import/first
import { ManyToOneRelation, type ManyToOneRelationProps } from './many-to-one-relation'

const renderRelation = (props: Partial<ManyToOneRelationProps> = {}): void => {
  mockUploadButtonProps = null
  mockAlertWarn.mockClear()

  render(
    <ManyToOneRelation
      assetsAllowed
      { ...props }
    />
  )
}

describe('ManyToOneRelation inline upload button', () => {
  it('stays hidden unless inline upload was opted into', () => {
    renderRelation()

    expect(screen.queryByTestId('upload-button')).not.toBeInTheDocument()
  })

  it('is shown once inline upload is allowed for an asset relation', () => {
    renderRelation({ assetInlineUploadAllowed: true })

    expect(screen.getByTestId('upload-button')).toBeInTheDocument()
  })

  it('stays hidden when assets cannot be assigned at all', () => {
    renderRelation({ assetInlineUploadAllowed: true, assetsAllowed: false, documentsAllowed: true })

    expect(screen.queryByTestId('upload-button')).not.toBeInTheDocument()
  })

  it('stays hidden while the field is disabled', () => {
    renderRelation({ assetInlineUploadAllowed: true, disabled: true })

    expect(screen.queryByTestId('upload-button')).not.toBeInTheDocument()
  })

  it('stays hidden while the field is read only', () => {
    renderRelation({ assetInlineUploadAllowed: true, readOnly: true })

    expect(screen.queryByTestId('upload-button')).not.toBeInTheDocument()
  })

  it('uploads a single file into the configured folder', () => {
    renderRelation({ assetInlineUploadAllowed: true, assetUploadPath: '/examples' })

    expect(mockUploadButtonProps).toMatchObject({
      maxItems: 1,
      multiple: false,
      targetFolderPath: '/examples'
    })
  })

  it('leaves the target folder to the upload default when no upload path is configured', () => {
    renderRelation({ assetInlineUploadAllowed: true })

    expect(mockUploadButtonProps?.targetFolderPath).toBeUndefined()
  })

  it('assigns the uploaded asset as the relation', async () => {
    const onChange = jest.fn()
    renderRelation({ assetInlineUploadAllowed: true, onChange })

    await act(async () => {
      await mockUploadButtonProps?.onSuccess([{ id: 42, type: 'image', fullPath: '/examples/image.jpg' }])
    })

    expect(onChange).toHaveBeenCalledWith({
      type: 'asset',
      id: 42,
      subtype: 'image',
      fullPath: '/examples/image.jpg'
    })
  })

  it('keeps the current value when the upload reported no asset', async () => {
    const onChange = jest.fn()
    renderRelation({ assetInlineUploadAllowed: true, onChange })

    await mockUploadButtonProps?.onSuccess([])

    expect(onChange).not.toHaveBeenCalled()
  })

  it('assigns the uploaded asset when its type is one of the allowed subtypes', async () => {
    const onChange = jest.fn()
    renderRelation({ assetInlineUploadAllowed: true, allowedAssetTypes: ['image'], onChange })

    await act(async () => {
      await mockUploadButtonProps?.onSuccess([{ id: 7, type: 'image', fullPath: '/examples/image.jpg' }])
    })

    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ id: 7, subtype: 'image' }))
  })

  // The server has already created the asset by then, so the only thing left to
  // protect is the relation value itself.
  it('refuses to assign an uploaded asset whose type the relation disallows', async () => {
    const onChange = jest.fn()
    renderRelation({ assetInlineUploadAllowed: true, allowedAssetTypes: ['image'], onChange })

    await act(async () => {
      await mockUploadButtonProps?.onSuccess([{ id: 8, type: 'document', fullPath: '/examples/spec.pdf' }])
    })

    expect(onChange).not.toHaveBeenCalled()
    expect(mockAlertWarn).toHaveBeenCalledWith({ content: 'many-to-one-relation.upload.subtype-not-allowed' })
  })
})
