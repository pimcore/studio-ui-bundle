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
import { Space } from '@Pimcore/components/space/space'
import { useInjection } from '@Pimcore/app/depency-injection'
import type { DynamicTypeObjectDataRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-registry'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type AbstractObjectDataDefinition } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-abstract'
import { type AbstractObjectLayoutDefinition } from '@Pimcore/modules/element/dynamic-types/definitions/objects/layout-related/dynamic-type-object-layout-abstract'
import { useFieldWidth } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width'
import { Flex } from '@Pimcore/components/flex/flex'
import { isEmpty } from 'lodash'
import { Text } from '@Pimcore/components/text/text'

export interface ObjectLocalizedFieldsProps extends AbstractObjectDataDefinition {
  children?: Array<AbstractObjectDataDefinition | AbstractObjectLayoutDefinition>
}

export const VersionObjectLocalizedFields = ({ children, className, value }: ObjectLocalizedFieldsProps): React.JSX.Element => {
  const fieldWidth = useFieldWidth()
  const objectDataRegistry = useInjection<DynamicTypeObjectDataRegistry>(serviceIds['DynamicTypes/ObjectDataRegistry'])

  return (
    <Space
      className="w-full"
      direction="vertical"
      size="small"
    >
      {children?.map((child, index) => {
        const objectDataType = objectDataRegistry.getDynamicType(child.fieldtype!)

        const fieldName = child?.name

        return Object.entries(value?.[fieldName] as Record<string, any>).map(([locale, localizedValue]) => {
          const _props = {
            ...child,
            name: fieldName,
            defaultFieldWidth: fieldWidth,
            className,
            title: locale,
            value: localizedValue,
            datatype: 'data' as const
          }

          return (
            <Flex
              gap="mini"
              key={ `${index}-${locale}` }
              vertical
            >
              <Text>
                {child?.title} {!isEmpty(locale) && <Text type="secondary">| {locale?.toUpperCase()}</Text>}
              </Text>
              {objectDataType.getObjectDataComponent(_props)}
            </Flex>
          )
        })
      })}
    </Space>
  )
}
