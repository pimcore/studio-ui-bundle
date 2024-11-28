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
import { Card } from '@Pimcore/components/card/card'
import {
  ExternalImageFooter
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/external-image/footer'
import { Image } from 'antd'
import { ImageTarget } from '@Pimcore/components/image-target/image-target'
import { toCssDimension } from '@Pimcore/utils/css'
import { useTranslation } from 'react-i18next'

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
}

export const ExternalImage = (props: ExternalImageProps): React.JSX.Element => {
  const [value, setValue] = React.useState<ExternalImageValue | null>(props.value ?? null)
  const { t } = useTranslation()

  const onChange = (value?: string): void => {
    const newUrl = value !== '' && value !== undefined ? value : null
    setValue(newUrl === null ? null : { url: newUrl })
  }

  useEffect(() => {
    props.onChange?.(value)
  }, [value])

  const previewWidth = Math.max(props.previewWidth ?? 300, 70)
  const previewHeight = Math.max(props.previewHeight ?? 300, 70)

  return (
    <>
      <Card
        fitContent={ Boolean(props.inputWidth) }
        footer={ <ExternalImageFooter
          disabled={ props.disabled }
          inputWidth={ props.inputWidth ?? undefined }
          key="external-image-footer"
          onChange={ onChange }
          value={ value?.url ?? undefined }
                 /> }
      >
        { value !== null && value.url !== ''
          ? (
            <Image
              fallback="/bundles/pimcorestudioui/img/fallback-image.svg"
              height={ previewHeight }
              preview={ false }
              src={ value?.url }
              style={ { maxHeight: toCssDimension(previewHeight), maxWidth: toCssDimension(previewWidth) } }
              width={ '100%' }
            />
            )
          : (
            <ImageTarget
              height={ previewHeight }
              title={ t('data-object.editor.external-image.preview-placeholder') }
              width={ previewWidth }
            />
            )}
      </Card>
    </>
  )
}
