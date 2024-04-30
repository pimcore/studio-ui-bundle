import { type Meta } from '@storybook/react'
import { ImageZoom } from '@Pimcore/components/image-zoom/image-zoom'
import React, { useState } from 'react'

const config: Meta = {
  title: 'Pimcore studio/UI/Image Zoom',
  component: () => {
    const [zoom, setZoom] = useState<number>(100)

    return (
      <ImageZoom
        setZoom={ setZoom }
        zoom={ zoom }
      />
    )
  },
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {}
}
