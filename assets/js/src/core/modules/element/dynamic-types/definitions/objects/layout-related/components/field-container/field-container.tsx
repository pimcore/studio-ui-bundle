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
import { type AbstractObjectLayoutDefinition } from '../../dynamic-type-object-layout-abstract'
import { Flex } from '@Pimcore/components/flex/flex'
import { Form } from '@Pimcore/components/form/form'
import { ObjectComponent } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/object-component'
import { SuppressEmptyFieldLabelProvider } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/label/suppress-empty-field-label-provider'
import { isNonEmptyString, toCssDimension } from '@sdk/utils'
import { useTranslation } from 'react-i18next'

export interface FieldContainerProps extends AbstractObjectLayoutDefinition {
  collapsible?: boolean
  collapsed?: boolean
  layout?: 'vbox' | 'hbox'
  fieldLabel?: string
  width?: number | string | null
  height?: number | string | null
}

export const FieldContainer = ({ children, collapsible, collapsed, noteditable, layout = 'hbox', fieldLabel, width, height }: FieldContainerProps): React.JSX.Element => {
  const { t } = useTranslation()
  const vertical = layout === 'vbox'

  // `Layout::$width` and `$height` default to 0 and toCssDimension() maps
  // 0/''/null to undefined, so an unconfigured container keeps rendering full
  // width as before.
  const cssWidth = toCssDimension(width)
  const cssHeight = toCssDimension(height)

  const content = (
    <SuppressEmptyFieldLabelProvider>
      <Flex
        className={ isNonEmptyString(cssWidth) ? undefined : 'w-full' }
        gap={ { x: 'extra-small', y: 0 } }
        style={ { height: cssHeight, width: cssWidth } }
        vertical={ vertical }
      >
        {children.map((child, index) => {
          return (
            <Flex
              flex={ 1 }
              key={ index }
            >
              <ObjectComponent
                { ...child }
                noteditable={ noteditable === true || child.noteditable }
              />
            </Flex>
          )
        })}
      </Flex>
    </SuppressEmptyFieldLabelProvider>
  )

  if (!isNonEmptyString(fieldLabel)) {
    return content
  }

  return (
    <Form.Item label={ t(fieldLabel) }>
      {content}
    </Form.Item>
  )
}
