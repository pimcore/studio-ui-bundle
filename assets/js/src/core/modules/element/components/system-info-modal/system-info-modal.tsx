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
import { useTranslation } from 'react-i18next'
import { Modal } from '@Pimcore/components/modal/modal'
import { type ISystemInfoModalData } from './provider/system-info-modal-provider'
import { FormKit } from '@Pimcore/components/form/form-kit'
import { Form } from '@Pimcore/components/form/form'
import { Input } from '@Pimcore/components/input/input'

export interface ISystemInfoModalProps {
  isOpen: boolean
  onClose: () => void
  data: ISystemInfoModalData | null
}

export const SystemInfoModal = ({ isOpen, onClose, data }: ISystemInfoModalProps): React.JSX.Element => {
  const { t } = useTranslation()

  if (isNil(data)) {
    return <></>
  }

  return (
    <Modal
      footer={ null }
      onCancel={ onClose }
      open={ isOpen }
      title={ t('element.full-information') }
    >
      <FormKit formProps={ { initialValues: data?.elementInfo } }>
        <FormKit.Panel>
          <Form.Item
            label="ID"
            name="id"
          >
            <Input disabled />
          </Form.Item>
        </FormKit.Panel
      ></FormKit>
    </Modal>
  )
}
