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

import { injectable } from 'inversify'
import { type DynamicTypeAbstract } from '../../../registry/dynamic-type-registry-abstract'
import React, { type ReactNode, type ReactElement } from 'react'
import { type DataComponentProps } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/data-component'
import { type FormItemProps } from 'antd/es/form/FormItem'
import { respectLineBreak } from '@Pimcore/utils/helpers'
import { type FormInstance } from 'antd'
import { type NamePath } from 'rc-field-form/es/interface'
import {
  FieldLabel
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/helpers/label/field-label'
import { type InheritanceOverlayType } from '@Pimcore/components/inheritance-overlay/inheritance-overlay'
import { type IFieldWidthContext } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/field-width/field-width-provider'
import { type IFormattedDataStructureData } from '@Pimcore/modules/data-object/editor/shared-tab-manager/tabs/versions/details-functions'

export interface AbstractObjectDataDefinition extends DataComponentProps {
  mandatory?: boolean | null
  tooltip?: string | null
  inherited?: boolean
  invisible?: boolean | null
  noteditable?: boolean | null
  title?: ReactNode
  defaultFieldWidth: IFieldWidthContext
}

@injectable()
export abstract class DynamicTypeObjectDataAbstract implements DynamicTypeAbstract {
  abstract readonly id: string
  isCollectionType: boolean = false
  inheritedMaskOverlay: InheritanceOverlayType = false

  abstract getObjectDataComponent (props: AbstractObjectDataDefinition): ReactElement<AbstractObjectDataDefinition>

  processVersionFieldData (props: {
    item: any
    fieldBreadcrumbTitle: string
    fieldValueByName: string | object
    versionId: number
    versionCount: number
  }): IFormattedDataStructureData[] {
    const { fieldBreadcrumbTitle, item, fieldValueByName, versionId, versionCount } = props

    return [{ fieldBreadcrumbTitle, fieldData: item, fieldValue: fieldValueByName, versionId, versionCount }]
  }

  getVersionObjectDataComponent (props: AbstractObjectDataDefinition): ReactElement<AbstractObjectDataDefinition> {
    return this.getObjectDataComponent({ ...props, noteditable: true })
  }

  getObjectDataFormItemProps (props: AbstractObjectDataDefinition): FormItemProps {
    return {
      className: 'w-full',
      label: React.createElement(FieldLabel, { label: props.title, name: props.name }),
      required: props.mandatory === true,
      hidden: props.invisible === true,
      tooltip: typeof props.tooltip === 'string' && props.tooltip.length > 0 ? respectLineBreak(props.tooltip, false) : undefined
    }
  }

  handleDefaultValue (props: AbstractObjectDataDefinition, form: FormInstance, fieldName: NamePath): void {
    // This method is intentionally left empty - can be implemented in subclasses
  }
}
