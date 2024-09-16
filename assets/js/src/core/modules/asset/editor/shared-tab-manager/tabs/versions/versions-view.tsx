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
import {
  type Version,
  type VersionGetCollectionForElementByTypeAndIdApiArg
} from '@Pimcore/modules/element/editor/version-api-slice-enhanced'
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
import { ButtonGroup } from '@Pimcore/components/button-group/button-group'
import { Header } from '@Pimcore/components/header/header'
import { Content } from '@Pimcore/components/content/content'
import { SplitLayout } from '@Pimcore/components/split-layout/split-layout'
import { VerticalTimeline } from '@Pimcore/components/vertical-timeline/vertical-timeline'
import { isSet } from '@Pimcore/utils/helpers'
import { TimelineAccordions } from '@Pimcore/components/timeline-accordions/timeline-accordions'
import { Checkbox, Input, Tag } from 'antd'
import { Icon } from '@Pimcore/components/icon/icon'
import { type AccordionItemType, type PanelTheme } from '@Pimcore/components/accordion/accordion'

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
      <Content
        className={ styles.noContent }
        padded
      >
        <Header title={ t('version.versions') } />
        <Content>
          <div className={ 'empty-container' }>
            <NoContent
              text={ t('version.no-versions-to-show') }
            />
          </div>
        </Content>
      </Content>
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

  const createAccordionItem = (version: Version): AccordionItemType => {
    const [deletingVersion, setDeletingVersion] = useState(false)
    const [publishingVersion, setPublishingVersion] = useState(false)

    const vId = { id: version.id, count: version.versionCount }
    const selected = detailedVersions.some((v => v.id === version.id))
    const selectable = comparingActive
    const ownDraft = false
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

    const title = (
      <div>
        {selectable && (
        <Checkbox
          checked={ selected }
          onChange={ () => {
            selectVersion(vId)
          } }
        />
        )}
        <span className={ 'title' }>{`${t('version.version')} ${version.versionCount} | ${formatDateTime({
                    timestamp: version.date,
                    dateStyle: 'short',
                    timeStyle: 'medium'
                })} `}</span>
      </div>
    )

    const subtitle = (
      <div>
        <span className={ 'sub-title' }>{`${t('by')} ${version.user?.name ?? ''}`}</span>
        {isSet(version.autosave) && version.autosave && <Icon name="lightning-01" />}
      </div>
    )

    let extra
    let themeByState: PanelTheme = selected ? 'primary' : 'default'

    if (published) {
      themeByState = 'success'
      extra = (
        <Tag className={ ['title-tag', 'title-tag__published'].join(' ') }>
          <Icon
            className="tag-icon"
            name="world"
            options={ { width: '12px', height: '12px' } }
          />
          {t('version.published')}
        </Tag>
      )
    } else if (isSet(ownDraft) && ownDraft) {
      extra = (
        <Tag className={ ['title-tag', 'title-tag__own-draft'].join(' ') }>
          <Icon
            className="tag-icon"
            name="user-01"
            options={ { width: '12px', height: '12px' } }
          />
          {t('version.own-draft')}
        </Tag>
      )
    }

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

    const children = (
      <>
        <div className={ 'flexbox-start-end' }>
          <Tag className={ 'id-tag' }>ID: {version.id}</Tag>
          <div>
            {!published && (
            <Button
              className={ 'btn-publish' }
              disabled={ publishingVersion || deletingVersion }
              icon={ <Icon name="world" /> }
              loading={ publishingVersion }
              onClick={ publishVersion }
            >
              {t('version.publish')}
            </Button>
            )}
            <Button
              aria-label={ t('aria.version.delete') }
              disabled={ publishingVersion }
              icon={ <Icon name="trash" /> }
              loading={ deletingVersion }
              onClick={ deleteVersion }
            />
          </div>
        </div>
        {
                    isSet(scheduledDate) && (
                    <div className={ 'row-margin' }>
                      <div>{t('version.schedule-for')}</div>
                      <div className={ 'date-container' }>
                        <Icon name="calender" />
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
      </>
    )

    const item = {
      key: version.id,
      title,
      subtitle,
      extra,
      children,
      onClick,
      theme: themeByState
    }

    return item
  }

  return (
    <Content
      className={ styles.versions }
    >
      <SplitLayout
        leftItem={ {
          size: 25,
          minSize: 415,
          children: (
            <Content padded>
              <Header title={ t('version.versions') }>
                {versions.length > 0 &&
                                    (
                                    <div>
                                      <ButtonGroup
                                        items={ [
                                          <Button
                                            className={ comparingActive ? 'compare-button' : '' }
                                            key={ t('version.compare-versions') }
                                            onClick={ onClickCompareVersion }
                                          >{t('version.compare-versions')}</Button>,
                                          <IconTextButton
                                            icon={ 'trash' }
                                            key={ t('version.clear-unpublished') }
                                            loading={ clearingAll }
                                            onClick={ showModal }
                                          >
                                            {t('version.clear-unpublished')}
                                          </IconTextButton>] }
                                      />
                                      {modal}
                                    </div>
                                    )}
              </Header>

              {versions.length > 0 && (
                <VerticalTimeline timeStamps={ versions.map((version) => {
                  const selected = detailedVersions.some((v => v.id === version.id))
                  return (
                    <TimelineAccordions
                      id={ version.id }
                      item={ createAccordionItem(version) }
                      key={ version.id }
                      selected={ selected }
                    />
                  )
                }) }
                />
              )}
            </Content>
          )
        } }

        rightItem={ {
          size: 75,
          children: (
            <Content padded>
              {detailedVersions.length > 0 && comparingActive && (
                <DetailsVersionsContainer versionIds={ detailedVersions } />
              )}

              {detailedVersions.length > 0 && !comparingActive && (
                <DetailsVersionContainer
                  setDetailedVersions={ setDetailedVersions }
                  versionId={ detailedVersions[0] }
                  versions={ versions }
                />
              )}
            </Content>
          )
        } }
      />
    </Content>
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
