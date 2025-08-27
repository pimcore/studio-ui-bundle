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
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Text } from '@Pimcore/components/text/text'
import { Flex } from '@Pimcore/components/flex/flex'
import { type IconProps } from '@Pimcore/components/icon/icon'
import { useStyles } from './editable-empty-placeholder.styles'
import cn from 'classnames'

export interface EditableEmptyPlaceholderProps {
  text: string
  buttonText: string
  onClick: () => void
  disabled?: boolean
  icon?: IconProps
  fullHeight?: boolean
}

export const EditableEmptyPlaceholder = ({
  text,
  buttonText,
  onClick,
  disabled = false,
  icon = { value: 'edit' },
  fullHeight = false
}: EditableEmptyPlaceholderProps): React.JSX.Element => {
  const { styles } = useStyles()

  return (
    <Flex
      align="center"
      className={ cn(styles.placeholder, {
        [styles.placeholderFullHeight]: fullHeight
      }) }
      gap="small"
      justify="center"
      onClick={ onClick }
      style={ { cursor: disabled ? 'not-allowed' : 'pointer' } }
      vertical
    >
      <Text className={ styles.placeholderText }>
        {text}
      </Text>
      <IconButton
        disabled={ disabled }
        icon={ icon }
        type="default"
      >
        {buttonText}
      </IconButton>
    </Flex>
  )
}
