/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useRef } from 'react'
import { Title } from '@Pimcore/components/title/title'
import { t } from 'i18next'
import { Flex } from '@Pimcore/components/flex/flex'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Content } from '@Pimcore/components/content/content'
import { usePredefinedProperties } from './hooks/use-predefined-properties'
import { Table } from './table/table'
import { Button, IconTextButton, Input, ModalFooter, Select, useModal } from '@sdk/components'
import { PredefinedPropertyProvider } from './predefined-properties-provider'
import { serviceIds, useInjection } from '@sdk/app'
import { DynamicTypeMetaDataRegistry } from '@sdk/modules/element'
import { InputRef } from 'antd'

export type Mode = 'create' | 'update'

export interface TreeAction {
  key: string
  icon: string
}

const PredefinedPropertiesContainerInner = (): React.JSX.Element => {
  const {predefinedProperties, isLoading} = usePredefinedProperties()

    const metadataTypeRegistry = useInjection<DynamicTypeMetaDataRegistry>(serviceIds['DynamicTypes/MetadataRegistry'])
    const typeSelectOptions = [...metadataTypeRegistry.getTypeSelectionTypes().keys()].map((type) => {
      return { value: type, label: t('data-type.' + type.split('.')[1]) }
    })
    
    const onAddNewPredefinedProperty = (): void => {
      console.log("add new")
    }

    const nameInputValue = useRef<string>('')
    const nameInputRef = useRef<InputRef>(null)
    const typeSelectValue = useRef<string>('input')
      
      function onNameInputChange (event: React.ChangeEvent<HTMLInputElement>): void {
        nameInputValue.current = event.target.value
      }
    
      function onTypeSelectChange (value: string): void {
        typeSelectValue.current = value
      }

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
   
 const warningModals = (<div className={ 'pimcore-properties-toolbar__predefined-properties' }>
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
              </div>)

  const content = (
    <ContentLayout
      renderToolbar={
        <Toolbar theme="secondary">
          <IconButton
            icon={ { value: 'refresh' } }
            onClick={ () => {
        console.log("clicked")}
          }
          />
        </Toolbar> }
      renderTopBar={
        <Toolbar
          justify='space-between'
          margin={ {
            x: 'mini',
            y: 'none'
          } }
          theme='secondary'
        >
                    <Flex gap={ 'small' }>
                      <Title titleClass={ 'm-none' }>{t('widget.predefined-properties')}</Title>                      
                                      <Input
                                        onChange={ onNameInputChange }
                                        placeholder={ t('predefined-properties.name') }
                                        ref={ nameInputRef }
                                      />
                      
                                      <Select
                                        className='min-w-100'
                                        defaultValue={ typeSelectValue.current }
                                        onSelect={ onTypeSelectChange }
                                        options={ typeSelectOptions }
                                        placeholder={ t('predefined-properties.type') }
                                      />
                      <IconTextButton
                        disabled={ isLoading }
                        icon={ { value: 'new' } }
                        onClick={ () => {
                          onAddNewPredefinedProperty()
                        }}
                      >{t('predefined-properties.new')}</IconTextButton>
                    </Flex>
        </Toolbar>
        }
    >
      <Content
        loading={ isLoading }
        margin={ {
          x: 'extra-small',
          y: 'none'
        } }
        none={ predefinedProperties === undefined || predefinedProperties.length === 0 }
      >
        {warningModals}
<Table
        showDuplicatePropertyModal={ showDuplicatePropertyModal }
        showMandatoryModal={ showMandatoryModal }/>
</Content>
    </ContentLayout>
  )

  return content
}

const PredefinedPropertiesContainer = (): React.JSX.Element => (
  <PredefinedPropertyProvider>
    <PredefinedPropertiesContainerInner />
  </PredefinedPropertyProvider>
)

export { PredefinedPropertiesContainer }
