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

import React, { type ReactElement } from 'react'
import { DynamicTypeObjectDataAbstract, type GetGridCellDefinitionProps, type EditModalSettings, type EditMode } from '../dynamic-type-object-data-abstract'
import { FieldCollection, type FieldCollectionProps } from '../components/field-collection/field-collection'
import { ItemsCount } from '../../grid-cell-preview/items-count/items-count'
import {
  VersionFieldCollection,
  type VersionFieldCollectionProps
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/field-collection/versions/version-field-collection'
import { type FormItemProps } from 'antd'

export class DynamicTypeObjectDataFieldCollection extends DynamicTypeObjectDataAbstract {
  id: string = 'fieldcollections'
  isCollectionType: boolean = false
  gridCellEditMode: EditMode = 'edit-modal'
  gridCellEditModalSettings: EditModalSettings = {
    modalSize: 'XL',
    formLayout: 'vertical'
  }

  getObjectDataComponent (props: FieldCollectionProps): React.ReactElement<FieldCollectionProps> {
    return <FieldCollection { ...props } />
  }

  getVersionObjectDataComponent (props: VersionFieldCollectionProps): React.ReactElement<FieldCollectionProps> {
    return <VersionFieldCollection { ...props } />
  }

  getObjectDataFormItemProps (props: FieldCollectionProps): FormItemProps {
    return {
      ...super.getObjectDataFormItemProps(props),
      label: null
    }
  }

  getGridCellEditComponent (props: GetGridCellDefinitionProps): ReactElement {
    return this.getObjectDataComponent(props.objectProps as unknown as FieldCollectionProps)
  }

  getGridCellPreviewComponent (props: GetGridCellDefinitionProps): React.ReactElement {
    const value: [] | null = props.cellProps.getValue()

    return (
      <ItemsCount count={ value?.length ?? 0 } />
    )
  }
}
