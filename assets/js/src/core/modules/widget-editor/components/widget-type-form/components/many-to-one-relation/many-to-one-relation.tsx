import { ManyToOneRelation as BaseManyToOneRelation, ManyToOneRelationProps as BaseManyToOneRelationProps } from '@Pimcore/components/many-to-one-relation/many-to-one-relation'
import { elementTypes } from '@Pimcore/types/enums/element/element-type'
import React from 'react'

interface ManyToOneRelationProps extends Pick<BaseManyToOneRelationProps, 'onChange' | 'value'> {
  elementType?: string
}

export const ManyToOneRelation = ({ elementType, ...props }: ManyToOneRelationProps): React.JSX.Element => {
  return <BaseManyToOneRelation
    {...props}
    key={elementType}
    allowToClearRelation
    dataObjectsAllowed={elementType === elementTypes.dataObject}
    assetsAllowed={elementType === elementTypes.asset}
    documentsAllowed={elementType === elementTypes.document}
  />
}