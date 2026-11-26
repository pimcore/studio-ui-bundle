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
import { PairModalShell, type IPairModalProps } from './pair-modal-shell'
import { isTitleKey, toTitleKey, toTitleLocale, type PairView } from './pairs'

export const titlesView: PairView = {
  includes: isTitleKey,
  toDisplayKey: toTitleLocale,
  toStoredKey: toTitleKey,
  keyLabel: 'classification-store.pair-locale',
  valueLabel: 'classification-store.pair-title',
  duplicateMessage: 'classification-store.pair-locale-duplicate'
}

export const TitlesModal = (props: IPairModalProps): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <PairModalShell
      { ...props }
      hint={ t('classification-store.titles-locale-hint') }
      successKey="classification-store.titles-saved"
      titleKey="classification-store.edit-titles"
      view={ titlesView }
    />
  )
}
