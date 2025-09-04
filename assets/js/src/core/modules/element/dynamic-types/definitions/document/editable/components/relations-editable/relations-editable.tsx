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
import { Form } from 'antd'
import { ManyToManyRelation, type ManyToManyRelationProps } from '@Pimcore/components/many-to-many-relation'
import { InheritanceOverlay } from '../inheritance-overlay/inheritance-overlay'
import { useFieldWidth } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width'
import { toCssDimension } from '@sdk/utils'
import { ManyToManyRelationLabel } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/relations/components/label/label'
import { isEmpty, isNil } from 'lodash'

interface RelationsEditableProps extends ManyToManyRelationProps {
  inherited?: boolean
  title?: string
  name?: string
}

export const RelationsEditable = ({
  inherited,
  width,
  height,
  title,
  name,
  ...otherProps
}: RelationsEditableProps): React.JSX.Element => {
  const fieldWidth = useFieldWidth()

  const handleOverwrite = (): void => {
    otherProps.onChange?.(otherProps.value ?? null)
  }

  const containerStyle = {
    width: '100%',
    maxWidth: toCssDimension(width, fieldWidth.large)
  }

  const showLabel = !isNil(title) && !isEmpty(title)

  return (

    <InheritanceOverlay
      display="block"
      isInherited={ Boolean(inherited) }
      onOverwrite={ handleOverwrite }
      style={ containerStyle }
    >
      <Form.Item
        label={ showLabel
          ? (
            <ManyToManyRelationLabel
              label={ title }
              name={ name ?? '' }
            />
            )
          : undefined }
        layout="vertical"
      >
        <ManyToManyRelation
          { ...otherProps }
          disabled={ otherProps.disabled === true || inherited === true }
          height={ height }
          width={ width }
        />

      </Form.Item>
    </InheritanceOverlay>
  )
}
