/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useClassDefinitionDetail } from '@Pimcore/modules/class-definition/components/detail/class-definition-detail-provider'
import { StructureNode, useClassDefinitionLayout } from '@Pimcore/modules/class-definition/components/detail/class-definition-layout-provider'
import { DynamicTypeFieldDefinitionRegistry } from '@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-registry'
import { type FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { useClassDefinitionUpdateMutation } from '@sdk/api/class-definition'
import { serviceIds, useInjection } from '@sdk/app'
import { Button, type ButtonProps, useMessage } from '@sdk/components'
import { ApiError, trackError } from '@sdk/modules/app'
import React, { useEffect } from 'react'

export const ClassDefinitionDetailSave = (): React.JSX.Element => {
  // @todo translations
  const { getLayout, fieldDefinitions, setInvalidFieldDefinitionIds } = useClassDefinitionLayout()
  const { classDefinition } = useClassDefinitionDetail()
  const [updateClassDefinitionMutation, { isLoading, error }] = useClassDefinitionUpdateMutation()
  const messageApi = useMessage()
  const fieldDefinitionRegistry = useInjection<DynamicTypeFieldDefinitionRegistry>(serviceIds['DynamicTypes/FieldDefinitionRegistry']);

  useEffect(() => {
    if (error !== undefined) {
      trackError(new ApiError(error))
    }
  }, [error])

  const onClick: ButtonProps['onClick'] = () => {
    if (classDefinition === undefined) {
      return
    }

    const invalidDefinitions: string[] = [];

    // Validate all field definitions before saving
    for (const [key, definition] of Object.entries(fieldDefinitions)) {
      if (fieldDefinitionRegistry.hasDynamicType(definition.fieldtype)) {
        const hasDynamicType = fieldDefinitionRegistry.getDynamicType(definition.fieldtype);
        
        if (hasDynamicType) {
          const dynamicType = fieldDefinitionRegistry.getDynamicType(definition.fieldtype);
          // @todo check if we can handle the path here
          const isValid = dynamicType.isValid(definition, { area: ['class'], fieldDefinitions: fieldDefinitions, path: [] });

          if (!isValid) {
            invalidDefinitions.push(key);
          }
        }
      }
    }

    setInvalidFieldDefinitionIds(invalidDefinitions);

    if (invalidDefinitions.length > 0) {
      messageApi.error('Configuration contains invalid field definitions.');
      return;
    }

    updateClassDefinitionMutation({
      id: classDefinition.id,
      classDefinitionUpdate: {
        values: {
          ...classDefinition,
          // @todo check how to handle new icon types with backend
          icon: ''
        },
        configuration: {
          children: getLayout().children
        }
      }
    }).then(() => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      messageApi.success('Class definition saved successfully.')
    }).catch((e) => {
      trackError(new ApiError(e as FetchBaseQueryError))
    })
  }

  return (
    <Button
      disabled={ isLoading || classDefinition === undefined }
      loading={ isLoading }
      onClick={ onClick }
      type="primary"
    >
      Save
    </Button>
  )
}
