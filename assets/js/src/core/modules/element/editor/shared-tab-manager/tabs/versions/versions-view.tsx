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
import { useStyles } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/versions-view.style'
import { Button } from '@Pimcore/components/button/button'
import {
  type Version,
  type VersionGetCollectionForElementByTypeAndIdApiArg
} from '@Pimcore/modules/element/editor/version-api-slice-enhanced'

import { useTranslation } from 'react-i18next'
import { useModal } from '@Pimcore/components/modal/useModal'
import { ModalFooter } from '@Pimcore/components/modal/footer/modal-footer'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Header } from '@Pimcore/components/header/header'
import { Content } from '@Pimcore/components/content/content'
import { SplitLayout } from '@Pimcore/components/split-layout/split-layout'
import { createVersionAccordionItem } from './create-version-accordion-item-functions'
import { AccordionTimeline } from '@Pimcore/components/accordion-timeline/accordion-timeline'
import { Flex } from '@Pimcore/components/flex/flex'
import {
  type VersionDetailViewsProps
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/versions-container'

interface VersionsViewProps extends VersionDetailViewsProps {
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
  onBlurNote,
  SingleViewComponent,
  ComparisonViewComponent
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
        padded
      >
        <Header title={ t('version.versions') } />
        <Content
          none
          noneOptions={ {
            text: t('version.no-versions-to-show')
          } }
        />
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
                    <>
                      <Flex
                        className='w-full'
                        gap='small'
                        justify='space-between'
                      >
                        <Button
                          className={ comparingActive ? 'compare-button' : '' }
                          key={ t('version.compare-versions') }
                          onClick={ onClickCompareVersion }
                        >{t('version.compare-versions')}</Button>

                        <IconTextButton
                          icon={ 'trash' }
                          key={ t('version.clear-unpublished') }
                          loading={ clearingAll }
                          onClick={ showModal }
                        >
                          {t('version.clear-unpublished')}
                        </IconTextButton>
                      </Flex>

                      {modal}
                    </>
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
              <Flex justify='center' >
                {detailedVersions.length > 0 && comparingActive && (
                  <ComparisonViewComponent versionIds={ detailedVersions } />
                )}

                {detailedVersions.length > 0 && !comparingActive && (
                  <SingleViewComponent
                    setDetailedVersions={ setDetailedVersions }
                    versionId={ detailedVersions[0] }
                    versions={ versions }
                  />
                )}
              </Flex>
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
