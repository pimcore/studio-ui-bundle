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
import { useTranslation } from 'react-i18next'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'

export interface RestoreInheritanceButtonProps {
  onRestore: () => void
}

export const RestoreInheritanceButton = ({ onRestore }: RestoreInheritanceButtonProps): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <IconTextButton
      icon={ { value: 'corner-up-left' } }
      onClick={ onRestore }
      size="small"
      // The button sits at the end of a field label, so it takes the type of the
      // label instead of the one a button brings: the inherited font size and line
      // height put its text on the same line box — and therefore the same baseline —
      // as the label text next to it, in a label of any size. Without a box of its
      // own on top of that (no padding, no border, height from the content), it also
      // stays exactly as tall as that one line of label text, so its appearance
      // cannot push the field down. Sizing it from the global tokens instead would
      // hold only for labels that happen to render at the global font size.
      style={ { fontSize: 'inherit', lineHeight: 'inherit', padding: 0, border: 0, height: 'auto' } }
      type="link"
    >
      { t('inheritance-restore') }
    </IconTextButton>
  )
}
