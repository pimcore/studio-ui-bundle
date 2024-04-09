import React, { useState } from 'react'
import { useStyle } from './editable-label.styles'

interface EditableLabelProps {
  currentPage: number
  defaultClassNameLabel: string
  onKeyDown: (e) => void
}

export const EditableLabel = ({
  currentPage,
  defaultClassNameLabel = 'display-none',
  onKeyDown
}: EditableLabelProps): React.JSX.Element => {
  const { styles } = useStyle()
  const [classNameLabel, setClassNameLabel] = useState(defaultClassNameLabel)

  const onClickLabel = (e): void => {
    setClassNameLabel(classNameLabel === '' ? 'display-none' : '')
    e.target.previousElementSibling.focus()
  }

  const onBlurInput = (e): void => {
    setClassNameLabel('')
  }

  const onFocus = (e): void => {
    e.target.value = currentPage
    e.target.select()
  }

  return (
    <div className={ styles['editable-container'] }>
      <input
        className='input-field'
        min='1'
        onBlur={ onBlurInput }
        onFocus={ onFocus }
        onKeyDown={ onKeyDown }
        type='number'
      />
      <a
        className={ 'editable-label ' + classNameLabel }
        onClick={ onClickLabel }
      >{currentPage}</a>
    </div>
  )
}
