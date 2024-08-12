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

import React, {useState} from 'react'
import {useStyles} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/versions/versions-view.style'
import {Button} from 'antd'
import {Icon} from '@Pimcore/components/icon/icon'
import {isSet} from '@Pimcore/utils/helpers'
import {VersionCard} from '@Pimcore/components/version-card/version-card'
import {
  type GetVersionsApiArg,
  type Version
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/versions/versions-api-slice.gen'
import {VerticalTimeline} from '@Pimcore/components/vertical-timeline/vertical-timeline'
import {
  DetailsVersionsContainer
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/versions/details-versions/details-versions-container'
import {NoContent} from '@Pimcore/components/no-content/no-content'
import {
  DetailsVersionContainer
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/versions/details-version/details-version-container'
import {formatDateTime} from '@Pimcore/utils/date-time'
import {useTranslation} from 'react-i18next'
import {Modal} from '@Pimcore/components/modal/modal'

interface VersionsViewProps {
  versions: Version[]
  onClickClearAll: (elementType: GetVersionsApiArg['elementType'], id: number) => Promise<void>
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
  const { t } = useTranslation()
  const { styles } = useStyles()
  const [comparingActive, setComparingActive] = useState(false)
  const [clearAllLoading, setClearAllLoading] = useState(false)
  const [clearAllModalOpen, setClearAllModalOpen] = useState(false)
  const [detailedVersions, setDetailedVersions] = useState([] as VersionIdentifiers[])

  if (versions.length === 0) {
    return (
      <div className={ styles.noContent }>
        <p className={ 'headline' }>{t('version.versions')}</p>
        <div className={ 'empty-container' }>
          <NoContent
            text={ t('version.no-versions-to-show') }
          />
        </div>
      </div>
    )
  }

  const clearVersions = async (): Promise<void> => {

    setClearAllModalOpen(false)

    setClearAllLoading(true)

    const promises = onClickClearAll(
      versions[0].ctype as GetVersionsApiArg['elementType'],
      versions[0].cid
    )

    await Promise.all([promises])

    setClearAllLoading(false)
  }

  const [modal, contextHolder] = Modal.useModal();

  return (
    <div className={ styles.versions }>
      <div className={ 'left-side' }>
        <div className={ 'flexbox-start-end' }>
          <div>
            <span className={ 'version-label' }>{t('version.versions')}</span>
            {versions.length > 0 && (
              <Button
                className={ comparingActive ? 'compare-button' : '' }
                disabled={ clearAllLoading }
                onClick={ onClickCompareVersion }
              >{t('version.compare-versions')}</Button>
            )}
          </div>
          {versions.length > 0 && (
            <>
              <Button
                icon={ <Icon name={ 'trash' } /> }
                onClick={ () => { setClearAllModalOpen(true) } }
              >
                {clearAllLoading ? '...' : t('clear-all')}
              </Button>
              <Modal
                onCancel={ () => { setClearAllModalOpen(false) } }
                onOk={ async () => { await clearVersions() } }
                open={ clearAllModalOpen }
                title={ 'Clear All' }
              >
                <span>Do you really want to delete all versions of this element?</span>
              </Modal>
            </>
          )}
        </div>
        {versions.length > 0 && (
          <VerticalTimeline timeStamps={ versions.map((version) => {
            const vId = { id: version.id, count: version.versionCount }
            const selected = detailedVersions.some((v => v.id === version.id))
            return (
              <VersionCard
                activeDefault={ selected }
                autosaved={ version.autosave }
                className={ [selected ? 'is-active' : '', version.published ? 'is-published' : ''].join(' ') }
                date={ formatDateTime({ timestamp: version.date, dateStyle: 'short', timeStyle: 'medium' }) }
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
                scheduledDate={ isSet(version.scheduled) ? formatDateTime({ timestamp: version.scheduled!, dateStyle: 'short', timeStyle: 'short' }) : undefined }
                selectable={ comparingActive }
                selected={ selected }
                version={ version.versionCount }
              />
            )
          }) }
          />
        )}
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
