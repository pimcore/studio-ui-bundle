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
import { formatDate, formatDateTime } from '@Pimcore/utils/date-time'

interface FormattedDateProps {
  timestamp: number
  showTime?: boolean
}

const FormattedDate = (props: FormattedDateProps): React.JSX.Element => {
  return (
    <>
      {props.showTime === true
        ? formatDateTime({ timestamp: props.timestamp, dateStyle: 'short', timeStyle: 'short' })
        : formatDate(props.timestamp)
      }
    </>
  )
}

export { FormattedDate }
