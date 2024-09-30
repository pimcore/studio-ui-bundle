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

import { type Meta } from '@storybook/react'
import {Card} from "./card";
import {Switch} from "../switch/switch";
import React, {Fragment} from "react";
import {Icon} from "@Pimcore/components/icon/icon";
import {IconButton} from "@Pimcore/components/icon-button/icon-button";
import {Flex} from "antd";

const config: Meta = {
  title: 'Components/Data Display/Card',
  component: Card,
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    title: 'Card Title',
    children: 'Card Content'
  }
}

export const CloseButton = {
  args: {
    ..._default.args,
    onClose: () => console.log('handle close')
  }
}

export const TextAndClose = {
  args: {
    ..._default.args,
    onClose: () => console.log('handle close'),
    extra: '20.02.2024 15:13:22'
  }
}

export const TitleWithIcon = {
  args: {
    ..._default.args,
    titleIcon: 'eye-outlined'
  }
}

const renderToggle = (): React.ReactElement => {
    return (
        <Fragment>
            <Switch labelPosition={'start'} label={'Toggle'} />
        </Fragment>
    )
}
export const ToggleButton = {
  args: {
    title: 'asdf',
    extra: [renderToggle()]
  }
}


const renderContent = (): React.ReactElement => {
  return (
      <Fragment>
        <Flex align="center" justify="space-between">
          <div>test</div>
          <IconButton icon={'eye-outlined'} onClick={() => console.log('click button')} />
        </Flex>
      </Fragment>
  )
}
export const Image = {
  args: {
    image: {
        src: 'https://pimcore.com/brand/Website-Banners/image-thumb__23862__header-sujet-img__2019--slider/2024-Pimcore-Home-Main.webp',
        alt: 'Pimcore Logo'
    },
    children: renderContent(),
  }
}


// const renderAction = (): React.ReactElement => {
//   return (
//       <Fragment>
//         <IconButton icon={'eye-outlined'} onClick={() => console.log('click button')} />
//       </Fragment>
//   )
// }
export const Actions = {
  args: {
    ..._default.args,
      cardActions: [
          {
              icon: 'eye-outlined',
              title: 'View',
              onClick: () => console.log('click view button')
          },
            {
                icon: 'edit',
                title: 'Edit',
                onClick: () => console.log('click edit button')
            },
            {
                icon: 'trash',
                title: 'Delete',
                onClick: () => console.log('click delete button')
            }
      ]
  }
}