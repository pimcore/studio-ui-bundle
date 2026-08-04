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
import { type Element } from '@Pimcore/modules/element/element-helper'
import { type ElementType, elementTypes } from '@Pimcore/types/enums/element/element-type'
import { type ClassDefinitionListItem, useClassDefinitionCollectionQuery } from '@Pimcore/modules/class-definition/class-definition-slice-enhanced'
import { useSettings } from '@Pimcore/modules/app/settings/hooks/use-settings'

export type ISystemInfoModalData = Element & {
  elementType: ElementType
  deeplink: string
  modificationDate: number | null
  creationDate: number | null
  userOwner: number
  userModification: number | null
  fileSize?: number
  mimeType?: string | null
  className?: string
  draftData?: {
    id: number
    modificationDate: number
    isAutoSave: boolean
  } | null
}

export interface ISystemInfoModalProps {
  onClose: () => void
  data: ISystemInfoModalData
}

export const SystemInfoModal = ({ onClose, data }: ISystemInfoModalProps): React.JSX.Element => {
  const { t } = useTranslation()

  const currentUser = useUser()
  const { data: userList } = useUserGetCollectionQuery()
  const { openMainWidget } = useWidgetManager()
  const { data: classDefinitionData } = useClassDefinitionCollectionQuery()
  const { asset_frontend_prefix: assetFrontendPrefix } = useSettings()

  if (isNil(data)) {
    return <></>
  }

  const modificationDate = data?.draftData?.modificationDate ?? data?.modificationDate

  const getByName = (name: string): ClassDefinitionListItem | undefined => {
    return classDefinitionData?.items?.find((classDefinition) => classDefinition.name === name)
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

    const renderLabel = (value: string): JSX.Element => (
      <Text
        className="m-l-mini"
        type="secondary"
      >
        {value}
      </Text>
    )

    if (userId === 0) return renderLabel(t('system-information.system'))

    if (!isUndefined(user)) {
      return (
        <Flex
          align="center"
          gap="mini"
        >
          {renderLabel(user.username)}
          {userId === currentUser.id && (
            <Link
              onClick={ () => { handleOpenUserManagement(userId) } }
              style={ { textDecoration: 'underline' } }
            >
              ({t('system-information.click-to-open')})
            </Link>
          )}
        </Flex>
      )
    }

    return renderLabel(t('system-information.user-unknown'))
  }

  const shouldShowPublicUrl = (): boolean => {
    if (data.elementType === elementTypes.asset) {
      return data.type !== 'folder'
    }

    if (data.elementType === elementTypes.document) {
      return data.type === 'page' || data.type === 'headlessdocument'
    }

    return false
  }

  const getPublicUrl = (): string => {
    const fullPath = data.fullPath

    if (data.elementType === elementTypes.asset && !isNil(assetFrontendPrefix)) {
      return `${assetFrontendPrefix}${fullPath}`
    }

    return `${currentDomain}${fullPath}`
  }

  return (
    <FormKit formProps={ { initialValues: data } }>
      <FormKit.Panel>
        {renderInputItem({ label: t('system-information.id'), name: 'id' })}
        {renderInputItem({ label: t('system-information.path'), name: 'fullPath' })}
        {shouldShowPublicUrl() &&
          renderInputItem({ label: t('system-information.public-url'), value: getPublicUrl() })
        }
        {!isNil(data?.parentId) && renderInputItem({ label: t('system-information.parent-id'), name: 'parentId' })}
        {renderInputItem({
          label: t('system-information.type'),
          value: data.elementType === elementTypes.asset
            ? data.type + ' ' + (!isNil(data.mimeType) ? '(MIME: ' + data.mimeType + ')' : '')
            : data.type
        })}

        {data.elementType === elementTypes.dataObject && [
          renderInputItem({ label: t('system-information.class-id'), value: getByName(data.className!)?.id ?? '' }),
          renderInputItem({ label: t('system-information.class'), name: 'className' })
        ]}

        {!isUndefined(data.fileSize) && data.fileSize > 0 && renderInputItem({
          label: t('system-information.file-size'),
          value: formatDataUnit(data.fileSize)
        })}

        {!isNil(modificationDate) && renderInputItem({
          label: t('system-information.modification-date'),
          value: formatDateTime({ timestamp: modificationDate, dateStyle: 'full', timeStyle: 'full' })
        })}
        {renderInputItem({
          label: t('system-information.creation-date'),
          value: formatDateTime({ timestamp: data.creationDate, dateStyle: 'full', timeStyle: 'full' })
        })}

        <Form.Item label={ t('system-information.user-modification') }>
          {getUserLabel(data.userModification)}
        </Form.Item>
        <Form.Item label={ t('system-information.owner') }>
          {getUserLabel(data.userOwner)}
        </Form.Item>

        {renderInputItem({ label: t('system-information.deeplink'), name: 'deeplink' })}
      </FormKit.Panel>
    </FormKit>
  )
}
