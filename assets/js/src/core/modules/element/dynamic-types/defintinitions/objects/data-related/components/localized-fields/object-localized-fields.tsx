/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect } from 'react'
import { LocalizedFieldsProvider } from '@Pimcore/components/form/localisation/localized-fields/provider/localized-fields-provider/localized-fields-provider'
import { type AbstractObjectDataDefinition } from '../../../../../definitions/objects/data-related/dynamic-type-object-data-abstract'
import { type AbstractObjectLayoutDefinition } from '../../../../../definitions/objects/layout-related/dynamic-type-object-layout-abstract'
import { BaseView } from '../../../../../definitions/objects/layout-related/views/base-view'
import { ObjectComponent } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/object-component'
import { Space } from '@Pimcore/components/space/space'
import { useLanguageSelection } from '@Pimcore/components/language-selection/provider/use-language-selection'
import { Form } from '@Pimcore/components/form/form'
import { CombinedFieldNameProvider } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/combined-field-name-provider/combined-field-name-provider'
import { Flex } from '@Pimcore/components/flex/flex'
import {
  LabelLayoutProvider
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/label/label-layout-provider'
import { toCssDimension } from '@Pimcore/utils/css'
import { isNonEmptyString } from '@Pimcore/utils/type-utils'

// Props for the legacy object definitions version
export interface ObjectLocalizedFieldsProps extends AbstractObjectDataDefinition {
  children?: Array<AbstractObjectDataDefinition | AbstractObjectLayoutDefinition>
  border?: boolean
  width?: number | string | null
  height?: number | string | null
  layout?: string | null
  labelWidth?: number | null
  labelAlign?: string | null
}

// Legacy ObjectLocalizedFields component - supports object definition arrays
export const ObjectLocalizedFields = ({ children, noteditable, className, title, border, width, height, layout, labelWidth, labelAlign }: ObjectLocalizedFieldsProps): React.JSX.Element => {
  const { currentLanguage, hasLocalizedFields, setHasLocalizedFields } = useLanguageSelection()

  const isParentNotEditable = noteditable === true

  // Localizedfields::$width and ::$height default to 0 and toCssDimension()
  // maps 0/''/null to undefined, so an unconfigured container keeps rendering
  // full width exactly as before. Same mapping the sibling FieldContainer uses.
  const cssWidth = toCssDimension(width)
  const cssHeight = toCssDimension(height)

  // Localizedfields::$layout offers only '' and 'fit' in the class editor. 'fit'
  // is the legacy ExtJS layout whose children fill the container, which the
  // sibling FieldContainer already expresses as flex-1 items.
  const isFit = layout === 'fit'

  // Only wrap when something was actually configured: a field outside a
  // configured container must keep antd's own label defaults.
  const hasLabelLayout = (typeof labelWidth === 'number' && labelWidth > 0) || isNonEmptyString(labelAlign)

  useEffect(() => {
    if (!hasLocalizedFields) setHasLocalizedFields(true)
  }, [])

  const renderChild = (child: AbstractObjectDataDefinition | AbstractObjectLayoutDefinition, index: number): React.JSX.Element => (
    <ObjectComponent
      key={ index }
      { ...child }
      className={ className }
      noteditable={ isParentNotEditable || child.noteditable }
    />
  )

  const container = isFit
    ? (
      <Flex
        className={ isNonEmptyString(cssWidth) ? undefined : 'w-full' }
        gap={ { x: 'extra-small', y: 0 } }
        style={ { height: cssHeight, width: cssWidth } }
        vertical
      >
        {children?.map((child, index) => (
          <Flex
            flex={ 1 }
            key={ index }
          >
            { renderChild(child, index) }
          </Flex>
        ))}
      </Flex>
      )
    : (
      <Space
        className={ isNonEmptyString(cssWidth) ? undefined : 'w-full' }
        direction='vertical'
        size='small'
        style={ { height: cssHeight, width: cssWidth } }
      >
        {children?.map(renderChild)}
      </Space>
      )

  const content = hasLabelLayout
    ? (
      <LabelLayoutProvider
        labelAlign={ labelAlign }
        labelWidth={ labelWidth }
      >
        { container }
      </LabelLayoutProvider>
      )
    : container

  return (
    <LocalizedFieldsProvider locales={ [currentLanguage] }>
      <CombinedFieldNameProvider combinedFieldNameParent={ ['localizedfields'] }>
        <Form.Group name={ 'localizedfields' } >
          {/* Localizedfields::$title and ::$border are part of the class definition;
              BaseView renders the children bare when neither is set. */}
          <BaseView
            border={ border }
            theme='default'
            title={ title }
          >
            { content }
          </BaseView>
        </Form.Group>
      </CombinedFieldNameProvider>
    </LocalizedFieldsProvider>
  )
}
