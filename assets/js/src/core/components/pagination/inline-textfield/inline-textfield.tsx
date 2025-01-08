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

import React, { useEffect, useState } from 'react'
import { useStyle } from './inline-textfield.styles'
import { isSet } from '@Pimcore/utils/helpers'
import { Button } from '@Pimcore/components/button/button'
import { Icon } from '@Pimcore/components/icon/icon'

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
    e.target.previousElementSibling?.focus()
  }

  const onBlurInput = (e): void => {
    setClassNameBasedOnValue()
    e.target.value = ''
  }

  const onMouseOverDots = (e): void => {
    setVisibleElement(VisibleElement.input)
    e.target.focus()
  }
  const onFocusDots = (e): void => {
    setVisibleElement(VisibleElement.input)
  }

  const onFocusInput = (e): void => {
    setVisibleElement(VisibleElement.input)
  }

  const onMouseLeaveInput = (e): void => {
    if (document.activeElement !== e.target) {
      setVisibleElement(VisibleElement.labelDots)
    }
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
        onMouseLeave={ onMouseLeaveInput }
        type='number'
      />
      <Button
        className={ 'inline-label ' + classNameLabel }
        onClick={ onClickLabel }
      >{value}</Button>
      <Button
        className={ 'inline-label-dots ' + classNameLabelDots }
        icon={ <Icon
          options={ { width: '32px', height: '32px' } }
          value={ 'more' }
               /> }
        onFocus={ onFocusDots }
        onMouseOver={ onMouseOverDots }
      />
    </div>
  )
}
