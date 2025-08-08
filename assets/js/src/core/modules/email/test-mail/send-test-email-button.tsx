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
import { useTranslation } from 'react-i18next'
import { useSendTestEmailContext } from './provider/use-send-test-email-context'

export const SendTestEmailButton = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { setIsOpen } = useSendTestEmailContext()

  return (
    <button
      className="main-nav__list-btn"
      onClick={ () => { setIsOpen(true) } }
    >
      {t('navigation.test-email')}
    </button>
  )
}
