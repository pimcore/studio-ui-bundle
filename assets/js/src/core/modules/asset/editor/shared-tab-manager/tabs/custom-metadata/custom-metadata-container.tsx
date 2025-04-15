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

import React, { useContext, useRef, useState, useEffect, type ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { type InputRef } from 'antd'
import { Button } from '@Pimcore/components/button/button'
import { Input } from 'antd'
import {
  CustomMetadataTable
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/custom-metadata/components/table/table'
import { useSettings } from '@Pimcore/modules/app/settings/hooks/use-settings'
import {
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/custom-metadata/settings-slice.gen'
import { useAssetDraft } from '@Pimcore/modules/asset/hooks/use-asset-draft'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import { useModal } from '@Pimcore/components/modal/useModal'
import { ModalFooter } from '@Pimcore/components/modal/footer/modal-footer'
import { useInjection } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { ButtonGroup } from '@Pimcore/components/button-group/button-group'
import { Header } from '@Pimcore/components/header/header'
import { Content } from '@Pimcore/components/content/content'
import { type CustomMetadata } from '@Pimcore/modules/asset/draft/hooks/use-custom-metadata'
import { Space } from '@Pimcore/components/space/space'
import { Select } from '@Pimcore/components/select/select'
import { type DynamicTypeMetaDataRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/meta-data/dynamic-type-metadata-registry'
import { uuid } from '@Pimcore/utils/uuid'
import {
  useLazyMetadataGetCollectionQuery
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/custom-metadata/metadata-api-slice-enhanced'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'

export interface CustomMetadataTabContainerProps {
  disableHeaderTitle?: boolean
  disableAddPredefinedMetadata?: boolean
}

export const CustomMetadataTabContainer = ({ disableHeaderTitle = false, disableAddPredefinedMetadata = false }: CustomMetadataTabContainerProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [editmode, setEditMode] = useState<boolean>(false)
  const settings = useSettings()
  const { id } = useContext(AssetContext)
  const { asset, addCustomMetadata, customMetadata } = useAssetDraft(id)
  const [predefinedMetadata, { isFetching, isError, error }] = useLazyMetadataGetCollectionQuery()

  const {
    showModal: showDuplicateEntryModal,
    closeModal: closeDuplicateEntryModal,
    renderModal: DuplicateEntryModal
  } = useModal({
    type: 'error'
  })
  const { showModal: showMandatoryModal, closeModal: closeMandatoryModal, renderModal: MandatoryModal } = useModal({
    type: 'error'
  })

  useEffect(() => {
    if (isError) {
      trackError(new ApiError(error))
    }
  }, [isError])

  const isEditable = checkElementPermission(asset?.permissions, 'publish')
  const nameInputValue = useRef<string>('')
  const nameInputRef = useRef<InputRef>(null)
  const typeSelectValue = useRef<string>('input')
  const languageSelectValue = useRef<string>('')

  const metadataTypeRegistry = useInjection<DynamicTypeMetaDataRegistry>(serviceIds['DynamicTypes/MetadataRegistry'])
  const typeSelectOptions = [...metadataTypeRegistry.getTypeSelectionTypes().keys()].map((type) => {
    return { value: type, label: t('data-type.' + type.split('.')[1]) }
  })

  function onNameInputChange (event: React.ChangeEvent<HTMLInputElement>): void {
    nameInputValue.current = event.target.value
  }

  function onTypeSelectChange (value: string): void {
    typeSelectValue.current = value
  }

  function onLanguageSelectChange (value: string): void {
    languageSelectValue.current = value
  }

  function onLanguageSelectClear (): void {
    languageSelectValue.current = ''
  }

  function onAddPropertyClick (): void {
    const isValidNameInput = nameInputValue.current !== undefined && nameInputValue.current.length > 0
    const isValidTypeSelectValue = typeSelectValue.current !== undefined

    if (!isValidNameInput || !isValidTypeSelectValue) {
      showMandatoryModal()
      return
    }

    if (customMetadata?.find((cm) => cm.name === nameInputValue.current && cm.language === languageSelectValue.current) !== undefined) {
      showDuplicateEntryModal()
      return
    }

    const newCustomMetadata: CustomMetadata = {
      additionalAttributes: [] as any,
      name: nameInputValue.current,
      type: typeSelectValue.current,
      language: languageSelectValue.current,
      data: null,
      rowId: uuid()
    }

    addCustomMetadata(newCustomMetadata)
  }

  const addPredefinedMetadata = async (): Promise<void> => {
    const predefinedMetadataTask = predefinedMetadata({
      body: {}
    })

    const response = await predefinedMetadataTask

    const data = response.data!

    data.items!.forEach((predefinedDefinition) => {
      if (customMetadata?.find((cm) => cm.name === predefinedDefinition.name && cm.language === (predefinedDefinition.language ?? '')) !== undefined) {
        return
      }

      addCustomMetadata({
        ...predefinedDefinition,
        rowId: predefinedDefinition.id,
        language: predefinedDefinition.language ?? '',
        data: predefinedDefinition.data ?? null
      })
    })
  }

  useEffect(() => {
    if (editmode) {
      nameInputRef.current?.focus()
    } else {
      typeSelectValue.current = 'input'
      nameInputValue.current = ''
      languageSelectValue.current = ''
    }
  }, [editmode])

  const buttons: ReactElement[] = []
  if (!editmode) {
    if (!disableAddPredefinedMetadata) {
      buttons.push((
        <IconTextButton
          disabled={ isFetching }
          icon={ { value: 'add-something' } }
          key={ t('asset.asset-editor-tabs.custom-metadata.add-predefined-definition') }
          loading={ isFetching }
          onClick={ addPredefinedMetadata }
        >
          {t('asset.asset-editor-tabs.custom-metadata.add-predefined-definition')}
        </IconTextButton>
      ))
    }

    buttons.push((
      <IconTextButton
        icon={ { value: 'new-something' } }
        key={ t('asset.asset-editor-tabs.custom-metadata.new-custom-metadata') }
        onClick={ () => {
          setEditMode(true)
        } }
      >
        {t('asset.asset-editor-tabs.custom-metadata.new-custom-metadata')}
      </IconTextButton>
    ))
  }

  return (
    <Content padded>
      <Header
        className={ 'p-l-mini' }
        title={ !disableHeaderTitle ? t('asset.asset-editor-tabs.custom-metadata.text') : '' }
      >
        <div className='pimcore-custom-metadata-toolbar'>
          <Space
            size='extra-small'
          >
            {editmode && (
            <>
              <Space
                size="extra-small"
              >
                <Button
                  onClick={ () => {
                    setEditMode(false)
                  } }
                  type={ 'link' }
                >
                  {t('asset.asset-editor-tabs.custom-metadata.add-custom-metadata.cancel')}
                </Button>

                <Input
                  onChange={ onNameInputChange }
                  placeholder={ t('asset.asset-editor-tabs.custom-metadata.add-custom-metadata.name') }
                  ref={ nameInputRef }
                />

                <Select
                  className='min-w-100'
                  defaultValue={ typeSelectValue.current }
                  onSelect={ onTypeSelectChange }
                  options={ typeSelectOptions }
                  placeholder={ t('asset.asset-editor-tabs.custom-metadata.add-custom-metadata.type') }
                />

                <Select
                  allowClear
                  className='min-w-100'
                  onClear={ onLanguageSelectClear }
                  onSelect={ onLanguageSelectChange }
                  options={ settings.requiredLanguages.map((value: string) => {
                    return { value, label: value }
                  }) }
                  placeholder={ t('asset.asset-editor-tabs.custom-metadata.add-custom-metadata.language') }
                />

                <IconTextButton
                  icon={ { value: 'new-something' } }
                  onClick={ () => {
                    onAddPropertyClick()
                  } }
                >
                  {t('asset.asset-editor-tabs.custom-metadata.new-custom-metadata.create')}
                </IconTextButton>
              </Space>

              <DuplicateEntryModal
                footer={ <ModalFooter>
                  <Button
                    onClick={ closeDuplicateEntryModal }
                    type='primary'
                  >{t('button.ok')}</Button>
                </ModalFooter> }
                title={ t('asset.asset-editor-tabs.custom-metadata.custom-metadata-already-exist.title') }
              >
                {t('asset.asset-editor-tabs.custom-metadata.custom-metadata-already-exist.error')}
              </DuplicateEntryModal>

              <MandatoryModal
                footer={ <ModalFooter>
                  <Button
                    onClick={ closeMandatoryModal }
                    type='primary'
                  >{t('button.ok')}</Button>
                </ModalFooter> }
                title={ t('asset.asset-editor-tabs.custom-metadata.add-entry-mandatory-fields-missing.title') }
              >
                {t('asset.asset-editor-tabs.custom-metadata.add-entry-mandatory-fields-missing.error')}
              </MandatoryModal>
            </>
            )}

            {!editmode && isEditable && (
            <ButtonGroup items={ buttons } />
            )}
          </Space>
        </div>
      </Header>

      <CustomMetadataTable
        showDuplicateEntryModal={ showDuplicateEntryModal }
        showMandatoryModal={ showMandatoryModal }
      />
    </Content>
  )
}
