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
import { type DefaultCellProps } from '../../default-cell'
import { FormattedDate } from '@Pimcore/components/formatted-date/formatted-date'

export const DateCell = (props: DefaultCellProps): React.JSX.Element => {
  return (
    <div className={ ['default-cell__content'].join(' ') }>
      <FormattedDate timestamp={ props.getValue() * 1000 } />
    </div>
  )
}
