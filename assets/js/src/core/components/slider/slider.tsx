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

import React, { useState } from 'react'
import { Slider as OriginalSlider, type SliderSingleProps, Tooltip } from 'antd'
import { formatNumber } from '@Pimcore/utils/number'
import { Box } from '@Pimcore/components/box/box'
import { Flex } from '@Pimcore/components/flex/flex'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { t } from 'i18next'

export type SliderValue = number

export type SliderProps = SliderSingleProps & {
  value?: SliderValue | null
  onChange?: (value: SliderValue | null) => void
  showValue?: boolean
  allowClear?: boolean
}

export const Slider = (props: SliderProps): React.JSX.Element => {
  const [value, setValue] = useState<SliderValue | null>(props.value ?? null)

  const onChange = (value: SliderValue): void => {
    setValue(value)
    if (props.onChange !== undefined) {
      props.onChange(value)
    }
  }

  return (
    <div className={ props.className }>
      {props.showValue === true && (
        <Box padding={ { x: 'mini' } }>
          <div>({value === null || value === undefined ? t('no-value-set') : formatNumber({ value })})</div>
        </Box>
      )}
      <Flex
        align={ props.vertical === true ? 'left' : 'center' }
        className="w-full"
        vertical={ props.vertical }
      >
        <OriginalSlider
          { ...props }
          className={ 'w-full' }
          onChange={ onChange }
          value={ value ?? undefined }
        />

        {props.allowClear === true && value !== null && props.disabled !== true && (
        <Box padding={ { x: 'mini' } }>
          <Tooltip title={ t('set-to-null') }>
            <IconButton
              icon={ { value: 'trash' } }
              onClick={ () => { setValue(null) } }
              type={ 'default' }
              variant={ 'static' }
            />
          </Tooltip>
        </Box>
        )}
      </Flex>
    </div>
  )
}
