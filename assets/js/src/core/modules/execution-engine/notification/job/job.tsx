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
import { type AbstractJob } from '../../jobs/abstact-job'
import { useInjection } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type JobComponentRegistry } from '../../services/job-component-registry'
import { NotificationJobContainer as DefaultComponent } from '../../jobs/default/notification-job-container'

export interface JobProps extends AbstractJob {}

export const Job = (props: JobProps): React.JSX.Element => {
  const jobRegistryService = useInjection<JobComponentRegistry>(serviceIds['ExecutionEngine/JobComponentRegistry'])
  const Component = jobRegistryService.getComponentByType(props.type) ?? DefaultComponent

  return <Component { ...props } />
}
