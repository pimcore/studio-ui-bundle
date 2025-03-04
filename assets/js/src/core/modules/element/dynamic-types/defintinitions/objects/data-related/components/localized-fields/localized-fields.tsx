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

import React from 'react'
import { LocalizedFieldsProvider } from './provider/localized-fields-provider/localized-fields-provider'
import { type AbstractObjectDataDefinition } from '../../dynamic-type-object-data-abstract'
import { type AbstractObjectLayoutDefinition } from '../../../layout-related/dynamic-type-object-layout-abstract'
import { ObjectComponent } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/object-component'
import { Space } from '@Pimcore/components/space/space'
import { useLanguageSelection } from '@Pimcore/modules/data-object/editor/toolbar/language-selection/provider/use-language-selection'
import { Form } from '@Pimcore/components/form/form'

export interface LocalizedFieldsProps extends AbstractObjectDataDefinition {
  children?: AbstractObjectDataDefinition | AbstractObjectLayoutDefinition
}

export const LocalizedFields = ({ children }: LocalizedFieldsProps): React.JSX.Element => {
  const { currentLanguage } = useLanguageSelection()

  return (
    <LocalizedFieldsProvider locales={ [currentLanguage] }>
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
            />
          ))}
        </Space>
      </Form.Group>
    </LocalizedFieldsProvider>
  )
}
