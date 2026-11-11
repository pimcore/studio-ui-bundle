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
import { type PairView } from './pairs'

const TITLE_PREFIX = 'title.'

const view: PairView = {
  includes: (storedKey) => storedKey.startsWith(TITLE_PREFIX),
  toDisplayKey: (storedKey) => storedKey.slice(TITLE_PREFIX.length),
  toStoredKey: (typedKey) => `${TITLE_PREFIX}${typedKey}`,
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
      view={ view }
    />
  )
}
