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

import { useStyle } from './custom-metadata-container.styles'
import React, { useContext, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { type InputRef, Select } from 'antd'
import { Button } from '@Pimcore/components/button/button'
import Input from 'antd/es/input/Input'
import {
  CustomMetadataTable
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/custom-metadata/components/table/table'
import { useSettings } from '@Pimcore/modules/app/settings/hooks/use-settings'
import { type CustomMetadata } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/custom-metadata/settings-slice.gen'
import { useAssetDraft } from '@Pimcore/modules/asset/hooks/use-asset-draft'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import { useModal } from '@Pimcore/components/modal/useModal'
import { ModalFooter } from '@Pimcore/components/modal/footer/modal-footer'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'

export const CustomMetadataTabContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const [editmode, setEditMode] = useState<boolean>(false)
  const { styles } = useStyle()
  const settings = useSettings()
  const { id } = useContext(AssetContext)
  const { addCustomMetadata, customMetadata } = useAssetDraft(id!)
  const { showModal: showDuplicateEntryModal, closeModal: closeDuplicateEntryModal, renderModal: DuplicateEntryModal } = useModal({
    type: 'error'
  })
  const { showModal: showMandatoryModal, closeModal: closeMandatoryModal, renderModal: MandatoryModal } = useModal({
    type: 'error'
  })

  const nameInputValue = useRef<string>('')
  const nameInputRef = useRef<InputRef>(null)
  const typeSelectValue = useRef<string>('input')
  const languageSelectValue = useRef<string>('')

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
      data: null
    }

    addCustomMetadata(newCustomMetadata)
  }

  React.useEffect(() => {
    if (editmode) {
      nameInputRef.current?.focus()
    } else {
      typeSelectValue.current = 'input'
      nameInputValue.current = ''
      languageSelectValue.current = ''
    }
  }, [editmode])

  return (
    <div className={ styles.tab }>
      <div className={ ['pimcore-custom-metadata-toolbar', styles.toolbar].join(' ') }>
        <p className={ 'pimcore-custom-metadata-toolbar__headline' }>
          { t('asset.asset-editor-tabs.custom-metadata.text') }
        </p>

        <div className={ 'pimcore-custom-metadata-toolbar__manual' }>
          {editmode && (
            <>
              <div className={ 'pimcore-custom-metadata-toolbar__manual__editmode' }>
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
                  defaultValue={ typeSelectValue.current }
                  onSelect={ onTypeSelectChange }
                  options={ [
                    { value: 'input', label: t('data-type.input') },
                    { value: 'textarea', label: t('data-type.textarea') },
                    { value: 'asset', label: t('data-type.asset') },
                    { value: 'document', label: t('data-type.document') },
                    { value: 'object', label: t('data-type.object') },
                    { value: 'date', label: t('data-type.date') },
                    { value: 'checkbox', label: t('data-type.checkbox') }
                  ] }
                  placeholder={ t('asset.asset-editor-tabs.custom-metadata.add-custom-metadata.type') }
                />

                <Select
                  allowClear
                  onClear={ onLanguageSelectClear }
                  onSelect={ onLanguageSelectChange }
                  options={ settings.requiredLanguages.map((value: string) => {
                    return { value, label: value }
                  }) }
                  placeholder={ t('asset.asset-editor-tabs.custom-metadata.add-custom-metadata.language') }
                />

                <IconTextButton
                  icon={ 'PlusCircleOutlined' }
                  onClick={ () => {
                    onAddPropertyClick()
                  } }
                >
                  {t('asset.asset-editor-tabs.custom-metadata.add-custom-metadata.add')}
                </IconTextButton>
              </div>

              <DuplicateEntryModal
                footer={ <ModalFooter>
                  <Button
                    onClick={ closeDuplicateEntryModal }
                    type='primary'
                  >{ t('button.ok') }</Button>
                </ModalFooter> }
                title={ t('asset.asset-editor-tabs.custom-metadata.custom-metadata-already-exist.title') }
              >
                { t('asset.asset-editor-tabs.custom-metadata.custom-metadata-already-exist.error') }
              </DuplicateEntryModal>

              <MandatoryModal
                footer={ <ModalFooter>
                  <Button
                    onClick={ closeMandatoryModal }
                    type='primary'
                  >{ t('button.ok') }</Button>
                </ModalFooter> }
                title={ t('asset.asset-editor-tabs.custom-metadata.add-entry-mandatory-fields-missing.title') }
              >
                { t('asset.asset-editor-tabs.custom-metadata.add-entry-mandatory-fields-missing.error') }
              </MandatoryModal>
            </>
          )}

          {!editmode && (
            <>
              <Button
                onClick={ () => { console.log('clicked') } }
              >
                {t('asset.asset-editor-tabs.custom-metadata.add-predefined-definition')}
              </Button>

              <IconTextButton
                icon={ 'PlusCircleOutlined' }
                onClick={ () => {
                  setEditMode(true)
                } }
              >
                {t('asset.asset-editor-tabs.custom-metadata.add-custom-definition.add')}
              </IconTextButton>
            </>
          )}
        </div>

      </div>

      <div className={ styles.content }>
        <CustomMetadataTable />
      </div>
    </div>
  )
}
