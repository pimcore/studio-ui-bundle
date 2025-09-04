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
import { useLinkDataType } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/link/hooks/use-link-data-type'
import { useStyles } from './document-link.styles'
import type { LinkProps } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/link/link'
import { DocumentLinkPreview } from '../link-preview/document-link-preview'
import cn from 'classnames'

export interface DocumentLinkProps extends Omit<LinkProps, 'PreviewComponent'> {

}

export const DocumentLink = (props: DocumentLinkProps): React.JSX.Element => {
  const { styles } = useStyles()

  const { renderPreview, renderActions } = useLinkDataType({
    ...props,
    PreviewComponent: DocumentLinkPreview
  })

  const actions = renderActions()
  const positioningClass = actions.length === 1 ? styles.documentLinkActionsSingle : styles.documentLinkActions

  return (
    <div className={ styles.documentLink }>
      <div className={ styles.documentLinkPreview }>
        {renderPreview()}
      </div>
      <div className={ cn(styles.documentLinkActionsBase, positioningClass) }>
        {actions}
      </div>
    </div>
  )
}
