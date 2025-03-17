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
import { get, isEmpty, isNull } from 'lodash'
import { type AbstractObjectDataDefinition } from '../../../dynamic-type-object-data-abstract'
import { type AbstractObjectLayoutDefinition } from '../../../../layout-related/dynamic-type-object-layout-abstract'
import { DataComponent } from '@Pimcore/modules/data-object/editor/shared-tab-manager/tabs/versions/components/data-component/data-component'
import { Text } from '@Pimcore/components/text/text'
import { Flex } from '@Pimcore/components/flex/flex'
import { useStyles } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/components/versions-fields-list/styles/common-versions-fields-view.styles'

export interface LocalizedFieldsProps extends AbstractObjectDataDefinition {
  children?: AbstractObjectDataDefinition | AbstractObjectLayoutDefinition
}

export const VersionLocalizedFields = ({ children, noteditable, className, ...props }: LocalizedFieldsProps): React.JSX.Element => {
  const { styles } = useStyles()

  const renderFieldTitle = ({ key, locale }: { key: string, locale: string }): React.JSX.Element => {
    return (
      <Text className={ styles.fieldTitle }>
        {key} {!isEmpty(locale) && <Text type="secondary">| {locale.toUpperCase()}</Text>}
      </Text>
    )
  }

  return (
    <Flex
      gap="small"
      vertical
    >
      {children?.map((child, index) => {
        const fieldValue: object = get(props.value, child.name)

        return Object.entries(fieldValue).map(([key, value]) => {
          if (isNull(value)) return <></>

          return (
            <div key={ `${index}-${key}` }>
              {renderFieldTitle({ key: child.title, locale: key })}
              <DataComponent
                { ...child }
                className={ className }
                noteditable={ noteditable }
                value={ value }
              />
            </div>
          )
        })
      })}</Flex>
  )
}
