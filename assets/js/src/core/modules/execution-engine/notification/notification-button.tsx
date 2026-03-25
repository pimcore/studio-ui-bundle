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
import { useJobs } from '../hooks/useJobs'
import { useNotification } from '@Pimcore/components/notification/useNotification'
import { Badge, IconButton } from '@sdk/components'
import { useStyles } from './notification-button.styles'
import { JobList } from './job-list/job-list'
import { useTranslation } from 'react-i18next'

export const NotificationButton = (): React.JSX.Element => {
  const { styles } = useStyles()
  const { t } = useTranslation()
  const { jobs } = useJobs()
  const [notificationApi] = useNotification()

  if (jobs.length === 0) {
    return <></>
  }

  return (
    <Badge
      className={ styles.badge }
      count={ jobs.length }
      offset={ [-9, 9] }
      size={ 'small' }
    >
      <IconButton
        icon={ { value: 'copilot-job-runs' } }
        onClick={ () => {
          notificationApi.open({
            key: 'jobs-notification',
            message: t('jobs.notification.title'),
            description: <JobList />
          })
        } }
        type={ 'text' }
      />
    </Badge>
  )
}
