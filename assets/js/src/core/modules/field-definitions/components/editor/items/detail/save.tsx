/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useArea } from '@Pimcore/modules/field-definitions/components/editor/area-provider'
import { useGeneralSettings } from '@Pimcore/modules/field-definitions/components/editor/items/detail/general-settings-provider'
import { useSettings } from '@Pimcore/modules/field-definitions/components/editor/settings-provider'
import { type DynamicTypeFieldDefinitionRegistry } from '@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-registry'
import { type FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { serviceIds, useInjection } from '@sdk/app'
import { Button, type ButtonProps, useMessage } from '@sdk/components'
import { ApiError, trackError } from '@sdk/modules/app'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const DetailSave = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { useDetailUpdateMutation, useLayout } = useSettings()
  const { fieldDefinitions, setInvalidFieldDefinitionIds } = useLayout()
  const { generalSettings } = useGeneralSettings()
  const [updateDetailMutation, result] = useDetailUpdateMutation()
  const { isLoading } = result
  const messageApi = useMessage()
  const fieldDefinitionRegistry = useInjection<DynamicTypeFieldDefinitionRegistry>(serviceIds['DynamicTypes/FieldDefinitionRegistry'])
  const { area } = useArea()

  const onClick: ButtonProps['onClick'] = () => {
    if (generalSettings === undefined) {
      return
    }

    const invalidDefinitions: string[] = []

    // Validate all field definitions before saving
    for (const [key, definition] of Object.entries(fieldDefinitions)) {
      if (fieldDefinitionRegistry.hasDynamicType(definition.fieldtype)) {
        const hasDynamicType = fieldDefinitionRegistry.hasDynamicType(definition.fieldtype)

        if (hasDynamicType) {
          const dynamicType = fieldDefinitionRegistry.getDynamicType(definition.fieldtype)
          // @todo check if we can handle the path here
          const isValid = dynamicType.isValid(definition, { area, fieldDefinitions, path: [] })

          if (!isValid) {
            invalidDefinitions.push(key)
          }
        }
      }
    }

    setInvalidFieldDefinitionIds(invalidDefinitions)

    if (invalidDefinitions.length > 0) {
      /* eslint-disable-next-line @typescript-eslint/no-floating-promises */
      messageApi.error(t('field-definitions.configuration-invalid'))
      return
    }

    updateDetailMutation({}).unwrap()
      .then(() => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        messageApi.success(t('field-definitions.saved-successfully'))
      })
      .catch((e) => {
        trackError(new ApiError(e as FetchBaseQueryError))
      })
  }

  return (
    <Button
      disabled={ isLoading || generalSettings === undefined }
      loading={ isLoading }
      onClick={ onClick }
      type="primary"
    >
      {t('save')}
    </Button>
  )
}
