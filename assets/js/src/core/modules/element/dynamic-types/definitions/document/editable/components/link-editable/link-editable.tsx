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
import { InheritanceOverlay } from '../inheritance-overlay/inheritance-overlay'
import { type LinkValue } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/link/link'
import { useLinkDataType } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/link/hooks/use-link-data-type'
import { DocumentLinkPreview } from '../link-preview/document-link-preview'
import { useStyles } from './link-editable.styles'
import cn from 'classnames'

interface LinkEditableProps {
  value?: LinkValue | null
  allowedTypes?: string[]
  allowedTargets?: string[]
  disabledFields?: string[]
  className?: string
  textPrefix?: string
  textSuffix?: string
  onChange?: (value: LinkValue | null) => void
  inherited?: boolean
}

export const LinkEditable = ({
  value,
  allowedTypes,
  allowedTargets,
  disabledFields,
  className,
  textPrefix,
  textSuffix,
  onChange,
  inherited
}: LinkEditableProps): React.JSX.Element => {
  const { styles } = useStyles()

  const handleOverwrite = (): void => {
    onChange?.(value ?? null)
  }

  const { renderPreview, renderActions } = useLinkDataType({
    value,
    allowedTypes: allowedTypes ?? [],
    allowedTargets: allowedTargets ?? [],
    disabledFields: disabledFields ?? [],
    className,
    textPrefix,
    textSuffix,
    onChange,
    inherited,
    PreviewComponent: DocumentLinkPreview
  })

  const actions = renderActions()
  const positioningClass = actions.length === 1 ? styles.documentLinkActionsSingle : styles.documentLinkActions

  return (
    <InheritanceOverlay
      display="block"
      isInherited={ Boolean(inherited) }
      onOverwrite={ handleOverwrite }
    >
      <div className={ styles.documentLink }>
        <div className={ styles.documentLinkPreview }>
          {renderPreview()}
        </div>
        {inherited !== true && (
          <div className={ cn(styles.documentLinkActionsBase, positioningClass) }>
            {actions}
          </div>
        )}
      </div>
    </InheritanceOverlay>
  )
}
