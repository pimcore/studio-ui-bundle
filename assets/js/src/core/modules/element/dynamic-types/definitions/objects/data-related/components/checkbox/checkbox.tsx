/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useContext } from 'react'
import { Tooltip } from 'antd'
import cn from 'classnames'
import { useDataObjectDraft } from '@Pimcore/modules/data-object/hooks/use-data-object-draft'
import { DataObjectContext } from '@Pimcore/modules/data-object/data-object-provider'
import { Flex } from '@Pimcore/components/flex/flex'
import { Checkbox as DefaultCheckbox, type ICheckboxProps } from '@Pimcore/components/checkbox/checkbox'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { useTranslation } from 'react-i18next'
import { useStyles } from './checkbox.styles'

export interface CheckboxProps extends Omit<ICheckboxProps, 'value' | 'onChange'> {
  value?: boolean | null
  onChange?: (value?: boolean | null) => void
  disableClearButton?: boolean
}

export const Checkbox = (props: CheckboxProps): React.JSX.Element => {
  const checkboxValue = props.value ?? null
  const { id } = useContext(DataObjectContext)
  const { dataObject } = useDataObjectDraft(id)

  const { t } = useTranslation()
  const { styles } = useStyles()

  const handleChange = (e): void => {
    const newValue = Boolean(e.nativeEvent.target.checked)

    props.onChange?.(newValue ?? null)
  }

  const clearValue = (): void => {
    props.onChange?.(null)
  }

  const showClearButton = props.disableClearButton !== true && checkboxValue !== null && dataObject?.allowInheritance === true && props.disabled !== true

  return (
    <Flex
      className={ cn(styles.checkbox, props.className) }
      gap="extra-small"
    >
      <DefaultCheckbox
        { ...props }
        checked={ checkboxValue ?? false }
        onChange={ handleChange }
      />
      { showClearButton && (
        <Tooltip title={ t('set-to-null') }>
          <IconButton
            icon={ { value: 'trash' } }
            onClick={ clearValue }
          />
        </Tooltip>
      )}
    </Flex>
  )
}
