import {Button, Modal as AntModal, Space} from 'antd';
import React, {useState} from "react";
import type {ModalFuncProps} from "antd/es/modal/interface";
import {useStyle} from "@Pimcore/components/modal/modal.styles";

export interface ModalProps extends ModalFuncProps {
    type: 'confirm' | 'success' | 'info'  | 'error' | 'warning';
    description: string;
    files?: string[];
    footer?: React.ReactNode[];
    open?: boolean;
}

export const Modal = (props: ModalProps) => {
    const { styles } = useStyle();
    const [isModalOpen, setIsModalOpen] = useState(props.open || false);

    function handleClose() {
        setIsModalOpen(false);
    }

    let footer = props.footer;
    if(!props.hasOwnProperty('footer')) {
        footer = [
            <Button key="details" onClick={() => console.log('clicked "see details"')}>
                See details
            </Button>
        ]
    }

    return (
        <AntModal
            title="Basic Modal"
            open={isModalOpen}
            onOk={handleClose}
            onCancel={handleClose}
            className={styles.modal}
            footer={footer}
        >
            <p>{props.description}</p>
            <ul className={styles.filesList}>
                {props.files?.map((file, index) => (
                    <li key={index}>{file}</li>
                ))}
            </ul>
        </AntModal>
    )
}
