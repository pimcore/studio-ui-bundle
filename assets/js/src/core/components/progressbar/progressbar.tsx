/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Progress, type ProgressProps } from 'antd'
import React from 'react'
import { useStyle } from '@Pimcore/components/progressbar/progressbar.style'

interface IProgressProps extends ProgressProps {
  description: string | React.ReactNode
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
