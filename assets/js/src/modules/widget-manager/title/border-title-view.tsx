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

import { Icon } from '@Pimcore/components/icon/icon'
import React from 'react'

interface BorderTitleViewProps {
  icon: string
  title: string
}

export const BorderTitleView = ({ icon, title }: BorderTitleViewProps): React.JSX.Element => {
  return (
    <div>
      <Icon
        name={ icon }
        options={ { width: 16, height: 16 } }
      />
    </div>
  )
}
