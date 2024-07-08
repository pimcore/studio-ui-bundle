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
import i18n from '@Pimcore/app/i18n'
import { useStyles } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/versions/versions-view.style'
import { Button } from 'antd'
import { Icon } from '@Pimcore/components/icon/icon'
import { formatDate, isSet } from '@Pimcore/utils/helpers'
import { VersionCard } from '@Pimcore/components/version-card/version-card'
import {
  type GetVersionsApiArg,
  type Version
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/versions/versions-api-slice.gen'
import { VerticalTimeline } from '@Pimcore/components/vertical-timeline/vertical-timeline'
import {
  DetailsVersionsContainer
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/versions/details-versions/details-versions-container'

interface VersionsViewProps {
  versions: Version[]
  onClickClearAll: (elementType: GetVersionsApiArg['elementType'], id: number) => void
  onClickPublish: (id: number) => void
  onClickDelete: (id: number) => void
  onBlurNote: (id: number, note: string) => void
}

export const VersionsView = ({
  versions,
  onClickDelete,
  onClickPublish,
  onClickClearAll,
  onBlurNote
}: VersionsViewProps): React.JSX.Element => {
  const { styles } = useStyles()
  const [comparingActive, setComparingActive] = useState(false)
  const [detailedVersions, setDetailedVersions] = useState([] as number[])

  const onClickCompareVersion = (): void => {
    setDetailedVersions([])
    setComparingActive(!comparingActive)
  }

  const selectVersion = (versionId: number): void => {
    let tempComparedVersions = [...detailedVersions]
    const isSelected = tempComparedVersions.includes(versionId)
    if (tempComparedVersions.length === 2 && !isSelected) {
      tempComparedVersions = []
    }

    if (!isSelected) {
      tempComparedVersions.push(versionId)
    } else {
      tempComparedVersions.splice(tempComparedVersions.indexOf(versionId), 1)
    }
    setDetailedVersions(tempComparedVersions)
  }

  return (
    <div className={ styles.versions }>
      <div className={ 'left-side' }>
        <div className={ 'flexbox-start-end' }>
          <div>
            <span className={ 'version-label' }>{i18n.t('version.versions')}</span>
            <Button
              className={ comparingActive ? 'compare-button' : '' }
              onClick={ onClickCompareVersion }
            >{i18n.t('version.compare-versions')}</Button>
          </div>
          <Button
            icon={ <Icon name={ 'trash' } /> }
            onClick={ () => {
              if (versions.length === 0) {
                return
              }
              onClickClearAll(
                versions[0].ctype as GetVersionsApiArg['elementType'],
                versions[0].cid
              )
            } }
          >
            {i18n.t('clear-all')}
          </Button>
        </div>
        <VerticalTimeline timeStamps={ versions.map((version) => (
          <VersionCard
            activeDefault={ detailedVersions.includes(version.id) }
            autosaved={ version.autosave }
            className={ detailedVersions.includes(version.id) ? 'is-active' : '' }
            date={ formatDate(version.date) }
            id={ version.id }
            key={ version.id }
            onBlurNote={ (e): void => {
              onBlurNote(version.id, e.target.value.toString() as string)
            } }
            onChangeCheckbox={ (): void => {
              selectVersion(version.id)
            } }
            onClick={ () => {
              if (comparingActive) {
                selectVersion(version.id)
              } else {
                setDetailedVersions([version.id])
              }
            } }
            onClickDelete={ (): void => {
              setDetailedVersions([])
              onClickDelete(version.id)
            } }
            onClickPublish={ (): void => { onClickPublish(version.id) } }
            published={ version.published ?? false }
            savedBy={ version.user?.name ?? '' }
            scheduledDate={ isSet(version.scheduled) ? formatDate(version.scheduled!) : undefined }
            selectable={ comparingActive }
            selected={ detailedVersions.includes(version.id) }
            version={ version.versionCount }
          />
        )) }
        />
      </div>
      { detailedVersions.length > 0 && detailedVersions[0] !== -1 && (
        <DetailsVersionsContainer versionIds={ detailedVersions } />
      )}
    </div>
  )
}
