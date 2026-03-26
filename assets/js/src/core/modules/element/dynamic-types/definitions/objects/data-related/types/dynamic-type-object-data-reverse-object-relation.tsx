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
import {
  type AbstractObjectDataDefinition, DynamicTypeObjectDataAbstract,
  type EditModalSettings,
  type EditMode,
  type GetGridCellDefinitionProps
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-abstract'
import type { FormItemProps } from 'antd/es/form/FormItem'
import {
  ManyToManyRelationLabel
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/relations/components/label/label'
import {
  ReverseObjectRelation,
  type ReverseObjectRelationClassDefinitionProps
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/reverse-object-relation/reverse-object-relation'
import { type ManyToManyRelationValue } from '../components/many-to-many-relation/hooks/use-value'
import { RelationList } from '../../grid-cell-preview/relation-list/relation-list'
import { type DynamicTypeFieldFilterAbstract } from '../../../field-filters/dynamic-type-field-filter-abstract'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'

export type ReverseObjectRelationObjectDataDefinition = AbstractObjectDataDefinition & ReverseObjectRelationClassDefinitionProps

export class DynamicTypeObjectDataReverseObjectRelation extends DynamicTypeObjectDataAbstract {
  id: string = 'reverseObjectRelation'
  dynamicTypeFieldFilterType: DynamicTypeFieldFilterAbstract = container.get(serviceIds['DynamicTypes/FieldFilter/Relation'])
  isAllowedInBatchEdit: boolean = false
  gridCellEditMode: EditMode = 'edit-modal'
  gridCellEditModalSettings: EditModalSettings = {
    modalSize: 'XL',
    formLayout: 'vertical'
  }

  getObjectDataComponent (props: ReverseObjectRelationObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    return (
      <ReverseObjectRelation
        { ...props }
        className={ props.className }
        disabled={ props.noteditable === true }
      />
    )
  }

  getObjectDataFormItemProps (props: ReverseObjectRelationObjectDataDefinition): FormItemProps {
    return {
      ...super.getObjectDataFormItemProps(props),
      label: <ManyToManyRelationLabel

        disabled={ props.noteditable === true }
        label={ props.title }
        name={ props.name }
             />
    }
  }

  getGridCellPreviewComponent (props: GetGridCellDefinitionProps): React.ReactElement {
    const value: ManyToManyRelationValue | null = props.cellProps.getValue()

    return <RelationList relations={ value } />
  }

  getDefaultGridColumnWidth (): number | undefined {
    return 350
  }
}
