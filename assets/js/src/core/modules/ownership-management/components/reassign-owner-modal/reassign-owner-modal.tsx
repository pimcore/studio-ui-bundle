/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Modal } from '@Pimcore/components/modal/modal'
import { Select } from '@Pimcore/components/select/select'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { usePimcoreStudioApiUserSearchQuery } from '@Pimcore/modules/auth/user/user-api-slice.gen'
import { isNil } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelectedRowsContext } from '../../context/selected-items-context'
import { useOwnershipManagement } from '../../hooks/use-ownership-management'

export interface ReassignOwnerModalProps {
  open: boolean
  configurationType: string
  ids: string[]
  onClose: () => void
}

export const ReassignOwnerModal = (props: ReassignOwnerModalProps): React.JSX.Element => {
  const { open, configurationType, ids, onClose } = props
  const { t } = useTranslation()
  const { reassignOwner } = useOwnershipManagement()
  const { resetSelectedRows } = useSelectedRowsContext()
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedUserId, setSelectedUserId] = useState<number | undefined>(undefined)

  const { data, isFetching, error } = usePimcoreStudioApiUserSearchQuery({ searchQuery }, { skip: !open })

  useEffect(() => {
    if (!isNil(error)) {
      trackError(new ApiError(error))
    }
  }, [error])

  useEffect(() => {
    if (open) {
      setSearchQuery('')
      setSelectedUserId(undefined)
    }
  }, [open])

  const options = (data?.items ?? []).map((user) => ({
    label: user.username,
    value: user.id
  }))

  const handleConfirm = (): void => {
    if (isNil(selectedUserId)) {
      return
    }

    void reassignOwner(configurationType, ids, selectedUserId, () => {
      resetSelectedRows()
    })
    onClose()
  }

  return (
    <Modal
      okButtonProps={ { disabled: isNil(selectedUserId) } }
      okText={ t('ownership-management.reassign-owner.confirm') }
      onCancel={ onClose }
      onOk={ handleConfirm }
      open={ open }
      title={ t('ownership-management.reassign-owner.title', { count: ids.length }) }
    >
      <Select
        filterOption={ false }
        loading={ isFetching }
        onChange={ (value) => { setSelectedUserId(value as number) } }
        onSearch={ (value) => { setSearchQuery(value) } }
        options={ options }
        placeholder={ t('ownership-management.reassign-owner.placeholder') }
        showSearch
        value={ selectedUserId }
        width={ 400 }
      />
    </Modal>
  )
}
