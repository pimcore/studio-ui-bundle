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
import { ManyToOneRelation, type ManyToOneRelationProps } from '@sdk/modules/element'
import { InheritanceOverlay } from '../inheritance-overlay/inheritance-overlay'
import { useFieldWidth } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width'
import { toCssDimension } from '@sdk/utils'

interface RelationEditableProps extends ManyToOneRelationProps {
  inherited?: boolean
}

export const RelationEditable = ({
  inherited,
  width,
  ...otherProps
}: RelationEditableProps): React.JSX.Element => {
  const fieldWidth = useFieldWidth()
  
  const handleOverwrite = (): void => {
    otherProps.onChange?.(otherProps.value ?? null)
  }

  const containerStyle = {
    width: '100%',
    maxWidth: toCssDimension(width, fieldWidth.large)
  }

  return (
    <InheritanceOverlay
      addIconSpacing
      display="block"
      isInherited={Boolean(inherited)}
      onOverwrite={handleOverwrite}
      style={containerStyle}
    >
      <ManyToOneRelation
        {...otherProps}
        disabled={otherProps.disabled === true || inherited === true}
        width={width}
      />
    </InheritanceOverlay>
  )
}
