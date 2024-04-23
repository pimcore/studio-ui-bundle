import { Progress, type ProgressProps } from 'antd'
import React from 'react'
import { useStyle } from '@Pimcore/components/progressbar/progressbar.style'

interface IProgressProps extends ProgressProps {
  description: string
  descriptionAction?: React.ReactNode
  progressStatus: string
}

export const Progressbar = (props: IProgressProps): React.JSX.Element => {
  const { styles } = useStyle()

  return (
    <div className={ styles.progressbar }>
      <div className={ 'progressbar-description' }>
        <p id={ 'progressbarLabel' }>{props.description}</p>
        <div className={ 'progressbar-description__action' }>
          {props.descriptionAction}
        </div>
      </div>
      <Progress
        { ...props }
        aria-labelledby={ 'progressbarLabel' }
        showInfo={ false }
      />
      <div className={ 'progressbar-status' }>
        <p>{props.progressStatus}</p>
      </div>
    </div>
  )
}
