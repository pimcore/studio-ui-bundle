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
import type { ApiErrorData } from '@Pimcore/modules/app/error-handler/types'

const t = jest.fn((key: string, params?: Record<string, unknown>) => `translated:${key}:${JSON.stringify(params ?? {})}`)

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t })
}))

describe('ApiErrorViewUI', () => {
  beforeEach(() => {
    t.mockClear()
  })

  it('translates a parse error with the HTTP status as interpolation value', () => {
    const content = new ApiError({ status: 'PARSING_ERROR', originalStatus: 502, data: '<html></html>' } as unknown as ApiErrorData).getContent()
    const { container } = render(<ApiErrorViewUI errorContent={ content } />)

    expect(t).toHaveBeenCalledWith('error.error_response_not_json_with_status', { status: 502 })
    expect(container.textContent).toBe('translated:error.error_response_not_json_with_status:{"status":502}')
  })

  it('still translates a plain error key without interpolation values', () => {
    render(<ApiErrorViewUI errorContent={ { errorKey: 'error_permission_denied' } } />)

    expect(t).toHaveBeenCalledWith('error.error_permission_denied', undefined)
  })
})
