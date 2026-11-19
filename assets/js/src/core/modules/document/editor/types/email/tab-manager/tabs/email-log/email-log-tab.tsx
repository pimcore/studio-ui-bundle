/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { EmailLogContainer } from '@Pimcore/modules/email/log/email-log-container'
import React from 'react'

export const EmailLogTab = (): React.JSX.Element => {
  const { id } = useElementContext()

  return <EmailLogContainer documentId={ id } />
}
