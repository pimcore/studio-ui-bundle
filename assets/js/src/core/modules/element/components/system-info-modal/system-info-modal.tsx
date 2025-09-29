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
import { isNil } from 'lodash'
import { Modal } from '@Pimcore/components/modal/modal'
import { type ISystemInfoModalData } from './provider/system-info-modal-provider'

export interface ISystemInfoModalProps {
  isOpen: boolean
  onClose: () => void
  data: ISystemInfoModalData | null
}

export const SystemInfoModal = ({ isOpen, onClose, data }: ISystemInfoModalProps): React.JSX.Element => {
  if (isNil(data)) {
    return <></>
  }

  return (
    <Modal
      onCancel={ onClose }
      open={ isOpen }
      title="System Info"
    >
      <div>System Info</div>
    </Modal>
  )
}
