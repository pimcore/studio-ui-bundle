/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Card } from '@Pimcore/components/card/card'
import { Avatar, Flex, Upload, Skeleton } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { Button } from '@Pimcore/components/button/button'
import { useStyle } from '@Pimcore/modules/user/management/detail/tabs/settings/components/user-avatar.styles'
import { useUserManagementHelper } from '@Pimcore/modules/user/hooks/use-user-management-helper'
import { useUserHelper } from '@Pimcore/modules/auth/hooks/use-user-helper'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'

interface IUserAvatar {
  user: any
  onUserImageChanged?: (image: string | undefined, hasImage: boolean) => void
}
const UserAvatar = ({ user, onUserImageChanged, ...props }: IUserAvatar): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyle()
  const classNames = ['avatar--default', styles.avatar]

  const { uploadUserAvatar, deleteUserAvatar } = useUserManagementHelper()
  const { getUserImageById } = useUserHelper()

  const [userImageLoading, setUserImageLoading] = React.useState<boolean>(user?.hasImage === true && user?.image === undefined)

  const getUserImage = (): void => {
    setUserImageLoading(true)

    getUserImageById(user.id as number).then((image) => {
      if (image !== undefined) {
        onUserImageChanged?.(image, true)
      }
      setUserImageLoading(false)
    }).catch((error: Error) => {
      console.error('Error fetching user image:', error)
    })
  }

  const handleDeleteImage = async (): Promise<void> => {
    try {
      await deleteUserAvatar(user?.id as number)
      onUserImageChanged?.(undefined, false)
    } catch (error) {
      console.error('Error deleting user image:', error)
    }
  }

  useEffect(() => {
    if (user?.hasImage === true) {
      getUserImage()
    }
  }, [])

  return (
    <Card title={ t('user-management.settings.avatar') }>
      <Flex
        gap={ 'middle' }
        vertical
      >
        {userImageLoading
          ? (
            <Skeleton.Avatar
              active
              size={ 64 }
            />
            )
          : (
            <Avatar
              className={ classNames.join(' ') }
              icon={ <UserOutlined /> }
              size={ 64 }
              src={ user?.hasImage === true && user?.image != null ? user.image : undefined }
            />
            )}

        <Flex gap={ 'small' }>
          <Upload
            customRequest={ async ({ file }) => {
              await uploadUserAvatar({ id: user?.id, file: file as File })
              getUserImage()
            } }
            headers={ {
              'Content-Type': 'multipart/form-data'
            } }
            name={ 'userImage' }
            showUploadList={ false }
          >
            <Button type={ 'default' }>{t('user-management.settings.upload-avatar')}</Button>
          </Upload>

          {user?.hasImage === true
            ? (
              <IconButton
                icon={ { value: 'trash' } }
                onClick={ handleDeleteImage }
                type={ 'default' }
              />
              )
            : null}
        </Flex>
      </Flex>
    </Card>
  )
}

export { UserAvatar }
