/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { isValidElement, type ReactElement, type ReactNode } from 'react'
import { isUndefined } from 'lodash'
import cn from 'classnames'
import { useStyles } from '../form-item.styles'

interface FieldAddonControlProps {
  fieldAddonControl: React.ElementType
  fieldAddonAfter?: ReactNode
  fieldAddonBelow?: ReactNode
  [controlProp: string]: unknown
}

/**
 * Lays a field control out with the addons of the field: `after` on the same row, wrapping
 * under it when the control leaves no room, and `below` under the control.
 *
 * It stands in for the control as the child of the form item, so everything the form item
 * hands to its child (value, onChange, id, status, disabled, ...) arrives here and is passed
 * on to the control untouched.
 */
const FieldAddonControl = ({ fieldAddonControl: Control, fieldAddonAfter, fieldAddonBelow, ...controlProps }: FieldAddonControlProps): React.JSX.Element => {
  const { styles } = useStyles()
  const control = <Control { ...controlProps } />

  return (
    <div className="pimcore-field-addon">
      { isUndefined(fieldAddonAfter)
        ? control
        : (
          <div className={ cn('pimcore-field-addon__row', styles.addonRow) }>
            { control }

            <div className={ cn('pimcore-field-addon__after', styles.addonEmpty) }>
              { fieldAddonAfter }
            </div>
          </div>
          ) }

      { !isUndefined(fieldAddonBelow) && (
        <div className={ cn('pimcore-field-addon__below', styles.addonBelow, styles.addonEmpty) }>
          { fieldAddonBelow }
        </div>
      ) }
    </div>
  )
}

/**
 * Wraps a field control with its addons, or returns it unchanged when there are none.
 *
 * The wrapper element carries the control's own props next to the addons. Studio's item
 * controls (keyed lists, localized fields) re-render their child from its type and props
 * and read some of them (e.g. `disabled`), so they keep seeing the control's props.
 */
export const withFieldAddons = (control: ReactNode, after: ReactNode | undefined, below: ReactNode | undefined): ReactNode => {
  if ((isUndefined(after) && isUndefined(below)) || !isValidElement(control)) {
    return control
  }

  const element = control as ReactElement<Record<string, unknown>>

  return (
    <FieldAddonControl
      { ...element.props }
      fieldAddonAfter={ after }
      fieldAddonBelow={ below }
      fieldAddonControl={ element.type as React.ElementType }
    />
  )
}
