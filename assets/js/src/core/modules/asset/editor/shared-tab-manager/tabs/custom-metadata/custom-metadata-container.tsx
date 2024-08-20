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
import { Button, Select } from 'antd'
import Input from 'antd/es/input/Input'
import { Icon } from '@Pimcore/components/icon/icon'
import {
  CustomMetadataTable
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/custom-metadata/components/table/table'
import { useSettings } from '@Pimcore/modules/app/settings/hooks/use-settings'
import { type CustomMetadata } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/custom-metadata/settings-slice.gen'
import { useAssetDraft } from '@Pimcore/modules/asset/hooks/use-asset-draft'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import { useModal } from '@Pimcore/components/modal/useModal'
import { ModalFooter } from '@Pimcore/components/modal/footer/modal-footer'
import {
  CardHeaderContainer
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/card-header/card-header-container'
import { CardContainer } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/card-container/card-container'

export const CustomMetadataTabContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const [editmode, setEditMode] = useState<boolean>(false)
  const { styles } = useStyle()
  const settings = useSettings()
  const { id } = useContext(AssetContext)
  const { addCustomMetadata, customMetadata } = useAssetDraft(id!)
  const { showModal, closeModal, renderModal: Modal } = useModal({
    type: 'error'
  })

  const nameInputValue = useRef<string>('')
  const typeSelectValue = useRef<string>('')
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

  function onAddPropertyClick (): void {
    const isValidNameInput = nameInputValue.current !== undefined && nameInputValue.current.length > 0
    const isValidTypeSelectValue = typeSelectValue.current !== undefined

    if (!isValidNameInput || !isValidTypeSelectValue) {
      return
    }

    if (customMetadata?.find((cm) => cm.name === nameInputValue.current) !== undefined) {
      showModal()
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

  return (
    <div className={ styles.tab }>
      <CardHeaderContainer
        text={ t('asset.asset-editor-tabs.custom-metadata.text') }
      >
        <div className={ ['pimcore-custom-metadata-toolbar', styles.toolbar].join(' ') }>
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
                />

                <Select
                  onSelect={ onTypeSelectChange }
                  options={ [
                    { value: 'input', label: 'Input' },
                    { value: 'textarea', label: 'Textarea' },
                    { value: 'asset', label: 'Asset' },
                    { value: 'document', label: 'Document' },
                    { value: 'object', label: 'Object' },
                    { value: 'date', label: 'Date' },
                    { value: 'checkbox', label: 'Checkbox' }
                  ] }
                  placeholder={ t('asset.asset-editor-tabs.custom-metadata.add-custom-metadata.type') }
                />

                <Select
                  onSelect={ onLanguageSelectChange }
                  options={ settings.requiredLanguages.map((value: string) => {
                    return { value, label: value }
                  }) }
                  placeholder={ t('asset.asset-editor-tabs.custom-metadata.add-custom-metadata.language') }
                />

                <Button
                  icon={ <Icon name={ 'PlusCircleOutlined' } /> }
                  onClick={ () => {
                    onAddPropertyClick()
                  } }
                >
                  {t('asset.asset-editor-tabs.custom-metadata.add-custom-metadata.add')}
                </Button>
              </div>

              <Modal
                footer={ <ModalFooter>
                  <Button
                    onClick={ closeModal }
                    type='primary'
                  >{ t('button.ok') }</Button>
                </ModalFooter> }
                title={ t('asset.asset-editor-tabs.custom-metadata.custom-metadata-already-exist.title') }
              >
                { t('asset.asset-editor-tabs.custom-metadata.custom-metadata-already-exist.error') }
              </Modal>
            </>
            )}

            {!editmode && (
            <>
              <Button
                onClick={ () => { console.log('clicked') } }
              >
                {t('asset.asset-editor-tabs.custom-metadata.add-predefined-definition')}
              </Button>

              <Button
                icon={ <Icon name={ 'PlusCircleOutlined' } /> }
                onClick={ () => {
                  setEditMode(true)
                } }
              >
                {t('asset.asset-editor-tabs.custom-metadata.add-custom-definition.add')}
              </Button>
            </>
            )}
          </div>
        </div>
      </CardHeaderContainer>

      <CardContainer>
        <CustomMetadataTable />
      </CardContainer>
    </div>
  )
}
