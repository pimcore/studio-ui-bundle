/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect } from 'react'
import { LocalizedFieldsProvider } from './provider/localized-fields-provider/localized-fields-provider'
import { type AbstractObjectDataDefinition } from '../../dynamic-type-object-data-abstract'
import { type AbstractObjectLayoutDefinition } from '../../../layout-related/dynamic-type-object-layout-abstract'
import { ObjectComponent } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/object-component'
import { Space } from '@Pimcore/components/space/space'
import { useLanguageSelection } from '@Pimcore/modules/data-object/editor/toolbar/language-selection/provider/use-language-selection'
import { Form } from '@Pimcore/components/form/form'
import { CombinedFieldNameProvider } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/combined-field-name-provider/combined-field-name-provider'

export interface LocalizedFieldsProps extends AbstractObjectDataDefinition {
  children?: AbstractObjectDataDefinition | AbstractObjectLayoutDefinition
}

export const LocalizedFields = ({ children, noteditable, className }: LocalizedFieldsProps): React.JSX.Element => {
  const { currentLanguage, hasLocalizedFields, setHasLocalizedFields } = useLanguageSelection()

  useEffect(() => {
    if (!hasLocalizedFields) setHasLocalizedFields(true)
  }, [])

  return (
    <LocalizedFieldsProvider locales={ [currentLanguage] }>
      <CombinedFieldNameProvider combinedFieldNameParent={ ['localizedfields'] }>
        <Form.Group name={ 'localizedfields' } >
          <Space
            className="w-full"
            direction='vertical'
            size='small'
          >
            {children?.map((child, index) => (
              <ObjectComponent
                key={ index }
                { ...child }
                className={ className }
                noteditable={ noteditable }
              />
            ))}
          </Space>
        </Form.Group>
      </CombinedFieldNameProvider>
    </LocalizedFieldsProvider>
  )
}

export * from './provider/localized-fields-provider/localized-fields-provider'
export * from './provider/localized-fields-provider/use-localized-fields'
