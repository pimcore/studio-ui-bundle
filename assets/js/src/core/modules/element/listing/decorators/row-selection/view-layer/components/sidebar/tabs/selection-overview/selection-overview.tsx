/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Content } from '@Pimcore/components/content/content'
import React from 'react'
import { Title } from '@Pimcore/components/title/title'
import { SelectionGrid } from './selection-grid'

export const SelectionOverview = (): React.JSX.Element => {
  return (
    <Content padded>
      <Title>Selected Elements</Title>

      <SelectionGrid />
    </Content>
  )
}
