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

export interface ExternalImageProps {
  previewWidth: number | null
  previewHeight: number | null
  value?: string | null
  onChange?: (value: string | null) => void
}

export const ExternalImage = (props: ExternalImageProps): React.JSX.Element => {
  const [value, setValue] = React.useState<string | null>(props.value ?? null)

  const onChange = (value?: string): void => {
    setValue(value !== '' && value !== undefined ? value : null)
  }

  useEffect(() => {
    props.onChange?.(value)
  }, [value])

  return (
    <>
      <Card
        footer={ <ExternalImageFooter
          key="external-image-footer"
          onChange={ onChange }
          value={ value ?? undefined }
                 /> }
      >
        { value !== null && value !== '' && (
        <Image
          fallback="/bundles/pimcorestudioui/img/fallback-image.svg"
          height={ props.previewHeight ?? 300 }
          preview={ false }
          src={ value }
          width={ props.previewWidth ?? 300 }
        />
        )}
      </Card>
    </>
  )
}
