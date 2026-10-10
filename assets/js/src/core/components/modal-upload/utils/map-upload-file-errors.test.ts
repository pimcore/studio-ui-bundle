/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { UploadFile } from 'antd/es/upload/interface'
import { mapUploadFileErrors } from './map-upload-file-errors'

jest.mock('@Pimcore/modules/app/error-handler/utils/format-validation-error', () => ({
  validationErrorToText: (error: { message: string }) => `row: ${error.message}`
}))

const options = {
  t: ((key: string) => key) as unknown as Parameters<typeof mapUploadFileErrors>[1]['t'],
  hasCheckError: () => false,
  getCheckError: () => undefined
}

const failedFile = (response: unknown): UploadFile => ({ uid: '1', name: 'big.png', status: 'error', response })

describe('mapUploadFileErrors', () => {
  it('shows the translated validation rows instead of the plain server message', () => {
    const [file] = mapUploadFileErrors([failedFile({
      errorKey: 'error_element_validation_failed',
      message: '<p>Image dimensions of <em>big.png</em> are too large.</p>',
      validationErrors: [{ message: 'too large', messageKey: 'validation.image_too_large' }]
    })], options)

    expect(file.response).toBe('row: too large')
  })

  it('keeps the plain message without validation rows', () => {
    const [file] = mapUploadFileErrors([failedFile({
      errorKey: 'error_element_validation_failed',
      message: 'Validation failed'
    })], options)

    expect(file.response).toBe('Validation failed')
  })
})
