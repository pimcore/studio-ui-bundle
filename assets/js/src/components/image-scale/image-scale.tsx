import type { RadioChangeEvent } from 'antd'
import { Radio } from 'antd'
import React from 'react'
import { Icon } from '@Pimcore/components/icon/icon'
import { useStyle } from '@Pimcore/components/image-scale/image-scale.styles'
import { type RadioChangeEventTarget } from 'antd/es/radio'

export interface IRadioChangeEventTarget extends RadioChangeEventTarget {
  value: string
}

interface IRadioChangeEvent extends RadioChangeEvent {
  target: IRadioChangeEventTarget
}

interface IImageScaleProps {
  scale: string
  setScale: React.Dispatch<React.SetStateAction<string>>
}

export const ImageScale = ({ scale, setScale }: IImageScaleProps): React.JSX.Element => {
  const { styles } = useStyle()
  const options = [
    {
      label: <Icon name={ 'spacing-width-01' } />,
      value: 'scale-by-width'
    },
    {
      label: <Icon name={ 'spacing-width-01' } />,
      value: 'scale-to-original-size'
    }
  ]

  const onChange = ({ target: { value } }: IRadioChangeEvent): void => {
    setScale(value)
  }

  return (
    <Radio.Group
      className={ styles.imageScale }
      onChange={ onChange }
      optionType="button"
      options={ options }
      value={ scale }
    />
  )
}
