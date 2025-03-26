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

import React from 'react'
import { GridCellPreviewWrapper } from '../grid-cell-cell-preview-wrapper/grid-cell-preview-wrapper'
import { type ConsentValue } from '../../data-related/components/consent/consent'
import { useTranslation } from 'react-i18next'
import { isEmpty, isNil } from 'lodash'

interface ConsentProps {
  consent: ConsentValue | null
}

export const Consent = ({ consent }: ConsentProps): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <GridCellPreviewWrapper>
      { consent?.consent === true && t('yes') }
      { consent?.consent === false && t('no') }
      { !isNil(consent?.noteContent) && !isEmpty(consent?.noteContent) && (
        <span> ({ consent.noteContent })</span>
      ) }

    </GridCellPreviewWrapper>
  )
}
