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
import { isNonEmptyString } from '@sdk/utils'
import { useTranslation } from 'react-i18next'

export interface FieldContainerProps extends AbstractObjectLayoutDefinition {
  collapsible?: boolean
  collapsed?: boolean
  layout?: 'vbox' | 'hbox'
  fieldLabel?: string
}

export const FieldContainer = ({ children, collapsible, collapsed, noteditable, layout = 'hbox', fieldLabel }: FieldContainerProps): React.JSX.Element => {
  const { t } = useTranslation()
  const vertical = layout === 'vbox'

  const content = (
    <SuppressEmptyFieldLabelProvider>
      <Flex
        className='w-full'
        gap={ { x: 'extra-small', y: 0 } }
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
                noteditable={ noteditable }
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
