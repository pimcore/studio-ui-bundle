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
import React, { useState } from 'react'
import { Button } from '@Pimcore/components/button/button'
import { ModalFooter } from '@Pimcore/components/modal/footer/modal-footer'
import { ModalTitle } from '@Pimcore/components/modal/modal-title/modal-title'
import { Modal } from '@Pimcore/components/modal/modal'

const config: Meta = {
  title: 'Components/Feedback/Modal',
  component: Modal,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

export const Large = (): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = (): void => {
    setIsOpen(false)
  }

  return (
    <>
      <Button onClick={ () => { setIsOpen(!isOpen) } }>Open modal</Button>
      <Modal
        footer={
          <ModalFooter justify='space-between'>
            <Button
              key='cancel'
              type='link'
            >
              Read the technical instructions
            </Button>

            <Button
              key='details'
              type='primary'
            >
              See details
            </Button>
          </ModalFooter>
            }
        mask={ false }
        maskClosable={ false }
        onCancel={ handleClose }
        open={ isOpen }
        size='L'
        title={
          <ModalTitle>
            Large Modal
          </ModalTitle>
            }
      >
        <div>
          Content goes here. Click the close button to hide this modal.
        </div>
      </Modal>
    </>
  )
}

export const Medium = (): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = (): void => {
    setIsOpen(false)
  }

  return (
    <>
      <Button onClick={ () => { setIsOpen(!isOpen) } }>Open modal</Button>
      <Modal
        footer={
          <ModalFooter justify='space-between'>
            <Button
              key='cancel'
              type='link'
            >
              Read the technical instructions
            </Button>

            <Button
              key='details'
              type='primary'
            >
              See details
            </Button>
          </ModalFooter>
                }
        onCancel={ handleClose }
        open={ isOpen }
        size='M'
        title={
          <ModalTitle>
            Medium Modal
          </ModalTitle>
                }
      >
        <div>
          Content goes here. Click the close button to hide this modal.
        </div>
      </Modal>
    </>
  )
}
