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

import { ListingBaseView } from '@Pimcore/modules/element/listing/abstract/view-layer/base-view/listing-base-view'
import React from 'react'
import { Toolbar } from '../toolbar/toolbar'

export const DefaultView = (): React.JSX.Element => {
  return <ListingBaseView renderToolbar={ Toolbar } />
}
