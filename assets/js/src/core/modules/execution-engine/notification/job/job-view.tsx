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

import { Progressbar } from '@Pimcore/components/progressbar/progressbar'
import { JobStatus } from '../../jobs/abstact-job'
import { type JobProps } from './job'
import React from 'react'
import { Button, Flex } from 'antd'
import { Icon } from '@Pimcore/components/icon/icon'

export interface JobViewProps extends JobProps {
  buttonLabel: string
  buttonHandler: () => void
  progress: number
}

export const JobView = (props: JobViewProps): React.JSX.Element => {
  return (
    <div>
      { props.status === JobStatus.RUNNING && (
        <Progressbar
          description={ `${props.title} in progress` }
          percent={ props.progress }
          progressStatus={ `${props.progress}% completed...` }
        />
      ) }

      { props.status === JobStatus.SUCCESS && (
        <Flex
          align='center'
          justify='space-between'
        >
          <Flex
            align='center'
            gap={ 4 }
          >
            <Icon name='check-circle-filled' /><span>{props.title} finished</span>
          </Flex>
          <Button
            onClick={ props.buttonHandler }
            type='link'
          >{props.buttonLabel}</Button>
        </Flex>
      ) }
    </div>
  )
}
