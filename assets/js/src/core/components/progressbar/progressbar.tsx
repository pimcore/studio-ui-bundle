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

import { Progress, type ProgressProps } from 'antd'
import React from 'react'
import { useStyle } from '@Pimcore/components/progressbar/progressbar.style'

interface IProgressProps extends ProgressProps {
  description: string
  descriptionAction?: React.ReactNode
  progressStatus: string
}

export const Progressbar = ({ progressStatus, description, descriptionAction, ...props }: IProgressProps): React.JSX.Element => {
  const { styles } = useStyle()

  return (
    <div className={ styles.progressbar }>
      <div className={ 'progressbar-description' }>
        <p id={ 'progressbarLabel' }>{description}</p>
        <div className={ 'progressbar-description__action' }>
          {descriptionAction}
        </div>
      </div>
      <Progress
        { ...props }
        aria-labelledby={ 'progressbarLabel' }
        showInfo={ false }
        status='normal'
      />
      <div className={ 'progressbar-status' }>
        <p>{progressStatus}</p>
      </div>
    </div>
  )
}
