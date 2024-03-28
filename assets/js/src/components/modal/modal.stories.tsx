import { type Meta } from '@storybook/react'
import { Button } from 'antd'
import React from 'react'
import { FileList } from '@Pimcore/components/modal/file-list/file-list'
import { ModalFooter } from '@Pimcore/components/modal/footer/modal-footer'
import { useModal } from '@Pimcore/components/modal/useModal'

const config: Meta = {
  title: 'Pimcore studio/UI/Modal',
  component: (args) => {
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
  },
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

export const error = {
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

export const success = {
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

export const info = {
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

export const warn = {
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
    footer: <ModalFooter buttonAlignment={ 'space-between' }>
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
