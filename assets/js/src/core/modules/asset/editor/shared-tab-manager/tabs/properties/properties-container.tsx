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

import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Divider, Segmented, Select } from 'antd'
import { useStyle } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/properties/properties-container.styles'
import { Icon } from '@Pimcore/components/icon/icon'
import { ElementToolbar } from '@Pimcore/components/element-toolbar/element-toolbar'
import { useGetPropertiesQuery } from '@Pimcore/modules/asset/properties-api-slice.gen'
import Input from 'antd/es/input/Input'
import { Table } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/properties/components/table/table'

export const PropertiesContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyle()
  const [propertiesTableTab, setPropertiesTableTab] = React.useState<string>('own')
  const [createManualPropertyMode, setCreateManualPropertyMode] = React.useState<boolean>(false)

  const { data, isLoading } = useGetPropertiesQuery({
    elementType: 'asset'
  })

  return (
    <div className={ styles.tab }>
      <ElementToolbar />

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
                  placeholder={ t('asset.asset-editor-tabs.properties.add-custom-property.key') }
                />

                <Select
                  options={ [
                    { value: 'text', label: 'Text' },
                    { value: 'number', label: 'Number' },
                    { value: 'date', label: 'Date' },
                    { value: 'select', label: 'Select' },
                    { value: 'bool', label: 'Bool' }
                  ] }
                  placeholder={ t('asset.asset-editor-tabs.properties.add-custom-property.type') }
                />

                <Button
                  icon={ <Icon name={ 'PlusCircleOutlined' } /> }
                  onClick={ () => {
                    console.log('added custom property - in theorie :P')
                  } }
                >
                  {t('asset.asset-editor-tabs.properties.add-custom-property.add')}
                </Button>
              </div>
            )}

            {!createManualPropertyMode && (
              <>
                <Select
                  loading={ isLoading }
                  placeholder={ t('asset.asset-editor-tabs.properties.predefined-properties') }
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
}
