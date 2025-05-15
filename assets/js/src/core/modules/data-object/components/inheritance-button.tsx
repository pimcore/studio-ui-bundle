/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDataObjectHelper } from '../hooks/use-data-object-helper'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'

export interface InheritanceButtonProps {
  objectId: number
}

export const InheritanceButton = (props: InheritanceButtonProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { openDataObject } = useDataObjectHelper()

  return (
    <Tooltip title={ t('inheritance-active', { id: props.objectId }) }>
      <IconButton
        icon={ { value: 'inheritance-active' } }
        onClick={ () => { void openDataObject({ config: { id: props.objectId } }) } }
        style={ { border: 0 } }
        type="link"
        variant="minimal"
      />
    </Tooltip>
  )
}
