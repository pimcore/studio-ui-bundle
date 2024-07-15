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
import { Divider, type MenuProps } from 'antd'
import { useStyle } from './tags-container.styles'
import { useTranslation } from 'react-i18next'
import DropdownButton from 'antd/es/dropdown/dropdown-button'
import {
  AssignedTagsTable
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/tags/components/assigned-tags/assigned-tags'
import { TagsTree } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/tags/components/tags-tree/tags-tree'

export const TagsTabContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyle()

  const dropdownButtonMenu: MenuProps['items'] = [
    {
      label: 'Submit and continue',
      key: '1'
    }
  ]

  return (
    <div className={ styles.tab }>
      <div className={ 'pimcore-tags-sidebar' }>
        <TagsTree id={ 0 } />
      </div>

      <Divider type={ 'vertical' } />

      <div className={ 'pimcore-tags-main' }>
        <div className={ ['pimcore-tags-toolbar', styles.toolbar].join(' ') }>
          <p className={ 'pimcore-tags-toolbar__headline' }>
            {t('element.element-editor-tabs.tags.assigned-tags-text')}
          </p>

          <DropdownButton
            menu={ {
              items: dropdownButtonMenu
            } }
          />
        </div>

        <div className={ 'pimcore-tags-content' }>
          <AssignedTagsTable />
        </div>
      </div>
    </div>
  )
}
