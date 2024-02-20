import { Modal as AntModal, Space } from 'antd';
import React, {useState} from "react";
import type {ModalFuncProps} from "antd/es/modal/interface";
import {useStyle} from "@Pimcore/components/modal/modal.styles";

export interface ModalProps extends ModalFuncProps {
    type: 'confirm' | 'success' | 'info'  | 'error' | 'warning';
    description: string;
    files?: string[];
}

export const Modal = (props: ModalProps) => {
    const { styles } = useStyle();
    const [isModalOpen, setIsModalOpen] = useState(true);

    function handleClose() {
        setIsModalOpen(false);
    }

    return (
        <AntModal
            title="Basic Modal"
            open={isModalOpen}
            onOk={handleClose}
            onCancel={handleClose}
            className={styles.modal}
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
