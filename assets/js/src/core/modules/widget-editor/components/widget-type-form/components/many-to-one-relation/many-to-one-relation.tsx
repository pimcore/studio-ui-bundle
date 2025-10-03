/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Form } from '@Pimcore/components/form/form'
import { ManyToOneRelation as BaseManyToOneRelation, type ManyToOneRelationProps as BaseManyToOneRelationProps } from '@Pimcore/components/many-to-one-relation/many-to-one-relation'
import { elementTypes } from '@Pimcore/types/enums/element/element-type'
import React, { useEffect } from 'react'
import { useWidgetFormContext } from '../../context/hooks/use-widget-form-context'

export const ManyToOneRelation = (props: BaseManyToOneRelationProps): React.JSX.Element => {
  const { form } = useWidgetFormContext()
  const elementType = Form.useWatch('elementType', form)
  useEffect(() => {
    form.setFieldValue('rootFolder', null)
  }, [elementType, form])

  return (
    <BaseManyToOneRelation
      { ...props }
      allowToClearRelation
      assetsAllowed={ elementType === elementTypes.asset }
      dataObjectsAllowed={ elementType === elementTypes.dataObject }
      documentsAllowed={ elementType === elementTypes.document }
      key={ elementType }
    />
  )
}
