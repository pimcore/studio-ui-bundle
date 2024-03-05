import React, {useState} from "react";
import {Modal} from "@Pimcore/components/modal/modal";
import {Icon} from "@Pimcore/components/icon/icon";

export const useModal = (config = {type: "default"}) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    function getModalComponent(type: string) {
        let component = Modal;

        switch(type) {
            case "error":
                component = withError(Modal);
                break;
            case "success":
                component = withSuccess(Modal);
                break;
            case "info":
                component = withInfo(Modal);
                break;
            case "warn":
                component = withWarn(Modal);
                break;
        }

        return component;
    }

    function renderModal(props) {
        const { children, ...inlineProps } = props;
        const ModalComponent = getModalComponent(config.type);

        return (
            <ModalComponent
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                {...inlineProps}
            >
                {children}
            </ModalComponent>
        );
    }

    return { renderModal, showModal, handleOk, handleCancel };
}

export const withError = (Component) => {
    return (props) => {
        const { children, ...inlineProps } = props;

        return (
            <Component
                title={"Error"}
                icon={<Icon name={'close-circle-filled'} options={{width: 24, height: 24}} />}
                {...inlineProps}
            >
                {children}
            </Component>
        );
    };
};

export const withSuccess = (Component) => {
    return (props) => {
        const { children, ...inlineProps } = props;

        return (
            <Component
                title={"Success"}
                icon={<Icon name={'check-circle-filled'} options={{width: 24, height: 24}}/>}
                {...inlineProps}
            >
                {children}
            </Component>
        );
    };
};

export const withInfo = (Component) => {
    return (props) => {
        const { children, ...inlineProps } = props;

        return (
            <Component
                title={"Info"}
                icon={<Icon name={'info-circle-filled'} options={{width: 24, height: 24}}/>}
                {...inlineProps}
            >
                {children}
            </Component>
        );
    };
};

export const withWarn = (Component) => {
    return (props) => {
        const { children, ...inlineProps } = props;

        return (
            <Component
                title="Warn"
                {...inlineProps}
            >
                {children}
            </Component>
        );
    };
};
