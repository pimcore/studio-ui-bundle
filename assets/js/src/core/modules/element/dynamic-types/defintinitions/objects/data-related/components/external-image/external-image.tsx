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

import React, { useEffect } from 'react'
import cn from 'classnames'
import { Card } from '@Pimcore/components/card/card'
import { ExternalImageFooter } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/external-image/footer'
import { AssetTarget } from '@Pimcore/components/asset-target/asset-target'
import { useTranslation } from 'react-i18next'
import { ImagePreview } from '@Pimcore/components/image-preview/image-preview'
import { isEmpty, isNil } from 'lodash'
import { useFieldWidth } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/field-width/use-field-width'
import { toCssDimension } from '@Pimcore/utils/css'
import { theme } from 'antd'
import { useStyles } from './external-image.styles'

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
  const [value, setValue] = React.useState<ExternalImageValue | null>(props.value ?? null)
  const { t } = useTranslation()
  const fieldWidth = useFieldWidth()
  const { useToken } = theme
  const { token } = useToken()
  const { styles } = useStyles()

  const onChange = (value?: string): void => {
    const newUrl = value !== '' && value !== undefined ? value : null
    setValue(newUrl === null ? null : { url: newUrl })
  }

  useEffect(() => {
    props.onChange?.(value)
  }, [value])

  const previewWidth = Math.max(props.previewWidth ?? 300, 70)
  const previewHeight = Math.max(props.previewHeight ?? 150, 70)
  const containerWidth = isNil(props.inputWidth) && (previewWidth < fieldWidth.large) ? fieldWidth.large : Math.max(previewWidth, props.inputWidth ?? 0) + 2 + token.paddingSM * 2

  return (
    <>
      <Card
        className={ cn('max-w-full', styles.image, props.className) }
        fitContent={ Boolean(props.inputWidth) }
        footer={ <ExternalImageFooter
          disabled={ props.disabled }
          inputWidth={ props.inputWidth ?? undefined }
          key="external-image-footer"
          onChange={ onChange }
          value={ value?.url ?? undefined }
                 /> }
        style={ { maxWidth: toCssDimension(containerWidth) } }
      >
        { value !== null && !isEmpty(value.url)
          ? (
            <ImagePreview
              height={ previewHeight }
              src={ value?.url }
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
