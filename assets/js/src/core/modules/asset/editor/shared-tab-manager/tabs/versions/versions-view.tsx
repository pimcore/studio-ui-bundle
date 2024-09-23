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
import { useTranslation } from 'react-i18next'
import { useModal } from '@Pimcore/components/modal/useModal'
import { ModalFooter } from '@Pimcore/components/modal/footer/modal-footer'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { ButtonGroup } from '@Pimcore/components/button-group/button-group'
import { Header } from '@Pimcore/components/header/header'
import { Content } from '@Pimcore/components/content/content'
import { SplitLayout } from '@Pimcore/components/split-layout/split-layout'
import { createVersionAccordionItem } from './create-version-accordion-item-functions'
import { AccordionTimeline } from '@Pimcore/components/accordion-timeline/accordion-timeline'

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

  const accordionItems = versions.map((version) =>
    createVersionAccordionItem({
      version,
      detailedVersions,
      comparingActive,
      onClickDelete,
      onClickPublish,
      onBlurNote,
      selectVersion,
      setDetailedVersions
    })
  )

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
                <AccordionTimeline items={ accordionItems } />
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
