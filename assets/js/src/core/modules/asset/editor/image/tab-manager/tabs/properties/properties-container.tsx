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
import { Button, Divider, Result, Segmented, Select } from 'antd'
import { useStyle } from '@Pimcore/modules/asset/editor/image/tab-manager/tabs/properties/properties-container.styles'
import { Icon } from '@Pimcore/components/icon/icon'
import { useGlobalAssetContext } from '@Pimcore/modules/asset/hooks/use-global-asset-context'
import { Table } from '@Pimcore/modules/asset/editor/image/tab-manager/tabs/properties/components/table/table'
import { ElementToolbar } from '@Pimcore/components/element-toolbar/element-toolbar'

export const PropertiesContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyle()
  const { context } = useGlobalAssetContext()
  const [propertiesTableTab, setPropertiesTableTab] = React.useState<string>('own')

  if (context === undefined) {
    return <Result title="No context" />
  }

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

        <div className={ 'pimcore-properties-toolbar__predefined-properties' }>
          <Select
            options={ [
              { value: 1, label: 'Property 1' },
              { value: 2, label: 'Property 2' },
              { value: 3, label: 'Property 3' },
              { value: 4, label: 'Property 4' }
            ] }
            placeholder={ t('asset.asset-editor-tabs.properties.predefined-properties') }
          />

          <Divider type={ 'vertical' } />

          <Button icon={ <Icon name={ 'PlusCircleOutlined' } /> }>
            { t('asset.asset-editor-tabs.properties.add-custom-property') }
          </Button>
        </div>
      </div>

      <Table propertiesTableTab={ propertiesTableTab } />
    </div>
  )
}
