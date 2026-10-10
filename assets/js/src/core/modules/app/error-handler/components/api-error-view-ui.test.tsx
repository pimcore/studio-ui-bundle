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
import { render } from '@testing-library/react'
import { ApiErrorViewUI } from '@Pimcore/modules/app/error-handler/components/api-error-view-ui'
import ApiError from '@Pimcore/modules/app/error-handler/classes/api-error'
import { ErrorKeyTypes } from '@Pimcore/modules/app/error-handler/constants/errorTypes'

const t = jest.fn((key: string) => `<b>${key}</b>`)

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t })
}))

const emit = jest.fn()

jest.mock('i18next', () => ({ __esModule: true, default: { language: 'de', emit: (...args: unknown[]) => emit(...args) } }))
jest.mock('@Pimcore/modules/app/error-handler/utils/format-validation-error', () => ({
  getMissingValidationKeys: (errors: Array<{ messageKey?: string }>) =>
    [...new Set(errors.map(e => e.messageKey).filter(Boolean))],
  validationErrorToText: (error: { message: string, parameters?: Record<string, string> }) => error.message
}))

const renderErrors = (messages: string[]): HTMLElement => {
  const content = new ApiError({
    data: {
      errorKey: ErrorKeyTypes.ELEMENT_VALIDATION_FAILED,
      message: 'Validation failed',
      validationErrors: messages.map(message => ({ message }))
    }
  }).getContent()

  return render(<ApiErrorViewUI errorContent={ content } />).container
}

describe('ApiErrorViewUI', () => {
  beforeEach(() => {
    t.mockClear()
    emit.mockClear()
  })

  it('renders a validation message as text, not as markup', () => {
    const message = 'Value in field [ code ] is invalid: <b>bad</b>'
    const content = new ApiError({ data: { errorKey: ErrorKeyTypes.ELEMENT_VALIDATION_FAILED, message } }).getContent()
    const { container } = render(<ApiErrorViewUI errorContent={ content } />)

    expect(container.textContent).toBe(message)
    expect(container.querySelector('b')).toBeNull()
    expect(t).not.toHaveBeenCalled()
  })

  it('renders a translated error key as sanitized HTML', () => {
    const { container } = render(<ApiErrorViewUI errorContent={ { errorKey: 'error_permission_denied' } } />)

    expect(container.querySelector('b')?.textContent).toBe('error.error_permission_denied')
  })

  it('renders one row per validation error', () => {
    const container = renderErrors(['one', 'two'])

    expect(Array.from(container.querySelectorAll('li')).map(li => li.textContent)).toEqual(['one', 'two'])
  })

  it('shows at most 10 rows and an "and N more" row', () => {
    const container = renderErrors(Array.from({ length: 13 }, (_v, i) => `e${i}`))
    const rows = container.querySelectorAll('li')

    expect(rows).toHaveLength(11)
    expect(rows[10].textContent).toBe('<b>validation.and_more</b>')
    expect(t).toHaveBeenCalledWith('validation.and_more', { n: 3 })
  })

  it('renders markup and placeholders in messages literally', () => {
    const literal = '<b>x</b> {{field}} $t(foo)'
    const container = renderErrors([literal])

    expect(container.querySelector('b')).toBeNull()
    expect(container.querySelector('li')?.textContent).toBe(literal)
  })

  it('registers each missing message key once via an effect, not the messages', () => {
    const content = new ApiError({
      data: {
        errorKey: ErrorKeyTypes.ELEMENT_VALIDATION_FAILED,
        message: 'Validation failed',
        validationErrors: [
          { message: 'Secret 1', messageKey: 'validation.x' },
          { message: 'Secret 2', messageKey: 'validation.x' }
        ]
      }
    }).getContent()
    const { rerender } = render(<ApiErrorViewUI errorContent={ content } />)
    rerender(<ApiErrorViewUI errorContent={ content } />)

    expect(emit).toHaveBeenCalledTimes(1)
    expect(emit).toHaveBeenCalledWith('missingKey', ['de'], 'translation', 'validation.x', 'validation.x')
  })
})
