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

import React, { forwardRef, type MutableRefObject, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Input } from '@Pimcore/components/input/input'
import {
  type ManyToOneRelationValueType
} from './many-to-one-relation'
import { useDroppable } from '@Pimcore/components/drag-and-drop/hooks/use-droppable'
import cn from 'classnames'

export interface PathTargetProps {
  value: ManyToOneRelationValueType
  disabled?: boolean
  allowPathTextInput?: boolean
  onChange?: (value: ManyToOneRelationValueType) => void
  inherited?: boolean
}

export const PathTarget = forwardRef(function PathTarget (
  props: PathTargetProps,
  ref: MutableRefObject<HTMLDivElement>
): React.JSX.Element {
  const { t } = useTranslation()
  const [value, setValue] = React.useState<ManyToOneRelationValueType>(props.value ?? null)
  const { getStateClasses } = useDroppable()

  useEffect(() => {
    setValue(props.value ?? null)
  }, [props.value])

  const getDisplayText: () => string | undefined = () => {
    if (value === null) {
      return undefined
    }

    if (value.textInput === true) {
      return value.fullPath ?? ''
    }

    return value.fullPath ?? String(value.id)
  }

  const displayText = getDisplayText()

  return (
    <div
      ref={ ref }

      style={ { flexGrow: 1 } }
    >
      <Input
        className={ cn(...getStateClasses()) }
        disabled={ props.disabled }
        inherited={ props.inherited }
        onChange={ (e) => {
          const newValue: { textInput: true, fullPath: string } = {
            textInput: true,
            fullPath: e.currentTarget.value
          }

          setValue(newValue)
          props.onChange?.(newValue)
        } }
        placeholder={ t(props.allowPathTextInput === true ? 'many-to-one-relation.drop-placeholder-text-input' : 'many-to-one-relation.drop-placeholder') }
        readOnly={ props.allowPathTextInput !== true }
        value={ displayText }
      />
    </div>
  )
})
