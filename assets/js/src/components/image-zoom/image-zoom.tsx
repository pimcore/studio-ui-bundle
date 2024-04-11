import { Button, Input, Space } from 'antd'
import React from 'react'
import { Icon } from '@Pimcore/components/icon/icon'
import { useStyle } from '@Pimcore/components/image-zoom/image-zoom.styles'

interface IImageZoom {
  zoom: number
  setZoom: React.Dispatch<React.SetStateAction<number>>
  zoomSteps?: number
}

export const ImageZoom = ({ zoom, setZoom, zoomSteps = 25 }: IImageZoom): React.JSX.Element => {
  const [zoomInDisabled, setZoomInDisabled] = React.useState<boolean>(false)
  const [zoomOutDisabled, setZoomOutDisabled] = React.useState<boolean>(false)
  const { styles } = useStyle({ zoom })

  function zoomIn (): void {
    setZoom(zoom + zoomSteps)

    if (zoom === 500) {
      setZoomInDisabled(true)
    }

    if (zoomInDisabled && zoom <= 500) {
      setZoomInDisabled(false)
    }
  }

  function zoomOut (): void {
    setZoom(zoom - zoomSteps)

    if (zoom <= 25) {
      setZoomOutDisabled(true)
    }

    if (zoomOutDisabled && zoom > 25) {
      setZoomOutDisabled(false)
    }
  }

  return (
    <div className={ styles.imageZoomContainer }>
      {zoom !== 100 && (
        <Button onClick={ () => { setZoom(100) } }>Reset</Button>
      )}

      <Space.Compact className={ styles.imageZoom }>
        <Button
          disabled={ zoomOutDisabled }
          onClick={ zoomOut }
        >
          <Icon name={ 'MinusOutlined' } />
        </Button>
        <Input
          onChange={ (e) => { setZoom(parseInt(e.target.value.replace('%', ''), 10)) } }
          value={ `${zoom}%` }
        />
        <Button
          disabled={ zoomInDisabled }
          onClick={ zoomIn }
        >
          <Icon name={ 'PlusOutlined' } />
        </Button>
      </Space.Compact>
    </div>
  )
}
