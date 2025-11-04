/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { usePerspectiveEditorContext } from '@Pimcore/modules/perspective-editor/context/hooks/use-perspective-editor-context'
import React from 'react'
import { PerspectiveForm, PerspectiveFormProps } from '../../../perspective-form/perspective-form'

interface PerspectiveDetailTabProps {
  id: string | undefined
}

export const PerspectiveDetailTab = ({ id }: PerspectiveDetailTabProps): React.JSX.Element => {
  const { perspectives } = usePerspectiveEditorContext()
  const perspective = perspectives.find(p => p.id === id)

  if (perspective === undefined) {
    return <></>
  }

  return (
    <PerspectiveForm perspective={ perspective as PerspectiveFormProps['perspective'] } />
  )
}
