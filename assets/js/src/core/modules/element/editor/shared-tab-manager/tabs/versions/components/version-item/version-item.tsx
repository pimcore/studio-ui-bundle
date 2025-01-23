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
import { Space } from '@Pimcore/components/space/space'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Icon } from '@Pimcore/components/icon/icon'
import { Input } from '@Pimcore/components/input/input'
import { type Version } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/version-api-slice.gen'
import { formatDateTime } from '@Pimcore/utils/date-time'
import {
  useVersionDeleteByIdMutation,
  useVersionPublishByIdMutation, useVersionUpdateByIdMutation
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/version-api-slice-enhanced'

export const VersionItem = ({ version, setDetailedVersions }: { version: Version, setDetailedVersions: any }): React.JSX.Element => {
  const { t } = useTranslation()

  const [inputValue, setInputValue] = useState(version?.note)

  const [deletingVersion, setDeletingVersion] = useState(false)
  const [publishingVersion, setPublishingVersion] = useState(false)

  const [updateVersion] = useVersionUpdateByIdMutation()
  const [publishVersion] = useVersionPublishByIdMutation()
  const [deleteVersion] = useVersionDeleteByIdMutation()

  const published = version.published ?? false
  const scheduledDate = isNil(version.scheduled)
    ? formatDateTime({
      timestamp: version.scheduled!,
      dateStyle: 'short',
      timeStyle: 'short'
    })
    : undefined

  const handlePublishVersion = async (): Promise<void> => {
    setPublishingVersion(true)

    await publishVersion({ id: version.id })

    setPublishingVersion(false)
  }

  const handleDeleteVersion = async (): Promise<void> => {
    setDeletingVersion(true)
    setDetailedVersions([])
    await deleteVersion({
      id: version.id
    })
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
        <Tag className={ 'id-tag' }>ID: {version.id}</Tag>
        <Space size='mini'>
          {!published && (
            <IconTextButton
              className={ 'btn-publish' }
              disabled={ publishingVersion || deletingVersion }
              icon={ { value: 'published' } }
              loading={ publishingVersion }
              onClick={ handlePublishVersion }
            >
              {t('version.publish')}
            </IconTextButton>
          )}
          <IconButton
            aria-label={ t('aria.version.delete') }
            disabled={ publishingVersion }
            icon={ { value: 'trash' } }
            loading={ deletingVersion }
            onClick={ handleDeleteVersion }
            type={ 'default' }
          />
        </Space>
      </Flex>
      {
        isNil(scheduledDate) && (
        <div className={ 'row-margin' }>
          <div>{t('version.schedule-for')}</div>
          <div className={ 'date-container' }>
            <Icon value="calendar" />
            <span className={ 'scheduled-date' }>{scheduledDate}</span>
          </div>
        </div>
        )
      }
      <div className={ 'row-margin' }>
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
