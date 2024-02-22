import {Modal as AntModal} from 'antd';
import React from "react";
import type {ModalFuncProps} from "antd/es/modal/interface";
import {useStyle} from "@Pimcore/components/modal/modal.styles";

export interface ModalProps extends ModalFuncProps {
    content: string; //TODO: do we need that -> default: React.ReactNode
    files?: string[];
    footerContent?: 'space-between'
}

export const Modal = (props: ModalProps) => {
    const { styles } = useStyle();

    const renderFileList = (files: string[] | undefined) => {
        if(files === undefined || files.length === 0) {
            return null;
        }

        return (
            <ul className={styles.filesList}>
                {files.map((file, index) => (
                    <li key={index}>{file}</li>
                ))}
            </ul>
        )
    }

    return (
        <AntModal
            title={(
                <>
                    {props.icon}
                    <span>{props.title}</span>
                </>
            )}
            className={styles.modal}
            footer={(
                <div className={'ant-modal-footer-container ' + (props.footerContent === 'space-between' ? 'space-between' : '')}>
                    {props.footer}
                </div>
            )}
            open={props.open}
            onCancel={props.onCancel}
            onOk={props.onOk}
        >
            {props.content}

            {renderFileList(props.files)}
        </AntModal>
    )
}
