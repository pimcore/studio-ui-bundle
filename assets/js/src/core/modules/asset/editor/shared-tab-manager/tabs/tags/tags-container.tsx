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

import React, { useContext, useEffect, useState } from 'react'
import { Divider, Dropdown } from 'antd'
import { useStyle } from './tags-container.styles'
import { useTranslation } from 'react-i18next'
import {
  AssignedTagsTable
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/tags/components/assigned-tags/assigned-tags'
import {
  TagsTreeContainer
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/tags/components/tags-tree/tags-tree-container'
import {
  useBatchReplaceTagsForElementsMutation,
  useGetTagsForElementByTypeAndIdQuery
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/tags/tags-api-slice.gen'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'

export const TagsTabContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyle()
  const { id } = useContext(AssetContext)
  const [defaultCheckedTags, setDefaultCheckedTags] = useState<React.Key[]>([])
  const [replaceTagsMutation] = useBatchReplaceTagsForElementsMutation()

  const { data, isLoading } = useGetTagsForElementByTypeAndIdQuery({
    elementType: 'asset',
    id: id!
  })

  useEffect(() => {
    if (data?.items !== undefined && data.totalItems > 0) {
      setDefaultCheckedTags(Object.keys(data.items))
    }
  }, [data])

  const applyTagsToElement = async (): Promise<void> => {
    await replaceTagsMutation({
      elementType: 'asset',
      elementTagIdCollection: {
        elementIds: [id!],
        tagIds: defaultCheckedTags.map(Number)
      }
    })
  }

  return (
    <div className={ styles.tab }>
      <div className={ 'pimcore-tags-sidebar' }>
        <TagsTreeContainer
          defaultCheckedTags={ defaultCheckedTags }
          setDefaultCheckedTags={ setDefaultCheckedTags }
        />
      </div>

      <Divider type={ 'vertical' } />

      <div className={ 'pimcore-tags-main' }>
        <div className={ ['pimcore-tags-toolbar', styles.toolbar].join(' ') }>
          <p className={ 'pimcore-tags-toolbar__headline' }>
            {t('element.element-editor-tabs.tags.assigned-tags-text')}
          </p>

          <Dropdown.Button
            menu={ {
              items: [{
                label: 'Submit and continue',
                key: '1'
              }]
            } }
            onClick={ applyTagsToElement }
          >
            {t('element.element-editor-tabs.tags.apply-folder-tags')}
          </Dropdown.Button>
        </div>

        <div className={ 'pimcore-tags-content' }>
          <AssignedTagsTable
            isLoading={ isLoading }
            tags={ Object.values(data?.items ?? {}) }
          />
        </div>
      </div>
    </div>
  )
}
