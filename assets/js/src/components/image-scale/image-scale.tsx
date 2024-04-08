import type {RadioChangeEvent} from 'antd';
import {Radio} from 'antd';
import React, {useState} from "react"
import {Icon} from "@Pimcore/components/icon/icon";
import {useStyle} from "@Pimcore/components/image-scale/image-scale.styles";

export const ImageScale = () => {
    const {styles} = useStyle();
    const [value, setValue] = useState('scale-by-width')
    const options = [
        {
            label: <Icon name={'spacing-width-01'} />,
            value: 'scale-by-width'
        },
        {
            label: <Icon name={'spacing-width-01'} />,
            value: 'scale-to-max'
        }
    ]

    const onChange = ({ target: { value } }: RadioChangeEvent) => {
        console.log('radio checked', value);
        setValue(value);
    }

    return (
        <Radio.Group
            options={options}
            onChange={onChange}
            value={value}
            optionType="button"
            className={styles.imageScale}
        />
    )
}
