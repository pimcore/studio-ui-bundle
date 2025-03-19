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
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/dynamic-type-object-data-abstract'
import {
  UrlSlug, type UrlSlugEntry, type UrlSlugProps
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/url-slug/url-slug'
import { UrlSlug as UrlSlugPreview } from '../../grid-cell-preview/url-slug/url-slug'

export type UrlSlugObjectDataDefinition = AbstractObjectDataDefinition & UrlSlugProps

export class DynamicTypeObjectDataUrlSlug extends DynamicTypeObjectDataAbstract {
  id: string = 'urlSlug'
  gridCellEditMode: EditMode = 'edit-modal'
  gridCellEditModalSettings: EditModalSettings = {
    modalSize: 'L',
    formLayout: 'vertical'
  }

  getObjectDataComponent (props: UrlSlugObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    return (
      <UrlSlug
        { ...props }
        className={ props.className }
        disabled={ props.noteditable === true }
      />
    )
  }

  getGridCellPreviewComponent (props: GetGridCellDefinitionProps): React.ReactElement {
    const value: UrlSlugEntry[] | null = props.cellProps.getValue()

    return (
      <UrlSlugPreview value={ value } />
    )
  }
}
