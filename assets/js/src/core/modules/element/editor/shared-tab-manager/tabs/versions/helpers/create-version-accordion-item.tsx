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
import { isNil } from 'lodash'
import { formatDateTime } from '@Pimcore/utils/date-time'
import { Checkbox } from 'antd'
import { Icon } from '@Pimcore/components/icon/icon'
import { type PanelTheme } from '@Pimcore/components/accordion/accordion'
import { type TimeLineAccordionItemType } from '@Pimcore/components/accordion-timeline/accordion-timeline'
import { type Version } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/version-api-slice.gen'
import { Tag } from '@Pimcore/components/tag/tag'
import { Box } from '@Pimcore/components/box/box'
import { VersionItem } from '../components/version-item/version-item'
import { type VersionIdentifiers } from '../types/types'

interface CreateAccordionItemProps {
  version: Version
  detailedVersions: VersionIdentifiers[]
  isComparingActive: boolean
  selectVersion: (vId: VersionIdentifiers) => void
  setDetailedVersions: React.Dispatch<React.SetStateAction<VersionIdentifiers[]>>
}

export const createVersionAccordionItem = ({
  version,
  detailedVersions,
  isComparingActive,
  selectVersion,
  setDetailedVersions
}: CreateAccordionItemProps): TimeLineAccordionItemType => {
  const vId = { id: version.id, count: version.versionCount }

  const selected = detailedVersions.some((v => v.id === version.id))
  const published = version.published ?? false
  const autosaved = version.autosave ?? false
  const selectable = isComparingActive

  const themeBySelection = selected ? 'theme-primary' : 'theme-default'
  const themeByState: PanelTheme = published ? 'theme-success' : themeBySelection

  const handleComparisonAction = (): void => {
    selectVersion(vId)
  }

  const handleDetailAction = (): void => {
    setDetailedVersions([{
      id: version.id,
      count: version.versionCount
    }])
  }

  const handleClick = (): void => {
    selectable ? handleComparisonAction() : handleDetailAction()
  }

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
        {isNil(version.autosave) && version.autosave && <Icon value="auto-save" />}
      </div>
    )
  }

  const Extra = (): React.JSX.Element => {
    const { t } = useTranslation()

    if (published) {
      return (
        <Tag
          color={ 'success' }
          iconName={ 'published' }
        >
          {t('version.published')}
        </Tag>
      )
    }

    if (autosaved) {
      return (
        <Tag
          color={ 'geekblue' }
          iconName={ 'auto-save' }
        >
          {t('version.autosaved')}
        </Tag>
      )
    }

    return <></>
  }

  return {
    key: String(version.id),
    selected,
    title: <Title />,
    subtitle: <Subtitle />,
    extra: <Extra />,
    children: (
      <VersionItem
        setDetailedVersions={ setDetailedVersions }
        version={ version }
      />
    ),
    onClick: handleClick,
    theme: themeByState
  }
}
