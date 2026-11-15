/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type TFunction } from 'i18next'
import ApiError from '@Pimcore/modules/app/error-handler/classes/api-error'
import { ErrorKeyTypes } from '@Pimcore/modules/app/error-handler/constants/errorTypes'
import { getErrorMessage } from '@Pimcore/modules/app/error-handler/utils/get-error-message'

const validationMessage = 'Validation failed: Empty mandatory field [ title ]'
const t = jest.fn((key: string) => `translated:${key}`) as unknown as TFunction

describe('getErrorMessage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('shows an element validation message verbatim instead of using it as a translation key', () => {
    const content = new ApiError({
      data: { errorKey: ErrorKeyTypes.ELEMENT_VALIDATION_FAILED, message: validationMessage }
    }).getContent()

    expect(getErrorMessage(content, t)).toBe(validationMessage)
    expect(t).not.toHaveBeenCalled()
  })

  it('keeps the translatable title of an element validation error', () => {
    const content = new ApiError({
      data: { errorKey: ErrorKeyTypes.ELEMENT_VALIDATION_FAILED, message: validationMessage }
    }).getContent()

    expect(content).toMatchObject({ title: ErrorKeyTypes.ELEMENT_VALIDATION_FAILED })
  })

  it('keeps the message in errorKey for existing SDK consumers', () => {
    const content = new ApiError({
      data: { errorKey: ErrorKeyTypes.ELEMENT_VALIDATION_FAILED, message: validationMessage }
    }).getContent()

    expect(content).toMatchObject({ errorKey: validationMessage, message: validationMessage })
  })

  it('passes validation errors through getContent', () => {
    const validationErrors = [{ field: 'name', message: 'Empty', messageKey: 'validation.mandatory' }]
    const content = new ApiError({
      data: { errorKey: ErrorKeyTypes.ELEMENT_VALIDATION_FAILED, message: validationMessage, validationErrors }
    }).getContent()

    expect(content).toMatchObject({ validationErrors })
  })

  it('omits validationErrors for older backends', () => {
    const content = new ApiError({
      data: { errorKey: ErrorKeyTypes.ELEMENT_VALIDATION_FAILED, message: validationMessage }
    }).getContent()

    expect(content).not.toHaveProperty('validationErrors')
  })

  it('translates any other error key', () => {
    const content = new ApiError({
      data: { errorKey: 'error_permission_denied', message: 'Permission denied' }
    }).getContent()

    expect(getErrorMessage(content, t)).toBe('translated:error.error_permission_denied')
  })

  it('returns plain string content unchanged', () => {
    expect(getErrorMessage('Something broke', t)).toBe('Something broke')
    expect(t).not.toHaveBeenCalled()
  })
})
