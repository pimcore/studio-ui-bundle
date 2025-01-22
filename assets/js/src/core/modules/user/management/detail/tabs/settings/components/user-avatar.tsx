/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Card } from '@Pimcore/components/card/card'
import { Avatar, Flex, Upload, Skeleton } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { Button } from '@Pimcore/components/button/button'
import { useStyle } from '@Pimcore/modules/user/management/detail/tabs/settings/components/user-avatar.styles'
import { useUserHelper } from '@Pimcore/modules/user/hooks/use-user-helper'
import { useUserDraft } from '@Pimcore/modules/user/hooks/use-user-draft'

interface IUserAvatar {
  id: number
}
const UserAvatar = ({ id, ...props }: IUserAvatar): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyle()
  const classNames = ['avatar--default', styles.avatar]

  const { user } = useUserDraft(id)
  const { uploadUserAvatar, fetchUserImageById } = useUserHelper()

  const [userImage, setUserImage] = React.useState<any>(user?.image ?? null)
  const [userImageLoading, setUserImageLoading] = React.useState<boolean>(user?.hasImage === true && userImage === null)

  const getUserImage = (): void => {
    setUserImageLoading(true)

    fetchUserImageById({ id }).then(response => {
      setUserImage(response.data)
      setUserImageLoading(false)
    }).catch(error => {
      setUserImageLoading(false)
      console.log(error)
    })
  }

  useEffect(() => {
    if (user?.hasImage === true && userImage === null) {
      getUserImage()
    }
  }, [id])

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
              src={ userImage }
            />
            )}

        <div>
          <Upload
            customRequest={ async ({ file }) => {
              await uploadUserAvatar({ id, file: file as File })
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
        </div>
      </Flex>
    </Card>
  )
}

export { UserAvatar }
