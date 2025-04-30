/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useStyles } from '../inheritance-overlay.styles'
import { type InheritanceOverlayType } from '../inheritance-overlay'

interface UseInheritanceOverlayStyleProps {
  inherited?: boolean
  type?: InheritanceOverlayType
}
export const useInheritanceOverlayStyle = (props: UseInheritanceOverlayStyleProps): string | undefined => {
  const { styles } = useStyles()

  if (props.type === 'form-item-container' && props.inherited === true) {
    return styles.inheritedFormItemContainer
  }

  if (props.type === 'form-element' && props.inherited === true) {
    return styles.inheritedFormElement
  }

  if (props.type === 'manual' && props.inherited === true) {
    return styles.inheritedManual
  }

  if (props.type === 'wrapper' && props.inherited === true) {
    return styles.inheritedWrapper
  }

  if (props.type === 'grid-cell' && props.inherited === true) {
    return styles.inheritedGridCell
  }

  return undefined
}
