import { Form } from '@Pimcore/components/form/form'
import { ManyToOneRelation as BaseManyToOneRelation, ManyToOneRelationProps as BaseManyToOneRelationProps } from '@Pimcore/components/many-to-one-relation/many-to-one-relation'
import { elementTypes } from '@Pimcore/types/enums/element/element-type'
import React, { useEffect } from 'react'
import { useWidgetFormContext } from '../../context/hooks/use-widget-form-context'

export const ManyToOneRelation = (props: BaseManyToOneRelationProps): React.JSX.Element => {
  const { form } = useWidgetFormContext()
  const elementType = Form.useWatch('elementType', form)
  useEffect(() => {
    form.setFieldValue('rootFolder', null)
  }, [elementType, form])

  return <BaseManyToOneRelation
    {...props}
    key={elementType}
    allowToClearRelation
    dataObjectsAllowed={elementType === elementTypes.dataObject}
    assetsAllowed={elementType === elementTypes.asset}
    documentsAllowed={elementType === elementTypes.document}
  />
}