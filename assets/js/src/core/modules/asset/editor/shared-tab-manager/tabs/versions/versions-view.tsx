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
import {
  DetailsVersionContainer
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/versions/details-version/details-version-container'

interface VersionsViewProps {
  versions: Version[]
  onClickClearAll: (elementType: GetVersionsApiArg['elementType'], id: number) => void
  onClickPublish: (id: number) => void
  onClickDelete: (id: number) => void
  onBlurNote: (id: number, note: string) => void
}

export interface VersionIdentifiers {
  id: number
  count: number
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
  const [detailedVersions, setDetailedVersions] = useState([] as VersionIdentifiers[])

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
        <VerticalTimeline timeStamps={ versions.map((version) => {
          const vId = { id: version.id, count: version.versionCount }
          const selected = detailedVersions.some((v => v.id === version.id))
          return (
            <VersionCard
              activeDefault={ selected }
              autosaved={ version.autosave }
              className={ [selected ? 'is-active' : '', version.published ? 'is-published' : ''].join(' ') }
              date={ formatDate(version.date) }
              id={ version.id }
              key={ version.id }
              note={ version.note }
              onBlurNote={ (e): void => {
                onBlurNote(version.id, e.target.value.toString() as string)
              } }
              onChangeCheckbox={ (): void => {
                selectVersion(vId)
              } }
              onClick={ () => {
                if (comparingActive) {
                  selectVersion(vId)
                } else {
                  setDetailedVersions([{
                    id: version.id,
                    count: version.versionCount
                  }])
                }
              } }
              onClickDelete={ (): void => {
                setDetailedVersions([])
                onClickDelete(version.id)
              } }
              onClickPublish={ (): void => {
                onClickPublish(version.id)
              } }
              published={ version.published ?? false }
              savedBy={ version.user?.name ?? '' }
              scheduledDate={ isSet(version.scheduled) ? formatDate(version.scheduled!) : undefined }
              selectable={ comparingActive }
              selected={ selected }
              version={ version.versionCount }
            />
          )
        }) }
        />
      </div>
      { detailedVersions.length > 0 && comparingActive && (
        <DetailsVersionsContainer versionIds={ detailedVersions } />
      )}
      { detailedVersions.length > 0 && !comparingActive && (
        <DetailsVersionContainer
          versionId={ detailedVersions[0] }
          versions={ versions }
        />
      )}
    </div>
  )

  function onClickCompareVersion (): void {
    setDetailedVersions([])
    setComparingActive(!comparingActive)
  }

  function selectVersion (vId: VersionIdentifiers): void {
    let tempComparedVersions = [...detailedVersions]
    const isSelected = tempComparedVersions.some(v => v.id === vId.id)
    if (tempComparedVersions.length === 2 && !isSelected) {
      tempComparedVersions = []
    }

    if (!isSelected) {
      tempComparedVersions.push(vId)
    } else {
      tempComparedVersions.splice(tempComparedVersions.indexOf(vId), 1)
    }
    setDetailedVersions(tempComparedVersions)
  }
}
