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

import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { isNil } from 'lodash'
import { Flex } from '@Pimcore/components/flex/flex'
import { Tag } from '@Pimcore/components/tag/tag'
import { Text } from '@Pimcore/components/text/text'
import { Space } from '@Pimcore/components/space/space'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Icon } from '@Pimcore/components/icon/icon'
import { Input } from '@Pimcore/components/input/input'
import { type Version } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/version-api-slice.gen'
import { formatDateTime } from '@Pimcore/utils/date-time'
import {
  useVersionDeleteByIdMutation,
  useVersionPublishByIdMutation,
  useVersionUpdateByIdMutation
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/version-api-slice-enhanced'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { useStyles } from './version-item.style'

export const VersionItem = ({ version, setDetailedVersions }: { version: Version, setDetailedVersions: any }): React.JSX.Element => {
  const [inputValue, setInputValue] = useState(version?.note)

  const [updateVersion, { isError: isUpdateVersionError, error: updateVersionError }] = useVersionUpdateByIdMutation()
  const [publishVersion, { isLoading: isLoadingPublishVersion, isError: isPublishVersionError, error: publishVersionError }] = useVersionPublishByIdMutation()
  const [deleteVersion, { isLoading: isLoadingDeleteVersion, isError: isDeleteVersionError, error: deleteVersionError }] = useVersionDeleteByIdMutation()

  const { t } = useTranslation()
  const { styles } = useStyles()

  const published = version.published ?? false
  const scheduledDate = !isNil(version.scheduled)
    ? formatDateTime({
      timestamp: version.scheduled,
      dateStyle: 'short',
      timeStyle: 'short'
    })
    : undefined

  const handlePublishVersion = async (): Promise<void> => {
    await publishVersion({ id: version.id })

    if (isPublishVersionError) {
      trackError(new ApiError(publishVersionError))
    }
  }

  const handleDeleteVersion = async (): Promise<void> => {
    await deleteVersion({ id: version.id })

    setDetailedVersions([])

    if (isDeleteVersionError) {
      trackError(new ApiError(deleteVersionError))
    }
  }

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value)
  }

  const handleUpdateNote = async (): Promise<void> => {
    await updateVersion({
      id: version.id,
      updateVersion: {
        note: inputValue
      }
    })

    if (isUpdateVersionError) {
      trackError(new ApiError(updateVersionError))
    }
  }

  return (
    <Flex
      gap={ 'extra-small' }
      vertical
    >
      <Flex
        align='top'
        justify='space-between'
      >
        <Tag className={ styles.versionTag }>ID: {version.id}</Tag>
        <Space size='mini'>
          {!published && (
            <IconTextButton
              disabled={ isLoadingPublishVersion || isLoadingDeleteVersion }
              icon={ { value: 'published' } }
              loading={ isLoadingPublishVersion }
              onClick={ handlePublishVersion }
            >
              {t('version.publish')}
            </IconTextButton>
          )}
          <IconButton
            aria-label={ t('aria.version.delete') }
            disabled={ isLoadingPublishVersion || isLoadingDeleteVersion }
            icon={ { value: 'trash' } }
            loading={ isLoadingDeleteVersion }
            onClick={ handleDeleteVersion }
            type={ 'default' }
          />
        </Space>
      </Flex>
      {
        !isNil(scheduledDate) && (
        <div>
          <div>{t('version.schedule-for')}</div>
          <div className={ styles.dateContainer }>
            <Icon
              className={ styles.dateIcon }
              value="calendar"
            />
            <Text className={ styles.dateLabel }>
              {scheduledDate}
            </Text>
          </div>
        </div>
        )
      }
      <div>
        <span>{t('version.note')}</span>
        <Input
          onBlur={ handleUpdateNote }
          onChange={ handleChangeInput }
          onClick={ (e) => { e.stopPropagation() } }
          placeholder={ t('version.note.add') }
          value={ inputValue }
        />
      </div>
    </Flex>
  )
}
