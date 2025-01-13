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

import React from 'react'
import { type Meta } from '@storybook/react'
import { Button } from '@Pimcore/components/button/button'
import { FileList } from '@Pimcore/components/modal/file-list/file-list'
import { ModalFooter } from '@Pimcore/components/modal/footer/modal-footer'
import { useModal } from '@Pimcore/components/modal/useModal'

const AlertModalComponent = (args: any): React.JSX.Element => {
  const { renderModal: RenderModal, showModal } = useModal({ type: args.type })

  return (
    <>
      <Button onClick={ showModal }>Open modal</Button>
      <RenderModal
        footer={ args.footer }
        title={ args.title }
      >
        {args.content}
      </RenderModal>
    </>
  )
}

const config: Meta = {
  title: 'Components/Feedback/InfoModal',
  component: AlertModalComponent,
  argTypes: {
    type: {
      options: ['error', 'success', 'info', 'warn'],
      control: { type: 'select' }
    },
    content: {
      table: {
        disable: true
      }
    },
    footer: {
      table: {
        disable: true
      }
    }
  },
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

const DefaultContent = (): React.JSX.Element => {
  return (
    <>
      <p>The following files failed while creating their ZIPs. Pressing on See details will load additional options helping to resolve the error.</p>

      <FileList files={ ['all-catalogue-pictures.zip', 'all-catalogue-pictures-videos-content-materials.zip'] } />
    </>
  )
}

export const WithError = {
  args: {
    type: 'error',
    title: 'Error occurred when creating ZIP',
    content: <DefaultContent />,
    footer: <ModalFooter>
      <Button
        danger
        key="cancel"
      >
        Cancel all ZIP actions
      </Button>
      <Button
        key="details"
        type={ 'primary' }
      >
        See details
      </Button>
    </ModalFooter>
  }
}

export const Success = {
  args: {
    type: 'success',
    title: 'Your file is uploaded!',
    content: '“alfa-romeo-144.jpg” is now uploaded.',
    footer: <ModalFooter>
      <Button
        key="cancel"
      >
        Close
      </Button>
    </ModalFooter>
  }
}

export const WithInfo = {
  args: {
    type: 'info',
    title: 'Info',
    content: 'Your Webhook has been activated.',
    footer: <ModalFooter>
      <Button
        key="cancel"
      >
        Close
      </Button>
    </ModalFooter>
  }
}

export const WithWarn = {
  args: {
    type: 'warn',
    title: 'Warning',
    content: 'Your Webhook has been activated.',
    footer: <ModalFooter>
      <Button
        key="cancel"
      >
        Close
      </Button>
    </ModalFooter>
  }
}

const SpaceBetweenFooterButtonsContent = (): React.JSX.Element => {
  return (
    <>
      <p>This video format for the following file is not supported. Try converting it in MP4, MOV or AVI.</p>

      <FileList files={ ['all-catalogue-pictures.zip'] } />
    </>
  )
}

export const SpaceBetweenFooterButtons = {
  args: {
    type: 'error',
    title: 'Media Player can’t play this file',
    content: <SpaceBetweenFooterButtonsContent />,
    footer: <ModalFooter justify={ 'space-between' }>
      <Button
        key="cancel"
        type="link"
      >
        Read the technical instructions
      </Button>

      <Button
        key="details"
        type={ 'primary' }
      >
        See details
      </Button>
    </ModalFooter>
  }
}
