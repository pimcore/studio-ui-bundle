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
import { useClassDefinitionLayout } from '@Pimcore/modules/class-definition/components/detail/class-definition-layout-provider'
import { type FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { useClassDefinitionUpdateMutation } from '@sdk/api/class-definition'
import { Button, type ButtonProps, useMessage } from '@sdk/components'
import { ApiError, trackError } from '@sdk/modules/app'
import React, { useEffect } from 'react'

export const ClassDefinitionDetailSave = (): React.JSX.Element => {
  const { getLayout } = useClassDefinitionLayout()
  const { classDefinition } = useClassDefinitionDetail()
  const [updateClassDefinitionMutation, { isLoading, error }] = useClassDefinitionUpdateMutation()
  const messageApi = useMessage()

  useEffect(() => {
    if (error !== undefined) {
      trackError(new ApiError(error))
    }
  }, [error])

  const onClick: ButtonProps['onClick'] = () => {
    if (classDefinition === undefined) {
      return
    }

    updateClassDefinitionMutation({
      id: classDefinition.id,
      classDefinitionUpdate: {
        values: {
          ...classDefinition,
          // @todo check how to handle new icon types
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
