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
import { IconSelector } from '@Pimcore/components/icon-selector/icon-selector'
import { usePerspectiveEditorContext } from '@Pimcore/modules/widget-editor/perspective-editor/context/hooks/use-perspective-editor-context'
import React, { useState } from 'react'

interface PerspectiveDetailTabProps {
  id: string | undefined
}

export const PerspectiveDetailTab = ({ id }: PerspectiveDetailTabProps): React.JSX.Element => {
  const { perspectives } = usePerspectiveEditorContext()
  const perspective = perspectives.find(p => p.id === id)
  const [iconSelectorOpen, setIconSelectorOpen] = useState(false)
  const [selectedIcon, setSelectedIcon] = useState<string>('folder')

  if (perspective === undefined) {
    return <></>
  }

  return (
    <Content padded>
      <p>{`You opened the perspective with id ${perspective.id}`}</p>
      <button onClick={() => setIconSelectorOpen(true)}>
        Open Icon Selector
      </button>
      <IconSelector
        onCancel={() => setIconSelectorOpen(false)}
        onSelect={(iconName) => {
          setSelectedIcon(iconName)
          setIconSelectorOpen(false)
        }}
        open={iconSelectorOpen}
        selectedIcon={selectedIcon}
      />
    </Content>
  )
}
