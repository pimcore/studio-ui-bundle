/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNil } from 'lodash'
import { useContext } from 'react'
import { SendTestEmailContext, type SendTestEmailContextProps } from './send-test-email-provider'

export const useSendTestEmailContext = (): SendTestEmailContextProps => {
  const context = useContext(SendTestEmailContext)
  if (isNil(context)) {
    throw new Error('useSendTestEmailContext must be used within a SendTestEmailProvider')
  }

  return context
}
