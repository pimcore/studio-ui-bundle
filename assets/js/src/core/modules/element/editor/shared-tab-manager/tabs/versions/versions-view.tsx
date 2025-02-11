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
import cn from 'classnames'
import { useTranslation } from 'react-i18next'
import {
  useVersionCleanupForElementByTypeAndIdMutation,
  type Version,
  type VersionGetCollectionForElementByTypeAndIdApiArg
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/version-api-slice-enhanced'
import { Button } from '@Pimcore/components/button/button'
import { useModal } from '@Pimcore/components/modal/useModal'
import { ModalFooter } from '@Pimcore/components/modal/footer/modal-footer'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Header } from '@Pimcore/components/header/header'
import { Content } from '@Pimcore/components/content/content'
import { SplitLayout } from '@Pimcore/components/split-layout/split-layout'
import { AccordionTimeline } from '@Pimcore/components/accordion-timeline/accordion-timeline'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { createVersionAccordionItem } from './helpers/create-version-accordion-item'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import {
  type VersionDetailViewsProps
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/types/types'
import { type VersionIdentifiers } from './types/types'
import { useStyles } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/versions-view.style'

interface VersionsViewProps extends VersionDetailViewsProps {
  versions: Version[]
}

export const VersionsView = ({
  versions,
  SingleViewComponent,
  ComparisonViewComponent
}: VersionsViewProps): React.JSX.Element => {
  const [isComparingActive, setIsComparingActive] = useState(false)
  const [detailedVersions, setDetailedVersions] = useState([] as VersionIdentifiers[])

  const [cleanupVersion, { isLoading: isLoadingCleanupVersion, isError: isCleanupVersionError, error: cleanupVersionError }] = useVersionCleanupForElementByTypeAndIdMutation()

  const { renderModal: RenderModal, showModal, handleOk } = useModal({ type: 'warn' })

  const { t } = useTranslation()
  const { styles } = useStyles()

  const handleClearVersions = async (): Promise<void> => {
    handleOk()

    await cleanupVersion({
      elementType: versions[0].ctype as VersionGetCollectionForElementByTypeAndIdApiArg['elementType'],
      id: versions[0].cid
    })

    if (isCleanupVersionError) {
      trackError(new ApiError(cleanupVersionError))
    }
  }

  const handleClickCompareVersion = (): void => {
    setDetailedVersions([])
    setIsComparingActive(!isComparingActive)
  }

  const selectVersion = (vId: VersionIdentifiers): void => {
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

  const renderModal = (): React.JSX.Element => (
    <RenderModal
      footer={
        <ModalFooter>
          <Button
            onClick={ handleClearVersions }
            type={ 'primary' }
          >
            {t('yes')}
          </Button>
          <Button
            onClick={ handleOk }
            type={ 'default' }
          >
            {t('no')}
          </Button>
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
      isComparingActive,
      selectVersion,
      setDetailedVersions
    })
  )

  const isEmptyVersionsList = versions.length === 0
  const isEmptyDetailedVersionsList = detailedVersions.length === 0

  if (isEmptyVersionsList) {
    return (
      <Content padded>
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

  return (
    <Content className={ styles.versions }>
      <SplitLayout
        leftItem={ {
          size: 25,
          minSize: 415,
          children: (
            <Content padded>
              <Header title={ t('version.versions') }>
                {!isEmptyVersionsList &&
                  (
                  <>
                    <Flex
                      className='w-full'
                      gap='small'
                      justify='space-between'
                    >
                      <Button
                        className={ cn({ [styles.compareButton]: isComparingActive }) }
                        key={ t('version.compare-versions') }
                        onClick={ handleClickCompareVersion }
                      >
                        {t('version.compare-versions')}
                      </Button>

                      <IconTextButton
                        icon={ { value: 'trash' } }
                        key={ t('version.clear-unpublished') }
                        loading={ isLoadingCleanupVersion }
                        onClick={ showModal }
                      >
                        {t('version.clear-unpublished')}
                      </IconTextButton>
                    </Flex>

                    {renderModal()}
                  </>
                  )}
              </Header>

              {!isEmptyVersionsList && (
                <AccordionTimeline items={ accordionItems } />
              )}
            </Content>
          )
        } }

        rightItem={ {
          size: 75,
          children: (
            <Content
              centered={ isEmptyDetailedVersionsList }
              padded
            >
              <Flex align="center">
                {!isEmptyDetailedVersionsList && isComparingActive && (
                  <ComparisonViewComponent versionIds={ detailedVersions } />
                )}

                {!isEmptyDetailedVersionsList && !isComparingActive && (
                  <SingleViewComponent
                    setDetailedVersions={ setDetailedVersions }
                    versionId={ detailedVersions[0] }
                    versions={ versions }
                  />
                )}

                {isEmptyDetailedVersionsList && (
                  <Text className={ styles.notificationMessage }>
                      {t('version.preview-notification')}
                  </Text>
                )}
              </Flex>
            </Content>
          )
        } }
      />
    </Content>
  )
}
