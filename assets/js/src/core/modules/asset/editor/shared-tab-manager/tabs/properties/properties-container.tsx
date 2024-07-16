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
import { Button, Divider, Segmented, Select } from 'antd'
import { useStyle } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/properties/properties-container.styles'
import { Icon } from '@Pimcore/components/icon/icon'
import { type DataProperty, useGetPropertiesQuery } from '@Pimcore/modules/asset/properties-api-slice.gen'
import Input from 'antd/es/input/Input'
import { Table } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/properties/components/table/table'
import { useAssetDraft } from '@Pimcore/modules/asset/hooks/use-asset-draft'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import { useModal } from '@Pimcore/components/modal/useModal'
import { ModalFooter } from '@Pimcore/components/modal/footer/modal-footer'

export const PropertiesContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyle()
  const [propertiesTableTab, setPropertiesTableTab] = React.useState<string>('own')
  const [createManualPropertyMode, setCreateManualPropertyMode] = React.useState<boolean>(false)
  const { id } = useContext(AssetContext)
  const { addProperty, properties } = useAssetDraft(id!)
  const { showModal, closeModal, renderModal: Modal } = useModal({
    type: 'error'
  })
  const keyInputValue = useRef<string>('')
  const typeSelectValue = useRef<string>('')

  const { data, isLoading } = useGetPropertiesQuery({
    elementType: 'asset'
  })

  return (
    <div className={ styles.tab }>
      <div className={ ['pimcore-properties-toolbar', styles.toolbar].join(' ') }>
        <p className={ 'pimcore-properties-toolbar__headline' }>
          { t('asset.asset-editor-tabs.properties.text') }
        </p>

        <Segmented<string>
          onChange={ setPropertiesTableTab }
          options={ [
            { label: t('asset.asset-editor-tabs.properties.edit-own-properties'), value: 'own' },
            { label: t('asset.asset-editor-tabs.properties.all-properties'), value: 'all' }
          ] }
        />

        {propertiesTableTab === 'own' && (
          <div className={ 'pimcore-properties-toolbar__predefined-properties' }>
            <Modal
              footer={ <ModalFooter>
                <Button
                  onClick={ closeModal }
                  type='primary'
                >{ t('button.ok') }</Button>
              </ModalFooter> }
              title={ t('properties.property-already-exist.title') }
            >
              { t('properties.property-already-exist.error') }
            </Modal>

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
                />

                <Select
                  onSelect={ onTypeSelect }
                  options={ [
                    { value: 'text', label: 'Text' },
                    { value: 'document', label: 'Document' },
                    { value: 'asset', label: 'Asset' },
                    { value: 'object', label: 'Object' },
                    { value: 'bool', label: 'Bool' }
                  ] }
                  placeholder={ t('asset.asset-editor-tabs.properties.add-custom-property.type') }
                />

                <Button
                  icon={ <Icon name={ 'PlusCircleOutlined' } /> }
                  onClick={ () => {
                    onAddPropertyClick()
                  } }
                >
                  {t('asset.asset-editor-tabs.properties.add-custom-property.add')}
                </Button>
              </div>
            )}

            {!createManualPropertyMode && (
              <>
                <Select
                  filterOption={ (input, option) => {
                    return (option?.children as unknown as string ?? '').toLowerCase().includes(input.toLowerCase())
                  } }
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
                </Select>

                <Divider type={ 'vertical' } />

                <Button
                  icon={ <Icon name={ 'PlusCircleOutlined' } /> }
                  onClick={ () => {
                    setCreateManualPropertyMode(true)
                  } }
                >
                  {t('asset.asset-editor-tabs.properties.add-custom-property')}
                </Button>
              </>
            )}
          </div>
        )}
      </div>

      <Table propertiesTableTab={ propertiesTableTab } />
    </div>
  )

  function onPredefinedPropertyChange (value: string): void {
    const property = data?.items?.find((item) => item.id === value)

    if (property === undefined) {
      return
    }

    if (properties?.find((prop) => prop.key === property.name) !== undefined) {
      showModal()
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
      predefinedName: property.name
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
    const isValidTypeSelectValue = typeSelectValue.current !== undefined

    if (!isValidKeyInput || !isValidTypeSelectValue) {
      return
    }

    if (properties?.find((prop) => prop.key === keyInputValue.current) !== undefined) {
      showModal()
      return
    }

    const newDataProperty: DataProperty = {
      key: keyInputValue.current,
      type: typeSelectValue.current,
      predefinedName: 'Custom',
      data: null,
      inherited: false,
      inheritable: false
    }

    addProperty(newDataProperty)
  }
}
