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
import { SearchContainer as BaseSearchContainer } from '@Pimcore/modules/element/tree/search/search-container'
import { type TreeSearchProps } from '@Pimcore/components/element-tree/element-tree'
import { useTranslation } from 'react-i18next'

const SearchContainer = (props: TreeSearchProps): React.JSX.Element => {
  const { t } = useTranslation()
  return (
    <BaseSearchContainer
      { ...props }
      label={ t('data-object.data-object-tree.search', { folderName: props.node.label }) }
      node={ props.node }
      total={ props.total }
    />
  )
}

export { SearchContainer }
