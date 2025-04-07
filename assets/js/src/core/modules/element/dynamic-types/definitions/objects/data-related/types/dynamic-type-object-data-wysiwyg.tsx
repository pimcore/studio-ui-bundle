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

import React from 'react'
import {
  type AbstractObjectDataDefinition, DynamicTypeObjectDataAbstract,
  type EditModalSettings,
  type EditMode,
  type GetGridCellDefinitionProps
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-abstract'

import type { InheritanceOverlayType } from '@Pimcore/components/inheritance-overlay/inheritance-overlay'
import Wysiwyg from '@Pimcore/modules/wysiwyg/wysiwyg'
import { appConfig } from '@Pimcore/app/config/app-config'
import { isEmpty, isNil, isObject, merge } from 'lodash'
import { toCssDimension } from '@Pimcore/utils/css'
import { type FormItemProps } from 'antd'
import { FieldLabel } from '../helpers/label/field-label'
import { Icon } from '@Pimcore/components/icon/icon'
import { GridCellPreviewWrapper } from '../../grid-cell-preview/grid-cell-cell-preview-wrapper/grid-cell-preview-wrapper'
import { SanitizeHtml } from '@Pimcore/components/sanitize-html/sanitize-html'

export type WysiwygObjectDataDefinition = AbstractObjectDataDefinition & {
  value?: string | null
  onChange?: (value: string | null) => void
  width: string | number | null
  height: string | number | null
  maxCharacters?: number | null
  toolbarConfig?: string | null
}
export class DynamicTypeObjectDataWysiwyg extends DynamicTypeObjectDataAbstract {
  id: string = 'wysiwyg'
  inheritedMaskOverlay: InheritanceOverlayType = 'form-element'
  gridCellEditMode: EditMode = 'edit-modal'
  gridCellEditModalSettings: EditModalSettings = {
    modalSize: 'XL',
    formLayout: 'vertical'
  }

  getObjectDataComponent (props: WysiwygObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    const parseConfig = (config?: string | null): Record<string, any> => {
      if (isNil(config) || isEmpty(config)) {
        return {}
      }

      try {
        const result = JSON.parse(config)
        return isObject(result) ? result : {}
      } catch (e) {
        console.error('Error while parsing toolbar config', e)
        return {}
      }
    }

    const editorConfig = merge(
      {},
      appConfig.wysiwyg.defaultEditorConfig.dataObject,
      parseConfig(props.toolbarConfig)
    )

    return (
      <Wysiwyg
        { ...props }
        disabled={ props.noteditable === true }
        editorConfig={ editorConfig }
        height={ props.height ?? undefined }
        maxCharacters={ props.maxCharacters ?? undefined }
        width={ toCssDimension(props.width, props.defaultFieldWidth.large) }
      />
    )
  }

  getGridCellPreviewComponent (props: GetGridCellDefinitionProps): React.ReactElement {
    const value = props.cellProps.getValue()

    if (isNil(value)) {
      return <></>
    }

    return <GridCellPreviewWrapper><SanitizeHtml html={ value } /></GridCellPreviewWrapper>
  }

  getObjectDataFormItemProps (props: AbstractObjectDataDefinition): FormItemProps {
    return {
      ...super.getObjectDataFormItemProps(props),
      label: <FieldLabel
        additionalIcons={ <Icon value="drop-target" /> }
        label={ props.title }
        name={ props.name }
             />
    }
  }
}
