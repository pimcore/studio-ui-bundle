/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*/

import React from 'react'
import { useTranslation } from 'react-i18next'

interface FormattedDateProps {
  timestamp: number
}

const FormattedDate = (props: FormattedDateProps): React.JSX.Element => {
  const { i18n } = useTranslation()
  const formattedDate = i18n.format(new Date(props.timestamp), 'datetime', i18n.language)

  return (
    <>
      {formattedDate}
    </>
  )
}

export { FormattedDate }
