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
import { Modal } from '@Pimcore/components/modal/modal'

export interface ISystemInfoModalProps {
  isOpen: boolean
  onClose: () => void
}

export const SystemInfoModal = ({ isOpen, onClose }: ISystemInfoModalProps): React.JSX.Element => {
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
