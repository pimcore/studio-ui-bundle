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

import React, { useContext, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { type InputRef, Segmented, Select } from 'antd'
import { Button } from '@Pimcore/components/button/button'
import { useStyle } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/properties/properties-container.styles'
import { usePropertyGetCollectionQuery } from '@Pimcore/modules/asset/properties-api-slice.gen'
import Input from 'antd/es/input/Input'
import { Table } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/properties/components/table/table'
import { useAssetDraft } from '@Pimcore/modules/asset/hooks/use-asset-draft'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import { useModal } from '@Pimcore/components/modal/useModal'
import { ModalFooter } from '@Pimcore/components/modal/footer/modal-footer'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { ButtonGroup } from '@Pimcore/components/button-group/button-group'
import { Header } from '@Pimcore/components/header/header'
import { Content } from '@Pimcore/components/content/content'
import { type DataProperty } from '@Pimcore/modules/element/draft/hooks/use-properties'

export const PropertiesContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyle()
  const [propertiesTableTab, setPropertiesTableTab] = React.useState<string>('own')
  const [createManualPropertyMode, setCreateManualPropertyMode] = React.useState<boolean>(false)
  const { id } = useContext(AssetContext)
  const { addProperty, properties } = useAssetDraft(id!)
  const {
    showModal: showDuplicatePropertyModal,
    closeModal: closeDuplicatePropertyModal,
    renderModal: DuplicatePropertyModal
  } = useModal({
    type: 'error'
  })
  const { showModal: showMandatoryModal, closeModal: closeMandatoryModal, renderModal: MandatoryModal } = useModal({
    type: 'error'
  })
  const keyInputValue = useRef<string>('')
  const keyInputRef = useRef<InputRef>(null)
  const typeSelectValue = useRef<string>('')

  const { data, isLoading } = usePropertyGetCollectionQuery({
    elementType: 'asset'
  })

  React.useEffect(() => {
    if (createManualPropertyMode) {
      keyInputRef.current?.focus()
    } else {
      typeSelectValue.current = ''
      keyInputValue.current = ''
    }
  }, [createManualPropertyMode])

  return (
    <Content
      className={ styles.tab }
      padded
    >
      <Header title={ t('asset.asset-editor-tabs.properties.text') }>
        <div className={ ['pimcore-properties-toolbar', styles.toolbar].join(' ') }>
          <Segmented<string>
            onChange={ setPropertiesTableTab }
            options={ [
              { label: t('asset.asset-editor-tabs.properties.editable-properties'), value: 'own' },
              { label: t('asset.asset-editor-tabs.properties.all-properties'), value: 'all' }
            ] }
          />

          <div className={ 'pimcore-properties-toolbar__predefined-properties' }>
            <DuplicatePropertyModal
              footer={ <ModalFooter>
                <Button
                  onClick={ closeDuplicatePropertyModal }
                  type='primary'
                >{t('button.ok')}</Button>
              </ModalFooter> }
              title={ t('properties.property-already-exist.title') }
            >
              {t('properties.property-already-exist.error')}
            </DuplicatePropertyModal>

            <MandatoryModal
              footer={ <ModalFooter>
                <Button
                  onClick={ closeMandatoryModal }
                  type='primary'
                >{t('button.ok')}</Button>
              </ModalFooter> }
              title={ t('properties.add-property-mandatory-fields-missing.title') }
            >
              {t('properties.add-property-mandatory-fields-missing.error')}
            </MandatoryModal>

            {createManualPropertyMode && (
            <div className={ 'pimcore-properties-toolbar__predefined-properties__manual' }>
              <Button
                onClick={ () => {
                  setCreateManualPropertyMode(false)
                } }
                type={ 'link' }
              >
                {t('asset.asset-editor-tabs.properties.add-custom-property.cancel')}
              </Button>

              <Input
                onChange={ onKeyInputChange }
                placeholder={ t('asset.asset-editor-tabs.properties.add-custom-property.key') }
                ref={ keyInputRef }
              />

              <Select
                onSelect={ onTypeSelect }
                options={ [
                  { value: 'text', label: t('data-type.text') },
                  { value: 'document', label: t('data-type.document') },
                  { value: 'asset', label: t('data-type.asset') },
                  { value: 'object', label: t('data-type.object') },
                  { value: 'bool', label: t('data-type.checkbox') }
                ] }
                placeholder={ t('asset.asset-editor-tabs.properties.add-custom-property.type') }
              />

              <IconTextButton
                icon={ 'PlusCircleOutlined' }
                onClick={ () => {
                  onAddPropertyClick()
                } }
              >
                {t('asset.asset-editor-tabs.properties.add-custom-property.add')}
              </IconTextButton>
            </div>
            )}

            {!createManualPropertyMode && (
            <ButtonGroup
              items={ [
                <Select
                  filterOption={ (input, option) => {
                    return (option?.children as unknown as string ?? '').toLowerCase().includes(input.toLowerCase())
                  } }
                  key={ 'properties-select' }
                  loading={ isLoading }
                  onSelect={ onPredefinedPropertyChange }
                  placeholder={ t('asset.asset-editor-tabs.properties.predefined-properties') }
                  showSearch
                >
                  {data !== undefined && Array.isArray(data.items) && data.items.map((item) => (
                    <Select.Option
                      key={ item.id }
                      value={ item.id }
                    >
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>,
                <IconTextButton
                  icon={ 'PlusCircleOutlined' }
                  key={ t('asset.asset-editor-tabs.properties.add-custom-property') }
                  onClick={ () => {
                    setCreateManualPropertyMode(true)
                  } }
                >
                  {t('asset.asset-editor-tabs.properties.add-custom-property')}
                </IconTextButton>
              ] }
              withSeparator
            />
            )}
          </div>
        </div>
      </Header>

      <Table
        propertiesTableTab={ propertiesTableTab }
        showDuplicatePropertyModal={ showDuplicatePropertyModal }
        showMandatoryModal={ showMandatoryModal }
      />
    </Content>
  )

  function propertyExists (key: string): boolean {
    return properties?.find((prop) => prop.key === key && !prop.inherited) !== undefined
  }

  function onPredefinedPropertyChange (value: string): void {
    const property = data?.items?.find((item) => item.id === value)

    if (property === undefined) {
      return
    }

    if (propertyExists(property.name)) {
      showDuplicatePropertyModal()
      return
    }

    const newDataProperty: DataProperty = {
      key: property.name,
      type: property.type,
      data: property.data,
      inherited: false,
      inheritable: property.inheritable,
      additionalAttributes: property.additionalAttributes,
      config: property.config,
      description: property.description,
      predefinedName: property.name,
      rowId: crypto.randomUUID()
    }

    addProperty(newDataProperty)
  }

  function onKeyInputChange (e): void {
    keyInputValue.current = e.target.value
  }

  function onTypeSelect (value): void {
    typeSelectValue.current = value
  }

  function onAddPropertyClick (): void {
    const isValidKeyInput = keyInputValue.current !== undefined && keyInputValue.current.length > 0
    const isValidTypeSelectValue = typeSelectValue.current !== undefined && typeSelectValue.current.length > 0

    if (!isValidKeyInput || !isValidTypeSelectValue) {
      showMandatoryModal()
      return
    }

    if (propertyExists(keyInputValue.current)) {
      showDuplicatePropertyModal()
      return
    }

    const newDataProperty: DataProperty = {
      key: keyInputValue.current,
      type: typeSelectValue.current,
      predefinedName: 'Custom',
      data: null,
      inherited: false,
      inheritable: false,
      rowId: crypto.randomUUID()
    }

    addProperty(newDataProperty)
  }
}
