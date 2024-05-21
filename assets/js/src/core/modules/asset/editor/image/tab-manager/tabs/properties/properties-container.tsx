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
import { Button, Radio, type RadioChangeEvent, Select } from 'antd'
import { useStyle } from '@Pimcore/modules/asset/editor/image/tab-manager/tabs/properties/properties-container.styles'
import { Icon } from '@Pimcore/components/icon/icon'

export const PropertiesContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyle()
  const [propertiesTab, setPropertiesTab] = React.useState<string>('own')
  const tabs = [
    { label: t('asset.asset-editor-tabs.properties.edit-own-properties'), value: 'own' },
    { label: t('asset.asset-editor-tabs.properties.all-properties'), value: 'all' }
  ]

  const changePropertiesTab = ({ target: { value } }: RadioChangeEvent): void => {
    console.log('radio1 checked', value)
    setPropertiesTab(String(value))
  }

  return (
    <div className={ styles.tab }>
      <div className={ ['pimcore-properties-toolbar', styles.toolbar].join(' ') }>
        <p className={ 'pimcore-properties-toolbar__headline' }>
          { t('asset.asset-editor-tabs.properties') }
        </p>

        <Radio.Group
          buttonStyle="solid"
          onChange={ changePropertiesTab }
          optionType="button"
          options={ tabs }
          value={ propertiesTab }
        />

        <Select
          options={ [
            { value: 1, label: 'Property 1' },
            { value: 2, label: 'Property 2' },
            { value: 3, label: 'Property 3' },
            { value: 4, label: 'Property 4' }
          ] }
          placeholder={ t('asset.asset-editor-tabs.properties.predefined-properties') }
        />
        <Button
          icon={ <Icon name={ 'PlusCircleOutlined' } /> }
          type="primary"
        >
          { t('asset.asset-editor-tabs.properties.add-custom-property') }
        </Button>
      </div>
    </div>
  )
}
