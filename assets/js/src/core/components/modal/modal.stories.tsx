import {Meta} from '@storybook/react';
import React, {useState} from 'react';
import {Button} from '@Pimcore/components/button/button';
import {ModalFooter} from '@Pimcore/components/modal/footer/modal-footer';
import {ModalTitle} from '@Pimcore/components/modal/modal-title/modal-title';
import {Modal} from '@Pimcore/components/modal/modal';

const config: Meta = {
    title: 'Components/Feedback/Modal',
    component: Modal,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default config;

export const Large = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => {
        setIsOpen(false);
    };

    return (<>
            <Button onClick={ () => setIsOpen(!isOpen) }>Open modal</Button>
            <Modal
            open={isOpen}
            onCancel={handleClose}
            size='L'
            title={
                <ModalTitle>
                    Large Modal
                </ModalTitle>
            }
            footer={
                <ModalFooter justify='space-between'>
                    <Button key='cancel' type='link'>
                        Read the technical instructions
                    </Button>

                    <Button key='details' type='primary'>
                        See details
                    </Button>
                </ModalFooter>
            }
        >
            <div>
                Content goes here. Click the close button to hide this modal.
            </div>
        </Modal>
        </>
    );
};

export const Medium = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => {
        setIsOpen(false);
    };

    return (<>
            <Button onClick={ () => setIsOpen(!isOpen) }>Open modal</Button>
            <Modal
                open={isOpen}
                onCancel={handleClose}
                size='M'
                title={
                    <ModalTitle>
                        Medium Modal
                    </ModalTitle>
                }
                footer={
                    <ModalFooter justify='space-between'>
                        <Button key='cancel' type='link'>
                            Read the technical instructions
                        </Button>

                        <Button key='details' type='primary'>
                            See details
                        </Button>
                    </ModalFooter>
                }
            >
                <div>
                    Content goes here. Click the close button to hide this modal.
                </div>
            </Modal>
        </>
    );
};