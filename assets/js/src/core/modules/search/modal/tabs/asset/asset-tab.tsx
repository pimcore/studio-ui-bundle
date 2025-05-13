/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { AssetSearchListing } from './listing/asset-search-listing'
import { Content } from '@Pimcore/components/content/content'

export const AssetTab = (): React.JSX.Element => {
  return (
    <Content style={ { height: '65vh' } }>
      <AssetSearchListing />
    </Content>
  )
}
