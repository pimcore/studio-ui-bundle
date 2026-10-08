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
import { ErrorKeyTypes } from '@Pimcore/modules/app/error-handler/constants/errorTypes'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => `<b>${key}</b>` })
}))

describe('ApiErrorViewUI', () => {
  it('renders a validation message as text, not as markup', () => {
    const message = 'Value in field [ code ] is invalid: <b>bad</b>'
    const { container } = render(
      <ApiErrorViewUI errorContent={ { errorKey: ErrorKeyTypes.ELEMENT_VALIDATION_FAILED, message } } />
    )

    expect(container.textContent).toBe(message)
    expect(container.querySelector('b')).toBeNull()
  })

  it('renders a translated error key as sanitized HTML', () => {
    const { container } = render(<ApiErrorViewUI errorContent={ { errorKey: 'error_permission_denied' } } />)

    expect(container.querySelector('b')?.textContent).toBe('error.error_permission_denied')
  })
})
