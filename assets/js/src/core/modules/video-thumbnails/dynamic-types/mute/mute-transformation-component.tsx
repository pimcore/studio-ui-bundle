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
import type { TransformationComponent } from '@Pimcore/modules/image-thumbnails/types/transformation-component-types'
import { useStyles } from './mute-transformation-component.styles'

export const MuteTransformationComponent: TransformationComponent = () => {
  const { t } = useTranslation()
  const { styles } = useStyles()

  return (
    <div className={ styles.hint }>
      {t('video-thumbnails.transformations.no-configuration-required')}
    </div>
  )
}
