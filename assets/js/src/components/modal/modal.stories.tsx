import {type Meta} from '@storybook/react'
import {Modal} from "@Pimcore/components/modal/modal";
import {Button} from "antd";
import React, {useState} from "react";
import {Icon} from "@Pimcore/components/icon/icon";
import {FileList} from "@Pimcore/components/modal/file-list/file-list";
import {ModalFooter} from "@Pimcore/components/modal/footer/modal-footer";
import {useModal} from "@Pimcore/components/modal/useModal";

const config: Meta = {
    title: 'Pimcore studio/UI/Modal',
    component: (args) => {
        const {renderModal: RenderModal, showModal, handleOk, handleCancel} = useModal({type: args.type});

        return (
            <>
                <Button onClick={showModal}>Open modal</Button>
                <RenderModal
                    title={args.title}
                    footer={args.footer}
                >
                    {args.content}
                </RenderModal>
            </>
        )
    },
    argTypes: {
        footerContent: {
            options: ['end', 'space-between'],
            control: { type: 'select' }
        },
        type: {
            options: ['error', 'success', 'info', 'warn'],
            defaultValue: 'error',
            control: { type: 'select', default: 'error'},
            description: 'Type of modal',
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
    tags: ['autodocs'],
}

export default config

const DefaultContent = () => {
    return (
        <>
            <p>The following files failed while creating their ZIPs. Pressing on See details will load additional options helping to resolve the error.</p>

            <FileList files={['all-catalogue-pictures.zip', 'all-catalogue-pictures-videos-content-materials.zip']} />
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
                key="cancel"
                danger
                onClick={handleCancel}
            >
                Cancel all ZIP actions
            </Button>
            <Button
                key="details"
                type={'primary'}
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

const SpaceBetweenFooterButtonsContent = () => {
    return (
        <>
            <p>This video format for the following file is not supported. Try converting it in MP4, MOV or AVI.</p>

            <FileList files={['all-catalogue-pictures.zip']} />
        </>
    )
}

export const SpaceBetweenFooterButtons = {
    args: {
        type: 'error',
        title: 'Media Player can’t play this file',
        content: <SpaceBetweenFooterButtonsContent />,
        footer: <ModalFooter buttonAlignment={"space-between"}>
            <Button
                key="cancel"
                type="text"
            >
                Read the technical instructions
            </Button>

            <Button
                key="details"
                type={'primary'}
            >
                See details
            </Button>
        </ModalFooter>

        //footer: <ModalFooter
        //    content={[
        //        <Button
        //            key="cancel"
        //            onClick={() => console.log('clicked "Read the technical instructions"')}
        //            type="text"
        //        >
        //            Read the technical instructions
        //        </Button>,
        //        <Button
        //            key="details"
        //            onClick={() => console.log('clicked "see details"')}
        //            type={'primary'}
        //        >
        //            See details
        //        </Button>
        //    ]}
        //    buttonAlignment={"space-between"}
        ///>
    }
}
