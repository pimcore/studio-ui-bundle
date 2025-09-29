/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useSystemInfoModalContext } from '@Pimcore/modules/element/components/system-info-modal/provider/use-system-info-modal-context'
import { type ISystemInfoModalData } from '@Pimcore/modules/element/components/system-info-modal/provider/system-info-modal-provider'

interface IOpenModalData {
  data: ISystemInfoModalData
}

interface ISystemInfoModalReturn {
  openModal: (data: IOpenModalData) => void
  closeModal: () => void
}

export const useSystemInfoModal = (): ISystemInfoModalReturn => {
  const systemModalContext = useSystemInfoModalContext()

  const openModal = ({ data }: IOpenModalData): void => {
    systemModalContext.openModal(data)
  }

  const closeModal = (): void => {
    systemModalContext.closeModal()
  }

  return {
    openModal,
    closeModal
  }
}
