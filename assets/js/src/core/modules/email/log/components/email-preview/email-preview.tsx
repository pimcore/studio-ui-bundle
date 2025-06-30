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
import { type EmailLog, useEmailLogGetHtmlQuery } from '@Pimcore/modules/email/emails-api-slice.gen'
import { isUndefined } from 'lodash'
import React from 'react'
import { useStyles } from './email-preview.styles'
import { useTranslation } from 'react-i18next'

interface EmailPreviewProps {
  email: EmailLog
  height?: number
}

export const EmailPreview = ({ email, height = 650 }: EmailPreviewProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const { data, isLoading } = useEmailLogGetHtmlQuery({ id: email.id })

  return (
    <Content
      loading={ isLoading }
      none={ isUndefined(data?.data) || data.data.length === 0 }
    >
      <iframe
        className={ styles.iframe }
        height={ height }
        sandbox=""
        srcDoc={ data?.data ?? '' }
        title={ t('aria.email-log.html.preview') }
      />
    </Content>
  )
}
