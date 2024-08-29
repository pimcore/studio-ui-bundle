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

import React, { useEffect, useState } from 'react'
import { useStyles } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/versions/versions-view.style'
import { Button } from '@Pimcore/components/button/button'
import { isSet } from '@Pimcore/utils/helpers'
import { VersionCard } from '@Pimcore/components/version-card/version-card'
import {
  type VersionGetCollectionForElementByTypeAndIdApiArg,
  type Version
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/versions/versions-api-slice.gen'
import { VerticalTimeline } from '@Pimcore/components/vertical-timeline/vertical-timeline'
import {
  DetailsVersionsContainer
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/versions/details-versions/details-versions-container'
import { NoContent } from '@Pimcore/components/no-content/no-content'
import {
  DetailsVersionContainer
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/versions/details-version/details-version-container'
import { formatDateTime } from '@Pimcore/utils/date-time'
import { useTranslation } from 'react-i18next'
import { useModal } from '@Pimcore/components/modal/useModal'
import { ModalFooter } from '@Pimcore/components/modal/footer/modal-footer'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { ContentHeaderContainer } from '@Pimcore/components/content-containers/content-header-container'
import { ContentPaddingContainer } from '@Pimcore/components/content-containers/content-padding-container'

interface VersionsViewProps {
  versions: Version[]
  onClickClearAll: (elementType: VersionGetCollectionForElementByTypeAndIdApiArg['elementType'], id: number) => Promise<void>
  onClickPublish: (id: number) => Promise<void>
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
  const [clearingAll, setClearingAll] = useState(false)
  const [detailedVersions, setDetailedVersions] = useState([] as VersionIdentifiers[])

  const { renderModal: RenderModal, showModal, handleOk } = useModal({ type: 'warn' })

  useEffect(() => {
    setClearingAll(false)
  }, [versions])

  if (versions.length === 0) {
    return (
      <div className={ styles.noContent }>
        <ContentHeaderContainer text={ t('version.versions') } />
        <ContentPaddingContainer>
          <div className={ 'empty-container' }>
            <NoContent
              text={ t('version.no-versions-to-show') }
            />
          </div>
        </ContentPaddingContainer>
      </div>
    )
  }

  const clearVersions = async (): Promise<void> => {
    handleOk()
    setClearingAll(true)

    await onClickClearAll(
      versions[0].ctype as VersionGetCollectionForElementByTypeAndIdApiArg['elementType'],
      versions[0].cid
    )
  }

  const modal = (
    <RenderModal
      footer={
        <ModalFooter>
          <Button
            onClick={ clearVersions }
            type={ 'primary' }
          >{t('yes')}</Button>
          <Button
            onClick={ handleOk }
            type={ 'default' }
          >{t('no')}</Button>
        </ModalFooter>
          }
      title={ t('version.clear-unpublished-versions') }
    >
      <span>{t('version.confirm-clear-unpublished')}</span>
    </RenderModal>
  )

  return (
    <div className={ styles.versions }>
      <div className={ 'left-side' }>
        <ContentHeaderContainer text={ t('version.versions') }>
          <div className={ 'flexbox-start-end' }>
            {versions.length > 0 && (
            <Button
              className={ comparingActive ? 'compare-button' : '' }
              onClick={ onClickCompareVersion }
            >{t('version.compare-versions')}</Button>
            )}
            {versions.length > 0 && (
            <>
              <IconTextButton
                icon={ 'trash' }
                loading={ clearingAll }
                onClick={ showModal }
              >
                {t('version.clear-unpublished')}
              </IconTextButton>
              {modal}
            </>
            )}
          </div>
        </ContentHeaderContainer>
        <ContentPaddingContainer>
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
                onClickPublish={ async (): Promise<void> => {
                  await onClickPublish(version.id)
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
        </ContentPaddingContainer>
      </div>

      { detailedVersions.length > 0 && comparingActive && (
        <DetailsVersionsContainer versionIds={ detailedVersions } />
      )}
      { detailedVersions.length > 0 && !comparingActive && (
        <DetailsVersionContainer
          setDetailedVersions={ setDetailedVersions }
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
