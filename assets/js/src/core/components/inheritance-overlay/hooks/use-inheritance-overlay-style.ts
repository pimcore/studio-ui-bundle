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

  return undefined
}
