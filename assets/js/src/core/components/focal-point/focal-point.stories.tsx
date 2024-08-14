import type {Meta} from "@storybook/react";
import {FocalPoint} from "@Pimcore/components/focal-point/focal-point";
import React from "react";

const config: Meta = {
  title: 'Pimcore studio/UI/Focal Point',
  component: () => {
    return (
      <FocalPoint>
        {/* <PimcoreImage src={ 'https://picsum.photos/800/600.jpg' } /> */}
        <img src={'https://picsum.photos/800/600.jpg'} />
      </FocalPoint>
    )
  },
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

export const _default = {}
