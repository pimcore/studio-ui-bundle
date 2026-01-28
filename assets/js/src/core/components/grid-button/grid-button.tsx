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
import { Button, type ButtonProps } from '@Pimcore/components/button/button'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { Icon, type IconProps } from '@Pimcore/components/icon/icon'
import { useStyles } from './grid-button.styles'
import cn from 'classnames'

export interface GridButtonProps extends Omit<ButtonProps, 'children' | 'type' | 'icon' | 'iconPosition' | 'block' | 'size' | 'shape' | 'danger' | 'color'> {
  icon: Pick<IconProps, 'type' | 'value' | 'colorToken'>
  label: string
  iconOptions?: IconProps['options']
}

export const GridButton = ({
  icon,
  label,
  iconOptions = { width: 24, height: 24 },
  className,
  ...buttonProps
}: GridButtonProps): React.JSX.Element => {
  const { styles } = useStyles()

  return (
    <Button
      className={ cn(styles.button, className) }
      type="default"
      { ...buttonProps }
    >
      <Flex
        align="center"
        justify="center"
        vertical
      >
        <Icon
          className={ styles.icon }
          colorToken={ icon.colorToken }
          options={ iconOptions }
          type={ icon.type }
          value={ icon.value }
        />
        <Text className={ styles.label }>
          {label}
        </Text>
      </Flex>
    </Button>
  )
}
