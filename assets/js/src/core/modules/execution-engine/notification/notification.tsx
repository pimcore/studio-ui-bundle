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

import React, { useEffect } from 'react'
import { useJobs } from '../hooks/useJobs'
import { useNotification } from '@Pimcore/components/notification/useNotification'
import { JobList } from './job-list/job-list'
import { useTranslation } from 'react-i18next'

export const Notification = (): React.JSX.Element => {
  const { jobs } = useJobs()
  const hasJobs = jobs.length > 0
  const [notificationApi] = useNotification()
  const { t } = useTranslation()

  useEffect(() => {
    if (hasJobs) {
      notificationApi.open({
        message: t('jobs.notification.title'),
        description: <JobList />,
        duration: 0,
        closable: false,
        placement: 'bottomRight'
      })
    }

    if (!hasJobs) {
      notificationApi.destroy()
    }
  }, [hasJobs])

  return <></>
}
