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
import { isNil, isUndefined } from 'lodash'
import { useTranslation } from 'react-i18next'
import Link from 'antd/es/typography/Link'
import { Modal } from '@Pimcore/components/modal/modal'
import { type ISystemInfoModalData } from './provider/system-info-modal-provider'
import { FormKit } from '@Pimcore/components/form/form-kit'
import { Form } from '@Pimcore/components/form/form'
import { Input } from '@Pimcore/components/input/input'
import { Text } from '@Pimcore/components/text/text'
import { formatDateTime } from '@Pimcore/utils/date-time'
import { useUserGetCollectionQuery } from '@Pimcore/modules/user/user-api-slice-enhanced'
import { useUser } from '@Pimcore/modules/auth/hooks/use-user'
import { Flex } from '@Pimcore/components/flex/flex'
import { useWidgetManager } from '@Pimcore/modules/widget-manager/hooks/use-widget-manager'
import { USERS_WIDGET } from '@Pimcore/modules/user'
import { formatDataUnit } from '@Pimcore/utils/data-unit'
import { currentDomain } from '@Pimcore/app/config/app-config'
import { elementTypes } from '@Pimcore/types/enums/element/element-type'

export interface ISystemInfoModalProps {
  isOpen: boolean
  onClose: () => void
  data: ISystemInfoModalData | null
}

export const SystemInfoModal = ({ isOpen, onClose, data }: ISystemInfoModalProps): React.JSX.Element => {
  const { t } = useTranslation()

  const currentUser = useUser()
  const { data: userList } = useUserGetCollectionQuery()
  const { openMainWidget } = useWidgetManager()

  if (isNil(data)) {
    return <></>
  }

  const handleOpenUserManagement = (userId: number): void => {
    const updConfig = {
      ...USERS_WIDGET,
      config: {
        ...USERS_WIDGET.config,
        userId
      }
    }

    openMainWidget(updConfig)
    onClose()
  }

  const renderInputItem = ({ label, name, value }: { label: string, name?: string, value?: any }): React.JSX.Element => (
    <Form.Item
      label={ label }
      name={ name }
    >
      <Input
        disabled
        value={ value }
      />
    </Form.Item>
  )

  const getUserLabel = (userId: number | null): JSX.Element => {
    const user = userList?.items.find(user => user.id === userId)

    if (!isUndefined(user)) {
      return (
        <Flex
          align="center"
          gap="mini"
        >
          <Text type="secondary">{user.username}</Text>
          {/* need to add the redirect to the admin panel */}
          {currentUser.id === userId && (
            <Link
              onClick={ () => { handleOpenUserManagement(userId) } }
              style={ { textDecoration: 'underline' } }
            >
              (click to open)
            </Link>
          )}
        </Flex>
      )
    }

    return <Text type="secondary">User unknown</Text>
  }

  return (
    <Modal
      footer={ null }
      onCancel={ onClose }
      open={ isOpen }
      title={ t('element.full-information') }
    >
      <FormKit formProps={ { initialValues: data } }>
        <FormKit.Panel>
          {renderInputItem({ label: 'ID', name: 'id' })}

          {renderInputItem({ label: 'Path', name: 'fullPath' })}

          {data.type === 'image' && renderInputItem({ label: 'Public URL', value: `${currentDomain}${data.fullPath}` })}

          {data.elementType === elementTypes.asset && renderInputItem({
            label: 'Type',
            value: data.type + ' ' + (!isNil(data.mimeType) ? '(MIME: ' + data.mimeType + ')' : '')
          })}

          {data.fileSize > 0 && renderInputItem({
            label: 'File Size',
            value: formatDataUnit(data.fileSize)
          })}

          {renderInputItem({
            label: 'Modification Date',
            value: formatDateTime({ timestamp: data.modificationDate, dateStyle: 'full', timeStyle: 'full' })
          })}

          {renderInputItem({
            label: 'Creation Date',
            value: formatDateTime({ timestamp: data.creationDate, dateStyle: 'full', timeStyle: 'full' })
          })}

          <Form.Item label="User Modification">
            <Text type="secondary">{getUserLabel(data.userModification)}</Text>
          </Form.Item>

          <Form.Item label="Owner">
            {getUserLabel(data.userModification)}
          </Form.Item>

          {renderInputItem({ label: 'Deeplink', name: 'deeplink' })}
        </FormKit.Panel
      ></FormKit>
    </Modal>
  )
}
