import {Button, Input, Space} from "antd";
import React from "react";
import {Icon} from "@Pimcore/components/icon/icon";
import {useStyle} from "@Pimcore/components/image-zoom/image-zoom.styles";

interface IImageZoom {
    initialZoom: number;
}

export const ImageZoom = ({initialZoom = 100}: IImageZoom) => {
    const {styles} = useStyle();

    return (
        <Space.Compact className={styles.imageZoom}>
            <Button>
                <Icon name={'MinusOutlined'} />
            </Button>
            <Input defaultValue="100%" />
            <Button>
                <Icon name={'PlusOutlined'} />
            </Button>
        </Space.Compact>
    )
}
