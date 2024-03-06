import React from "react";
import {useStyle} from "@Pimcore/components/modal/footer/modal-footer.styles";

interface IModalFooterProps {
    children?: React.ReactNode
    buttonAlignment?: 'space-between' | 'end'
}

export const ModalFooter = (props: IModalFooterProps): React.JSX.Element => {
    const { styles } = useStyle();
    const {children, ...inlineProps} = props;

    return (
        <div
            className={`ant-modal-footer-container ${props.buttonAlignment} ${styles.footer}`}
            {...inlineProps}
        >
            {children}
        </div>
    )
}
