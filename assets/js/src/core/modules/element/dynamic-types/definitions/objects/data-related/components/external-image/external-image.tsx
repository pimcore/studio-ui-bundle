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
import cn from 'classnames'
import { Card } from '@Pimcore/components/card/card'
import { ExternalImageFooter } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/external-image/footer'
import { AssetTarget } from '@Pimcore/components/asset-target/asset-target'
import { useTranslation } from 'react-i18next'
import { ImagePreview } from '@Pimcore/components/image-preview/image-preview'
import { isEmpty, isNil } from 'lodash'
import { useFieldWidth } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width'
import { toCssDimension } from '@Pimcore/utils/css'
import { theme } from 'antd'
import { useStyles } from './external-image.styles'
import { isEmptyValue } from '@Pimcore/utils/type-utils'

export interface ExternalImageValue {
  url: string
}

export interface ExternalImageProps {
  previewWidth: number | null
  previewHeight: number | null
  inputWidth: number | null
  disabled?: boolean
  value?: ExternalImageValue | null
  onChange?: (value: ExternalImageValue | null) => void
  className?: string
}

export const ExternalImage = (props: ExternalImageProps): React.JSX.Element => {
  const externalImageValue = props.value ?? null

  const { t } = useTranslation()
  const fieldWidth = useFieldWidth()
  const { useToken } = theme
  const { token } = useToken()
  const { styles } = useStyles()

  const handleChange = (value?: string): void => {
    const newUrl = value !== '' && value !== undefined ? value : null

    props.onChange?.(newUrl === null ? null : { url: newUrl })
  }

  const previewWidth = Math.max(props.previewWidth ?? 300, 70)
  const previewHeight = Math.max(props.previewHeight ?? 150, 70)
  const containerWidth = isNil(props.inputWidth) && (previewWidth < fieldWidth.large) ? fieldWidth.large : Math.max(previewWidth, props.inputWidth ?? 0) + 2 + token.paddingSM * 2

  return (
    <>
      <Card
        className={ cn('max-w-full', styles.image, props.className) }
        fitContent={ Boolean(props.inputWidth) }
        footer={ (
          <ExternalImageFooter
            disabled={ props.disabled }
            inputWidth={ props.inputWidth ?? undefined }
            key="external-image-footer"
            onChange={ handleChange }
            placeholder={ isEmptyValue(externalImageValue?.url) ? 'URL' : undefined }
            value={ externalImageValue?.url ?? undefined }
          />
        ) }
        style={ { maxWidth: toCssDimension(containerWidth) } }
      >
        { externalImageValue !== null && !isEmpty(externalImageValue?.url)
          ? (
            <ImagePreview
              height={ previewHeight }
              src={ externalImageValue?.url }
              width={ previewWidth }
            />
            )
          : (
            <AssetTarget
              height={ previewHeight }
              title={ t(props.disabled === true ? 'empty-image' : 'external-image.preview-placeholder') }
              width={ previewWidth }
            />
            )}
      </Card>
    </>
  )
}
