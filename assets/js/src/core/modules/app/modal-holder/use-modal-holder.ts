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
import { ModalHolderContext, type ModalHolderContextProps } from './modal-holder-provider'
import { isNil } from 'lodash'

export const useModalHolder = (): ModalHolderContextProps => {
  const context = useContext(ModalHolderContext)
  if (isNil(context)) {
    throw new Error('useModalHolder must be used within a ModalHolderProvider')
  }
  return context
}
