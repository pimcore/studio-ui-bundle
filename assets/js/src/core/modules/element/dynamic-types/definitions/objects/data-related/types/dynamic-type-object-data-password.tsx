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

import { type AbstractObjectDataDefinition, DynamicTypeObjectDataAbstract, type EditMode, type GetGridCellDefinitionProps } from '../dynamic-type-object-data-abstract'
import { InputPassword } from '@Pimcore/components/input-password/input-password'
import { toCssDimension } from '@Pimcore/utils/css'
import { type FormInstance } from 'antd'
import { type NamePath } from 'antd/es/form/interface'
import { GridCellPreviewWrapper } from '../../grid-cell-preview/grid-cell-cell-preview-wrapper/grid-cell-preview-wrapper'

export type PasswordObjectDataDefinition = AbstractObjectDataDefinition & {
  minimumLength: number | null
  width?: number | string | null
}

const PASSWORD_PLACEHOLDER = '********'

export class DynamicTypeObjectDataPassword extends DynamicTypeObjectDataAbstract {
  id: string = 'password'
  gridCellEditMode: EditMode = 'edit-modal'

  getObjectDataComponent (props: PasswordObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    return (
      <InputPassword
        autoComplete="new-password"
        className={ props.className }
        disabled={ props.noteditable === true }
        inherited={ props.inherited }
        minLength={ props.minimumLength ?? undefined }
        style={ { maxWidth: toCssDimension(props.width, props.defaultFieldWidth.medium) } }
        value={ PASSWORD_PLACEHOLDER }
        visibilityToggle={ false }
      />
    )
  }

  handleDefaultValue (props: PasswordObjectDataDefinition, form: FormInstance, fieldName: NamePath): void {
    form.setFieldValue(fieldName, PASSWORD_PLACEHOLDER)
  }

  getGridCellPreviewComponent (props: GetGridCellDefinitionProps): React.ReactElement {
    return <GridCellPreviewWrapper>{PASSWORD_PLACEHOLDER}</GridCellPreviewWrapper>
  }

  getGridCellEditComponent (props: GetGridCellDefinitionProps): ReactElement {
    const objectProps: PasswordObjectDataDefinition = {
      ...props.objectProps as PasswordObjectDataDefinition,
      value: PASSWORD_PLACEHOLDER
    }
    return this.getObjectDataComponent(objectProps)
  }
}
