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
import { LinkModalContext, type LinkModalContextProps } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/link/provider/link-modal-provider'
import { isNil } from 'lodash'

export const useLinkModalContext = (): LinkModalContextProps => {
  const context = useContext(LinkModalContext)
  if (isNil(context)) {
    throw new Error('useLinkModalContext must be used within a LinkModalProvider')
  }
  return context
}
