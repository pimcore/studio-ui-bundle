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

import React, { useRef, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { type InputRef } from 'antd'
import { Button } from '@Pimcore/components/button/button'
import { usePropertyGetCollectionQuery } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/properties/properties-api-slice-enhanced'
import { Input } from 'antd'
import { Table } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/properties/components/table/table'
import { useModal } from '@Pimcore/components/modal/useModal'
import { ModalFooter } from '@Pimcore/components/modal/footer/modal-footer'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Header } from '@Pimcore/components/header/header'
import { Content } from '@Pimcore/components/content/content'
import { type DataProperty } from '@Pimcore/modules/element/draft/hooks/use-properties'
import { useElementDraft } from '@Pimcore/modules/element/hooks/use-element-draft'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { Segmented } from '@Pimcore/components/segmented/segmented'
import { Space } from '@Pimcore/components/space/space'
import { Split } from '@Pimcore/components/split/split'
import { Select } from '@Pimcore/components/select/select'
import { uuid } from '@Pimcore/utils/uuid'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'

export const PropertiesContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const [propertiesTableTab, setPropertiesTableTab] = useState<string>('own')
  const [createManualPropertyMode, setCreateManualPropertyMode] = useState<boolean>(false)
  const { id, elementType } = useElementContext()

  const { element, addProperty, properties } = useElementDraft(id, elementType)
  const isEditable = checkElementPermission(element?.permissions, 'publish') || checkElementPermission(element?.permissions, 'save')

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
    elementType
  })

  useEffect(() => {
    if (createManualPropertyMode) {
      keyInputRef.current?.focus()
    } else {
      typeSelectValue.current = ''
      keyInputValue.current = ''
    }
  }, [createManualPropertyMode])

  return (
    <Content padded>
      <Header
        className={ 'p-l-mini' }
        title={ t('properties.label') }
      >
        <Space size='small'>
          <Segmented
            onChange={ setPropertiesTableTab }
            options={ [
              { label: t('properties.editable-properties'), value: 'own' },
              { label: t('properties.all-properties'), value: 'all' }
            ] }
          />

          {isEditable && (
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
            <Space size="extra-small">
              <Button
                onClick={ () => {
                  setCreateManualPropertyMode(false)
                } }
                type={ 'link' }
              >
                {t('properties.add-custom-property.cancel')}
              </Button>

              <Input
                onChange={ onKeyInputChange }
                placeholder={ t('properties.add-custom-property.key') }
                ref={ keyInputRef }
              />

              <Select
                className='min-w-100'
                onSelect={ onTypeSelect }
                options={ [
                  { value: 'text', label: t('data-type.text') },
                  { value: 'document', label: t('data-type.document') },
                  { value: 'asset', label: t('data-type.asset') },
                  { value: 'object', label: t('data-type.object') },
                  { value: 'bool', label: t('data-type.checkbox') }
                ] }
                placeholder={ t('properties.add-custom-property.type') }
              />

              <IconTextButton
                icon={ { value: 'new-something' } }
                onClick={ () => {
                  onAddPropertyClick()
                } }
              >
                {t('properties.add-custom-property.create')}
              </IconTextButton>
            </Space>
            )}

            {!createManualPropertyMode && (
              <Split size='mini'>
                <Select
                  className='min-w-100'
                  filterOption={ (input, option) => {
                    return (option?.label as unknown as string ?? '').toLowerCase().includes(input.toLowerCase())
                  } }
                  key={ 'properties-select' }
                  loading={ isLoading }
                  onSelect={ onPredefinedPropertyChange }
                  options={ data?.items?.map((item) => ({
                    label: item.name,
                    value: item.id
                  })) }
                  placeholder={ t('properties.predefined-properties') }
                  showSearch
                />

                <IconTextButton
                  icon={ { value: 'new-something' } }
                  key={ t('properties.new-custom-property') }
                  onClick={ () => {
                    setCreateManualPropertyMode(true)
                  } }
                >
                  {t('properties.new-custom-property')}
                </IconTextButton>
              </Split>
            )}
          </div>
          )}
        </Space>
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

    if (propertyExists(property.key)) {
      showDuplicatePropertyModal()
      return
    }

    const newDataProperty: DataProperty = {
      key: property.key,
      type: property.type,
      data: property.data,
      inherited: false,
      inheritable: property.inheritable,
      additionalAttributes: property.additionalAttributes,
      config: property.config,
      description: property.description,
      predefinedName: property.name,
      rowId: uuid()
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
      rowId: uuid()
    }

    addProperty(newDataProperty)
  }
}
