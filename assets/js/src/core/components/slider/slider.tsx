/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { Slider as OriginalSlider, type SliderSingleProps, Tooltip } from 'antd'
import { formatNumber } from '@Pimcore/utils/number'
import { Box } from '@Pimcore/components/box/box'
import { Flex } from '@Pimcore/components/flex/flex'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { t } from 'i18next'
import { useFieldWidth } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width'

export type SliderValue = number

export type SliderProps = SliderSingleProps & {
  value?: SliderValue | null
  onChange?: (value: SliderValue | null) => void
  showValue?: boolean
  allowClear?: boolean
}

export const Slider = (props: SliderProps): React.JSX.Element => {
  const value = props.value ?? null
  const fieldWidths = useFieldWidth()

  const handleChange = (value: SliderValue): void => {
    if (props.onChange !== undefined) {
      props.onChange(value)
    }
  }

  // Apply large width as default for sliders (since they typically need more space)
  const computedStyle = {
    maxWidth: fieldWidths.large,
    ...props.style
  }

  return (
    <div 
      className={ props.className }
      style={ computedStyle }
    >
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
          onChange={ handleChange }
          value={ value ?? undefined }
        />

        {props.allowClear === true && value !== null && props.disabled !== true && (
        <Box padding={ { x: 'mini' } }>
          <Tooltip title={ t('set-to-null') }>
            <IconButton
              icon={ { value: 'trash' } }
              onClick={ () => { props.onChange?.(null) } }
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
