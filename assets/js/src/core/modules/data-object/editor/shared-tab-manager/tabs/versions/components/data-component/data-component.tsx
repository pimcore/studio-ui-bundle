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
import { useInjection } from '@Pimcore/app/depency-injection'
import { type DynamicTypeObjectDataRegistry } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/dynamic-type-object-data-registry'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { Alert } from 'antd'
import { Text } from '@Pimcore/components/text/text'
import ErrorBoundary from '@Pimcore/modules/app/error-boundary/error-boundary'
import { type ObjectComponentProps } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/object-component'
import { useFieldWidth } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/field-width/use-field-width'
import { DynamicTypesList } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/constants/typesList'
import { useStyles } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/components/versions-fields-list/styles/common-versions-fields-view.styles'
import { isUndefined } from 'lodash'

export interface DataComponentProps extends ObjectComponentProps {
  datatype: 'data'
  fieldType?: string
  fieldtype?: string
  [p: string]: any
}

export const DataComponent = (props: DataComponentProps): React.JSX.Element => {
  const { fieldType, fieldtype } = props

  const objectDataRegistry = useInjection<DynamicTypeObjectDataRegistry>(serviceIds['DynamicTypes/ObjectDataRegistry'])
  const fieldWidth = useFieldWidth()
  const { styles } = useStyles()

  const currentFieldType = fieldType ?? fieldtype ?? 'unknown'

  if (!objectDataRegistry.hasDynamicType(currentFieldType)) {
    return (
      <Alert
        message={ `Unknown data type: ${currentFieldType}` }
        type="warning"
      />
    )
  }

  let updatedProps = props

  // need to refactor it
  if (currentFieldType === DynamicTypesList.LOCALIZED_FIELDS) {
    const children: object[] = []
    const filteredChildren = props?.children?.filter(child => props?.modifiedList?.includes(child?.name))

    filteredChildren?.forEach(child => {
      props?.listModifiedFields?.forEach(item => {
        if (item?.key === child?.name) {
          item?.localesList?.forEach(locale => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            children.push({
              ...child,
              className: props?.listModifiedFields?.includes(child?.name) === false ? 'test-test-test' : undefined,
              title: (
                <span className={ styles.fieldTitle }>
                  {child?.title} <Text type='secondary'>| {locale?.toUpperCase()}</Text>
                </span>
              ),
              value: !isUndefined(props?.value) ? (props?.value[child?.name])?.[locale] : null
            })
          })
        }
      })

      return null
    })

    updatedProps = {
      ...props,
      children
    }
  }

  const objectDataType = objectDataRegistry.getDynamicType(currentFieldType)

  return (
    <ErrorBoundary>
      {objectDataType.getVersionObjectDataComponent({ ...updatedProps, defaultFieldWidth: fieldWidth })}
    </ErrorBoundary>
  )
}
