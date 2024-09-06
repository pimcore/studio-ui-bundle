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

import { Content } from '@Pimcore/components/content/content'
import { Header } from '@Pimcore/components/header/header'
import React from 'react'

export const EditTabContainer = (): React.JSX.Element => {
  return (
    <Content padded>
      <Header
        title={ 'Edit' }
      />
    </Content>

  )
}
