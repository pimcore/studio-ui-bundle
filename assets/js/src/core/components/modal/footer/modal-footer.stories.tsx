/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
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
