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

import React, { useContext, useEffect, useState } from 'react'
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
}

export const Checkbox = (props: CheckboxProps): React.JSX.Element => {
  const [value, setValue] = useState<boolean | null>(props.value ?? null)
  const { id } = useContext(DataObjectContext)
  const { dataObject } = useDataObjectDraft(id)

  const { t } = useTranslation()
  const { styles } = useStyles()

  useEffect(() => {
    if (props.onChange !== undefined) {
      props.onChange(value)
    }
  }, [value])

  const onChange = (e): void => {
    const newValue = Boolean(e.nativeEvent.target.checked)
    setValue(newValue ?? null)
    props.onChange?.(newValue)
  }

  const showClearButton = value !== null && dataObject?.allowInheritance === true && props.disabled !== true

  return (
    <Flex
      className={ cn(styles.checkbox, props.className) }
      gap="extra-small"
    >
      <DefaultCheckbox
        { ...props }
        checked={ value ?? false }
        onChange={ onChange }
      />
      { showClearButton && (
        <Tooltip title={ t('set-to-null') }>
          <IconButton
            icon={ { value: 'trash' } }
            onClick={ () => { setValue(null) } }
          />
        </Tooltip>
      )}
    </Flex>
  )
}
