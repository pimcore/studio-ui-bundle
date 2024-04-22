import React, { useEffect, useState } from 'react'
import { useStyle } from './inline-textfield.styles'
import { isSet } from '@Pimcore/utils/helpers'

interface InlineTextfieldProps {
  value: string
  onKeyDown: (e) => void
  showDotsValues?: string[]
  defaultClassNameInput?: string
  defaultClassNameLabel?: string
  defaultClassNameLabelDots?: string
}

enum VisibleElement {
  input = 'input',
  label = 'label',
  labelDots = 'labelDots'
}

export const InlineTextfield = ({
  value = '',
  onKeyDown,
  showDotsValues,
  defaultClassNameInput = 'remove-decoration',
  defaultClassNameLabel = 'display-none',
  defaultClassNameLabelDots = ''
}: InlineTextfieldProps): React.JSX.Element => {
  const { styles } = useStyle()
  const [classNameInput, setClassNameInput] = useState(defaultClassNameInput)
  const [classNameLabel, setClassNameLabel] = useState(defaultClassNameLabel)
  const [classNameLabelDots, setClassNameLabelDots] = useState(defaultClassNameLabelDots)

  const setVisibleElement = (element: VisibleElement): void => {
    switch (element) {
      case VisibleElement.input:
        setClassNameInput('')
        setClassNameLabel('display-none')
        setClassNameLabelDots('display-none')
        break
      case VisibleElement.label:
        setClassNameInput('remove-decoration')
        setClassNameLabel('')
        setClassNameLabelDots('display-none')
        break
      case VisibleElement.labelDots:
        setClassNameInput('remove-decoration')
        setClassNameLabel('display-none')
        setClassNameLabelDots('')
        break
    }
  }

  const onClickLabel = (e): void => {
    setVisibleElement(VisibleElement.input)
    e.target.previousElementSibling.focus()
  }

  const onBlurInput = (e): void => {
    setClassNameBasedOnValue()
  }

  const onMouseOverDots = (e): void => {
    setVisibleElement(VisibleElement.input)
    e.target.focus()
  }

  const onFocusInput = (e): void => {
    setVisibleElement(VisibleElement.input)
  }

  const setClassNameBasedOnValue = (): void => {
    if (isSet(showDotsValues)) {
      if (showDotsValues!.includes(value) && classNameLabelDots === 'display-none') {
        setVisibleElement(VisibleElement.labelDots)
      } else if (!showDotsValues!.includes(value) && classNameLabel === 'display-none') {
        setVisibleElement(VisibleElement.label)
      }
    }
  }

  useEffect(() => {
    setClassNameBasedOnValue()
  }, [value])

  return (
    <div className={ styles['editable-container'] }>
      <input
        className={ 'input-field ' + classNameInput }
        min='1'
        onBlur={ onBlurInput }
        onFocus={ onFocusInput }
        onKeyDown={ onKeyDown }
        type='number'
      />
      <a
        className={ 'inline-label ' + classNameLabel }
        onClick={ onClickLabel }
      >{value}</a>
      <a
        className={ 'inline-label-dots ' + classNameLabelDots }
        onMouseOver={ onMouseOverDots }
      >
        <span className='ant-pagination-item-ellipsis'>•••</span>
      </a>
    </div>
  )
}
