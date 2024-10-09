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
import { useTranslation } from 'react-i18next'
import { Button, Space } from 'antd'
import { Icon } from '@Pimcore/components/icon/icon'
import { useStyle } from '@Pimcore/components/image-zoom/image-zoom.styles'
import { onKeyEnterExecuteClick } from '@Pimcore/utils/helpers'
import { Select } from '@Pimcore/components/select/select'

interface IImageZoom {
  zoom: number
  setZoom: React.Dispatch<React.SetStateAction<number>>
  zoomSteps?: number
}

export const ImageZoom = ({ zoom, setZoom, zoomSteps = 25 }: IImageZoom): React.JSX.Element => {
  const [zoomInDisabled, setZoomInDisabled] = React.useState<boolean>(false)
  const [zoomOutDisabled, setZoomOutDisabled] = React.useState<boolean>(false)
  const { styles } = useStyle({ zoom })
  const { t } = useTranslation()

  useEffect(() => {
    // zoomIn Btn
    if (zoom >= 500) {
      setZoomInDisabled(true)
    }
    if (zoomInDisabled && zoom < 500) {
      setZoomInDisabled(false)
    }

    // zoomOut Btn
    if (zoom <= 25) {
      setZoomOutDisabled(true)
    }
    if (zoomOutDisabled && zoom > 25) {
      setZoomOutDisabled(false)
    }
  }, [zoom])

  return (
    <div className={ styles.imageZoomContainer }>
      {zoom !== 100 && (
        <Button
          aria-label={ t('aria.asset.image.editor.zoom.reset') }
          className={ styles.imageZoomResetBtn }
          onClick={ () => { setZoom(100) } }
          onKeyDown={ onKeyEnterExecuteClick }
        >
          {t('asset.image.editor.zoom.reset')}
        </Button>
      )}

      <Space.Compact className={ styles.imageZoom }>
        <Button
          aria-disabled={ zoomOutDisabled }
          aria-label={ t('aria.asset.image.editor.zoom.zoom-out') }
          className={ styles.imageZoomBtn }
          disabled={ zoomOutDisabled }
          onClick={ () => { setZoom(zoom - zoomSteps) } }
          onKeyDown={ onKeyEnterExecuteClick }
        >
          <Icon name={ 'MinusOutlined' } />
        </Button>
        <Select
          aria-label={ t('aria.asset.image.editor.zoom.preconfigured-zoom-levels') }
          defaultActiveFirstOption
          defaultValue={ '100' }
          onChange={ (value: string) => { setZoom(parseInt(value)) } }
          options={ [
            { value: '100', label: '100%' },
            { value: '125', label: '125%' },
            { value: '150', label: '150%' },
            { value: '175', label: '175%' },
            { value: '200', label: '200%' },
            { value: '225', label: '225%' },
            { value: '250', label: '250%' }
          ] }
          value={ `${zoom}%` }
        />
        <Button
          aria-disabled={ zoomInDisabled }
          aria-label={ t('aria.asset.image.editor.zoom.zoom-in') }
          className={ styles.imageZoomBtn }
          disabled={ zoomInDisabled }
          onClick={ () => { setZoom(zoom + zoomSteps) } }
          onKeyDown={ onKeyEnterExecuteClick }
        >
          <Icon name={ 'PlusOutlined' } />
        </Button>
      </Space.Compact>
    </div>
  )
}
