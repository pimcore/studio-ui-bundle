/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { type IInlineHelpContext } from './inline-help-provider'
import { useInlineHelpHelper } from './use-inline-help-helper'
import React from 'react'

export interface InlineHelpTriggerProps {
  component: IInlineHelpContext['component']
}

export const InlineHelpTrigger = ({ component }: InlineHelpTriggerProps): React.JSX.Element => {
  const inlineHelpHelper = useInlineHelpHelper()

  return (
    <IconButton
      icon={ { value: 'help-circle' } }
      onClick={ () => { inlineHelpHelper.open(component) } }
    />
  )
}
