/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { DynamicTypeFieldDefinitionImage } from './dynamic-type-field-definition-image'
import { DynamicTypeFieldDefinitionHotspotImage } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/imageAdvanced/dynamic-type-field-definition-hotspot-image'
import { DynamicTypeFieldDefinitionImageGallery } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/imageGallery/dynamic-type-field-definition-image-gallery'
import { DynamicTypeFieldDefinitionExternalImage } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/externalImage/dynamic-type-field-definition-external-image'
import { type FieldDefinitionContext } from '@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-abstract'

// The SDK barrels are untranspiled ESM; the tags chain needs neither the base class body nor FormKit.
jest.mock('@sdk/modules/element', () => ({
  DynamicTypeAbstract: class DynamicTypeAbstract {} // eslint-disable-line @typescript-eslint/no-extraneous-class
}))

jest.mock('@sdk/components', () => ({
  FormKit: { Panel: () => null }
}))

jest.mock('@sdk/app', () => ({
  container: { get: () => undefined },
  serviceIds: {}
}))

// The form fields pull in antd through the shared components; the tags chain does not use them.
jest.mock('@Pimcore/modules/field-definitions/dynamic-types/types/data/_abstracts/field-defintion-data-form-fields', () => ({
  FieldDefinitionDataFormFields: () => null
}))

jest.mock('./field-definition-image-form-fields', () => ({
  FieldDefinitionImageFormFields: () => null
}))

jest.mock('@Pimcore/modules/field-definitions/dynamic-types/types/data/imageAdvanced/field-definition-image-advanced-form-fields', () => ({
  FieldDefinitionImageAdvancedFormFields: () => null
}))

jest.mock('@Pimcore/modules/field-definitions/dynamic-types/types/data/imageGallery/field-definition-image-gallery-form-fields', () => ({
  FieldDefinitionImageGalleryFormFields: () => null
}))

jest.mock('@Pimcore/modules/field-definitions/dynamic-types/types/data/externalImage/field-definition-external-image-form-fields', () => ({
  FieldDefinitionExternalImageFormFields: () => null
}))

const CLASSIFICATION_STORE_TAG = 'classificationStore'

const context: FieldDefinitionContext = { area: ['classification-store'], path: [], fieldDefinitions: {} }

describe('DynamicTypeFieldDefinitionImage', () => {
  it('offers the image type as a classification store key type', () => {
    const tags = new DynamicTypeFieldDefinitionImage().getTags(context)

    expect(tags).toContain(CLASSIFICATION_STORE_TAG)
    expect(tags).toContain('image')
    expect(tags).toContain('group:data')
  })

  it('does not offer the other image types as classification store key types', () => {
    expect(new DynamicTypeFieldDefinitionHotspotImage().getTags(context)).not.toContain(CLASSIFICATION_STORE_TAG)
    expect(new DynamicTypeFieldDefinitionImageGallery().getTags(context)).not.toContain(CLASSIFICATION_STORE_TAG)
    expect(new DynamicTypeFieldDefinitionExternalImage().getTags(context)).not.toContain(CLASSIFICATION_STORE_TAG)
  })
})
