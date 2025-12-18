/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useEffect } from 'react'
import { useSendTestEmailContext } from './provider/use-send-test-email-context'
import { useWidgetManager } from '@Pimcore/modules/widget-manager/hooks/use-widget-manager'

export const SEND_TEST_EMAIL_BUTTON_ID = 'send-test-email-button'

export const SendTestEmailButton = (): null => {
  const { setIsOpen } = useSendTestEmailContext()
  const { closeWidget } = useWidgetManager()

  useEffect(() => {
    setIsOpen(true)
    closeWidget(SEND_TEST_EMAIL_BUTTON_ID)
  }, [])

  return null
}
