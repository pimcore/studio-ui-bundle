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
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Select } from 'antd'
import Input from 'antd/es/input/Input'
import { Icon } from '@Pimcore/components/icon/icon'

export const CustomMetadataTabContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const [editmode, setEditMode] = useState<boolean>(false)
  const { styles } = useStyle()

  return (
    <div className={ styles.tab }>
      <div className={ ['pimcore-custom-metadata-toolbar', styles.toolbar].join(' ') }>
        <p className={ 'pimcore-custom-metadata-toolbar__headline' }>
          { t('asset.asset-editor-tabs.custom-metadata.text') }
        </p>

        <div className={ 'pimcore-custom-metadata-toolbar__manual' }>
          {editmode && (
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
                placeholder={ t('asset.asset-editor-tabs.custom-metadata.add-custom-metadata.name') }
              />

              <Select
                options={ [
                  { value: 'text', label: 'Text' },
                  { value: 'document', label: 'Document' },
                  { value: 'asset', label: 'Asset' },
                  { value: 'object', label: 'Object' },
                  { value: 'bool', label: 'Bool' }
                ] }
                placeholder={ t('asset.asset-editor-tabs.custom-metadata.add-custom-metadata.type') }
              />

              <Select
                options={ [
                  { value: 'text', label: 'Text' },
                  { value: 'document', label: 'Document' },
                  { value: 'asset', label: 'Asset' },
                  { value: 'object', label: 'Object' },
                  { value: 'bool', label: 'Bool' }
                ] }
                placeholder={ t('asset.asset-editor-tabs.custom-metadata.add-custom-metadata.language') }
              />
            </div>
          )}

          {!editmode && (
            <>
              <Select
                options={ [
                  { value: 'text', label: 'Text' },
                  { value: 'document', label: 'Document' },
                  { value: 'asset', label: 'Asset' },
                  { value: 'object', label: 'Object' },
                  { value: 'bool', label: 'Bool' }
                ] }
                placeholder={ t('asset.asset-editor-tabs.custom-metadata.add-predefined-definition') }
                showSearch
              />

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
    </div>
  )
}
