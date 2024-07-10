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
import { formatDate } from '@Pimcore/utils/date-time'

interface FormattedDateProps {
  timestamp: number
}

const FormattedDate = (props: FormattedDateProps): React.JSX.Element => {
  return (
    <>
      {formatDate(props.timestamp)}
    </>
  )
}

export { FormattedDate }
