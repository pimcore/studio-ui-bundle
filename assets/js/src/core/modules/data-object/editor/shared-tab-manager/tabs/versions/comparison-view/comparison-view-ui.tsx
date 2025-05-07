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
import { Flex } from '@Pimcore/components/flex/flex'
import { VersionsFieldsList } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/components/versions-fields-list/versions-fields-list'
import type { IObjectVersionField } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/components/versions-fields-list/types'

interface IComparisonViewUIProps {
  data: IObjectVersionField[]
}

export const ComparisonViewUI = ({ data }: IComparisonViewUIProps): React.JSX.Element => {
  return (
    <Flex
      flex={ 1 }
      gap="small"
      vertical
    >
      <VersionsFieldsList data={ data } />
    </Flex>
  )
}
