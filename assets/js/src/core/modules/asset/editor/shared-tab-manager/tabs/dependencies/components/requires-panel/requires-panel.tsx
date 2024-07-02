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

import React, { useContext } from 'react'
import { Icon } from '@Pimcore/components/icon/icon'
import { useTranslation } from 'react-i18next'
import { useStyle as useDependencyTabStyle } from '../../dependencies-container.styles'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import {
  useGetDependenciesQuery
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/dependencies/dependencies-api-slice.gen'
import { Table } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/dependencies/components/table/table'

export const RequiresPanel = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles: dependencyTabStyle } = useDependencyTabStyle()
  const { id } = useContext(AssetContext)

  const { data, isLoading } = useGetDependenciesQuery({
    elementType: 'asset',
    id: id!,
    page: 1,
    pageSize: 20,
    dependencyMode: 'requires'
  })

  return (
    <div className={ 'pimcore-dependencies__requires' }>
      <div className={ ['pimcore-dependencies__requires_toolbar', dependencyTabStyle.toolbar].join(' ') }>
        <Icon name={ 'intersect-circle' } />
        <p>{t('asset.asset-editor-tabs.dependencies.requires')}</p>
      </div>

      <div className={ 'pimcore-dependencies__requires__content' }>
        {!isLoading && data !== undefined && (
          <Table { ...data } />
        )}
      </div>
    </div>
  )
}
