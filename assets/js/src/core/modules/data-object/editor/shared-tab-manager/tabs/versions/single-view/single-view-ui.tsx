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
import { Flex } from '@Pimcore/components/flex/flex'
import { VersionsFieldsList } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/components/versions-fields-list/versions-fields-list'
import { type IObjectVersionField } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/components/versions-fields-list/types'

interface ISingleViewUiProps {
  data: IObjectVersionField[]
}

export const SingleViewUi = ({ data }: ISingleViewUiProps): React.JSX.Element => {
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
