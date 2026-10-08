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

describe('ApiErrorViewUI', () => {
  beforeEach(() => {
    t.mockClear()
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
})
