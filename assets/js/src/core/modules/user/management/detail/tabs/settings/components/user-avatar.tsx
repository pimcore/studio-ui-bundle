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

import React from 'react'
import { useTranslation } from 'react-i18next'
import { Card } from '@Pimcore/components/card/card'
import { Avatar, Flex, Upload } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { Button } from '@Pimcore/components/button/button'
import { useStyle } from '@Pimcore/modules/user/management/detail/tabs/settings/components/user-avatar.styles'
import { useUserHelper } from '@Pimcore/modules/user/hooks/use-user-helper'
import { useUserContext } from '@Pimcore/modules/user/hooks/use-user-context'

const UserAvatar = ({ ...props }): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyle()
  const classNames = ['avatar--default', styles.avatar]

  // const [form] = Form.useForm()
  const { id } = useUserContext()
  const { uploadUserAvatar } = useUserHelper()

  return (

    <Card title={ t('user-management.settings.avatar') }>
      <Flex
        gap={ 'middle' }
        vertical
      >
        <Avatar
          className={ classNames.join(' ') }
          icon={ <UserOutlined /> }
          size={ 64 }
        />

        <div>
          <Upload
            customRequest={ ({ file, onError, onSuccess }) => {
              let state = 'uploading'
              uploadUserAvatar({ id, file: file as File }).then(response => {
                state = 'done'
              }).catch(error => {
                console.log(error)
                state = 'error'
              })

              return state
            } }
            headers={ {
              'Content-Type': 'multipart/form-data'
            } }
            name={ 'userImage' }
            onChange={ (info) => {
              if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList)
              }
              if (info.file.status === 'done') {
                console.log(`${info.file.name} file uploaded successfully`)
                // message.success(`${info.file.name} file uploaded successfully`)
              } else if (info.file.status === 'error') {
                console.log(`${info.file.name} file upload failed.`)
                // message.error(`${info.file.name} file upload failed.`)
              }
            }
          }
          >
            <Button type={ 'default' }>{t('user-management.settings.upload-avatar')}</Button>
          </Upload>
        </div>
      </Flex>
    </Card>
  )
}

export { UserAvatar }
