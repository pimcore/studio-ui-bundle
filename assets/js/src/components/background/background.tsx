import React from 'react'
import { useStyle } from './background.styles'

const Background = (): React.JSX.Element => {
  const { styles } = useStyle()

  return (
    <div className={ styles.background }>
      <div className='background-figure background-figure--bottom-left'></div>
      <div className='background-figure background-figure--bottom-right'></div>
      <div className='background-figure background-figure--top-left'></div>
    </div>
  )
}

export { Background }
