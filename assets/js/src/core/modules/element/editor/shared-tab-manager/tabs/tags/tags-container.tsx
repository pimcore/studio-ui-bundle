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
import { Dropdown } from 'antd'
import { useTranslation } from 'react-i18next'
import {
  AssignedTagsTable
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/components/assigned-tags/assigned-tags'
import {
  TagsTreeContainer
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/components/tags-tree/tags-tree-container'
import {
  useTagGetCollectionForElementByTypeAndIdQuery
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/tags-api-slice.gen'
import {
  useShortcutActions
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/hooks/use-shortcut-actions'
import { SplitLayout } from '@Pimcore/components/split-layout/split-layout'
import { Content } from '@Pimcore/components/content/content'
import { Header } from '@Pimcore/components/header/header'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'

export const TagsTabContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { id, elementType } = useElementContext()
  const { applyFolderTags, removeCurrentAndApplyFolderTags } = useShortcutActions()

  const { data, isLoading } = useTagGetCollectionForElementByTypeAndIdQuery({
    elementType,
    id
  })

  return (
    <SplitLayout
      leftItem={ {
        minSize: 315,
        size: 25,
        children: (
          <Content
            loading={ isLoading }
            padded
          >
            <TagsTreeContainer
              isLoading={ isLoading }
              tags={ data?.items ?? [] }
            />
          </Content>
        )
      } }
      resizeAble

      rightItem={ {
        minSize: 300,
        size: 75,
        children: (
          <Content padded>
            <Header title={ t('tags.assigned-tags-text') }>
              <Dropdown.Button
                menu={ {
                  items: [{
                    label: 'Remove current element tags & Apply folder tags',
                    key: '1',
                    onClick: removeCurrentAndApplyFolderTags
                  }]
                } }
                onClick={ applyFolderTags }
              >
                {t('tags.apply-folder-tags')}
              </Dropdown.Button>
            </Header>

            <div className={ 'pimcore-tags-content' }>
              <AssignedTagsTable
                isLoading={ isLoading }
                tags={ Object.values(data?.items ?? {}) }
              />
            </div>
          </Content>
        )
      } }

      withDivider
    />
  )
}
