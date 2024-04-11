import React, { useState } from 'react'
import { useStyle } from './inline-textfield.styles'

interface InlineTextfieldProps {
  value: string
  defaultClassNameLabel: string
  onKeyDown: (e) => void
}

export const InlineTextfield = ({
  value = '',
  defaultClassNameLabel = 'display-none',
  onKeyDown
}: InlineTextfieldProps): React.JSX.Element => {
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
    e.target.value = ''
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
        className={ 'inline-label ' + classNameLabel }
        onClick={ onClickLabel }
      >{value}</a>
    </div>
  )
}
