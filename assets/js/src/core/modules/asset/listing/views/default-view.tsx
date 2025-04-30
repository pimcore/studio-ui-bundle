/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { ListingBaseView } from '@Pimcore/modules/element/listing/abstract/view-layer/base-view/listing-base-view'
import React from 'react'
import { Toolbar } from '../toolbar/toolbar'

export const DefaultView = (): React.JSX.Element => {
  return <ListingBaseView renderToolbar={ Toolbar } />
}
