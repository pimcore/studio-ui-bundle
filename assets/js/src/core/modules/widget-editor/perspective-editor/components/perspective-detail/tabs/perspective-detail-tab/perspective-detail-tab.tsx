/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Content } from '@Pimcore/components/content/content'
import { Flex } from '@Pimcore/components/flex/flex'
import { Form } from '@Pimcore/components/form/form'
import { FormKit } from '@Pimcore/components/form/form-kit'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Input } from '@Pimcore/components/input/input'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { type CreatePerspectiveConfig } from '@Pimcore/modules/perspectives/perspectives-slice.gen'
import { type ElementIcon } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { IconSelector } from '@Pimcore/components/icon-selector/icon-selector'
import { usePerspectiveEditorContext } from '@Pimcore/modules/widget-editor/perspective-editor/context/hooks/use-perspective-editor-context'
import { usePerspectiveEditor } from '@Pimcore/modules/widget-editor/perspective-editor/hooks/use-perspective-editor'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@sdk/components'
import { PerspectiveForm } from '../../../perspective-form/perspective-form'

export interface PerspectiveForm {
  name: string
  icon?: ElementIcon
}

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
    <PerspectiveForm perspective={perspective} />
  )
}
