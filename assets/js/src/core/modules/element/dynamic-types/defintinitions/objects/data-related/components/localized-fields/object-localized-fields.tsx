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

  // BaseView wraps the children in a card once a title or a border is
  // configured, and that card — not the stack inside it — is the container the
  // class definition is describing. The same condition BaseView itself uses.
  const isPadded = border === true || isNonEmptyString(title)

  // Exactly one element carries the dimensions. Applying them to both would
  // compound a percentage width, and would give the inner stack the card's full
  // height on top of the card's own header and padding.
  const containerStyle = { height: cssHeight, width: cssWidth }
  const viewStyle = isPadded ? containerStyle : undefined
  // Inside a card the stack is left unsized. A `height: '100%'` here would be
  // inert: the antd card body and the padding Box around it are both
  // auto-height (components/card/card.tsx), and a percentage height resolves
  // to nothing against an auto-height ancestor. So `layout: 'fit'` stretches
  // the children only when no card is rendered; making it stretch inside one
  // needs a flex chain through the shared Card, which has no className seam
  // today and is used by every layout container.
  const innerStyle = isPadded ? undefined : containerStyle

  // The utility class only has to go when this element is the sized one.
  const innerClassName = isNonEmptyString(cssWidth) && !isPadded ? undefined : 'w-full'

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
        className={ innerClassName }
        gap={ { x: 'extra-small', y: 0 } }
        style={ innerStyle }
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
        className={ innerClassName }
        direction='vertical'
        size='small'
        style={ innerStyle }
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
            style={ viewStyle }
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
