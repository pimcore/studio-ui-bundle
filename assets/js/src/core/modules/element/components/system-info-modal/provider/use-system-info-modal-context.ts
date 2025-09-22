/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useContext } from 'react'
import { isNil } from 'lodash'
import { SystemInfoModalContext, type SystemInfoModalContextProps } from '@Pimcore/modules/element/components/system-info-modal/provider/system-info-modal-provider'

export const useSystemInfoModalContext = (): SystemInfoModalContextProps => {
  const context = useContext(SystemInfoModalContext)

  if (isNil(context)) {
    throw new Error('useSystemInfoModalContext must be used within a SystemInfoModalProvider')
  }

  return context
}
