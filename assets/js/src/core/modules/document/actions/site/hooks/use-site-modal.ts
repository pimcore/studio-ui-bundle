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
import { SiteModalContext, type SiteModalContextProps } from '../provider/site-modal-provider'

export const useSiteModal = (): SiteModalContextProps => {
  const context = useContext(SiteModalContext)

  if (context === undefined) {
    throw new Error('useSiteModal must be used within a SiteModalProvider')
  }

  return context
}
