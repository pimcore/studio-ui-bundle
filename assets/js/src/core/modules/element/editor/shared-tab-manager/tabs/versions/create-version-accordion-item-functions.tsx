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
import { formatDateTime } from '@Pimcore/utils/date-time'
import { isSet } from '@Pimcore/utils/helpers'
import { Checkbox, Input } from 'antd'
import { Icon } from '@Pimcore/components/icon/icon'
import { type PanelTheme } from '@Pimcore/components/accordion/accordion'
import { type TimeLineAccordionItemType } from '@Pimcore/components/accordion-timeline/accordion-timeline'
import { type Version } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/version-api-slice.gen'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Flex } from '@Pimcore/components/flex/flex'
import { Space } from '@Pimcore/components/space/space'
import { Tag } from '@Pimcore/components/tag/tag'
import { useTranslation } from 'react-i18next'
import { Box } from '@Pimcore/components/box/box'

interface VersionIdentifiers {
  id: number
  count: number
}

interface CreateAccordionItemProps {
  version: Version
  detailedVersions: VersionIdentifiers[]
  comparingActive: boolean
  onClickDelete: (id: number) => void
  onClickPublish: (id: number) => Promise<void>
  onBlurNote: (id: number, note: string) => void
  selectVersion: (vId: VersionIdentifiers) => void
  setDetailedVersions: React.Dispatch<React.SetStateAction<VersionIdentifiers[]>>
}

export const createVersionAccordionItem = ({
  version,
  detailedVersions,
  comparingActive,
  onClickDelete,
  onClickPublish,
  onBlurNote,
  selectVersion,
  setDetailedVersions
}: CreateAccordionItemProps): TimeLineAccordionItemType => {
  const vId = { id: version.id, count: version.versionCount }
  const selected = detailedVersions.some((v => v.id === version.id))

  const selectable = comparingActive
  const published = version.published ?? false
  const onClick = (): void => {
    if (comparingActive) {
      selectVersion(vId)
    } else {
      setDetailedVersions([{
        id: version.id,
        count: version.versionCount
      }])
    }
  }

  const scheduledDate = isSet(version.scheduled)
    ? formatDateTime({
      timestamp: version.scheduled!,
      dateStyle: 'short',
      timeStyle: 'short'
    })
    : undefined

  const Title = (): React.JSX.Element => {
    const { t } = useTranslation()

    return (
      <div>
        {selectable && (
          <Box
            inline
            padding={ { right: 'extra-small' } }
          >
            <Checkbox
              checked={ selected }
              onChange={ () => {
                selectVersion(vId)
              } }
            />
          </Box>

        )}
        <span className={ 'title' }>
          {`${t('version.version')} ${version.versionCount} | ${formatDateTime({
            timestamp: version.date,
            dateStyle: 'short',
            timeStyle: 'medium'
          })}`}</span>
      </div>
    )
  }

  const Subtitle = (): React.JSX.Element => {
    const { t } = useTranslation()

    return (
      <div>
        <span className={ 'sub-title' }>{`${t('by')} ${version.user?.name ?? ''}`}</span>
        {isSet(version.autosave) && version.autosave && <Icon value="lightning-01" />}
      </div>
    )
  }

  let themeByState: PanelTheme = selected ? 'theme-primary' : 'theme-default'
  themeByState = published ? 'theme-success' : themeByState

  const Extra = (): React.JSX.Element => {
    const { t } = useTranslation()

    if (!published) {
      return <></>
    }

    return (
      <Tag
        color={ 'success' }
        iconName={ 'world' }
      >
        {t('version.published')}
      </Tag>
    )
  }

  const Component = (): React.JSX.Element => {
    const { t } = useTranslation()
    const [deletingVersion, setDeletingVersion] = useState(false)
    const [publishingVersion, setPublishingVersion] = useState(false)

    const publishVersion = async (): Promise<void> => {
      setPublishingVersion(true)
      await onClickPublish(version.id)
      setPublishingVersion(false)
    }

    const deleteVersion = (): void => {
      setDeletingVersion(true)
      setDetailedVersions([])
      onClickDelete(version.id)
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
                icon={ { value: 'world' } }
                loading={ publishingVersion }
                onClick={ publishVersion }
              >
                {t('version.publish')}
              </IconTextButton>
            )}
            <IconButton
              aria-label={ t('aria.version.delete') }
              disabled={ publishingVersion }
              icon={ { value: 'trash' } }
              loading={ deletingVersion }
              onClick={ deleteVersion }
              type={ 'default' }
            />
          </Space>
        </Flex>
        {
          isSet(scheduledDate) && (
            <div className={ 'row-margin' }>
              <div>{t('version.schedule-for')}</div>
              <div className={ 'date-container' }>
                <Icon value="calender" />
                <span className={ 'scheduled-date' }>{scheduledDate}</span>
              </div>
            </div>
          )
        }
        <div className={ 'row-margin' }>
          <span>{t('version.note')}</span>
          <Input
            defaultValue={ version.note }
            onBlur={ (e): void => {
              onBlurNote(version.id, e.target.value.toString())
            } }
            placeholder={ 'Add a note' }
          />
        </div>
      </Flex>
    )
  }

  return {
    key: String(version.id),
    selected,
    title: <Title />,
    subtitle: <Subtitle />,
    extra: <Extra />,
    children: <Component />,
    onClick,
    theme: themeByState
  }
}
