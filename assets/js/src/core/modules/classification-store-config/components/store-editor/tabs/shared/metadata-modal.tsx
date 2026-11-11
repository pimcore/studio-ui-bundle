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
import { PairModalShell, type IPairModalProps } from './pair-modal-shell'
import { type PairView } from './pairs'

const view: PairView = {
  includes: () => true,
  toDisplayKey: (storedKey) => storedKey,
  toStoredKey: (typedKey) => typedKey,
  keyLabel: 'classification-store.pair-key',
  valueLabel: 'classification-store.pair-value',
  duplicateMessage: 'classification-store.pair-key-duplicate'
}

export const MetadataModal = (props: IPairModalProps): React.JSX.Element => (
  <PairModalShell
    { ...props }
    successKey="classification-store.metadata-saved"
    titleKey="classification-store.edit-metadata"
    view={ view }
  />
)
