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
import { ModalFooter } from '@Pimcore/components/modal/footer/modal-footer'
import { Button } from '@Pimcore/components/button/button'
import React from 'react'

const config: Meta = {
  title: 'Components/Feedback/ModalFooter',
  component: (args) => {
    return (
      <ModalFooter
        { ...args }
      >
        {args.children}
      </ModalFooter>
    )
  },
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs']
}

export default config

export const DefaultModalFooter = {
  args: {
    children: [<Button
      key="cancel"
      type="link"
               >
      Read the technical instructions
    </Button>,
      <Button
        key="details"
        type={ 'primary' }
      >
        See details
      </Button>]
  }
}

export const ModalFooterSpaceBetween = {
  args: {
    justify: 'space-between',
    children: [<Button
      key="cancel"
      type="link"
               >
      Read the technical instructions
    </Button>,
      <Button
        key="details"
        type={ 'primary' }
      >
        See details
      </Button>]
  }
}

export const ModalFooterDivider = {
  args: {
    divider: true,
    justify: 'space-between',
    children: [<Button
      key="cancel"
      type="link"
               >
      Read the technical instructions
    </Button>,
      <Button
        key="details"
        type={ 'primary' }
      >
        See details
      </Button>]
  }
}
