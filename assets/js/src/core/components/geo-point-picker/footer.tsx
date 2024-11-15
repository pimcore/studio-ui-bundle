import React from "react";
import {GeoPoint} from "@Pimcore/components/geo-map/toolbar/add-geo-point-toolbar";
import {Flex} from "@Pimcore/components/flex/flex";
import {Input, Tooltip} from "antd";
import {IconButton} from "@Pimcore/components/icon-button/icon-button";
import {useTranslation} from "react-i18next";
import {Form} from "@Pimcore/components/form/form";

export interface GeoPointPickerFooterProps {
    onChange?: (value: GeoPoint) => void
}

export const GeoPointPickerFooter = ({ ...props }: GeoPointPickerFooterProps): React.JSX.Element => {
    const { t } = useTranslation()
    const [form] = Form.useForm();

    return (
        <Flex className="w-full">

                <Input placeholder="Search..." style={{maxWidth: '200px'}}/>

                <div style={{marginLeft: 'auto'}}>
                    <Tooltip
                        key="external-image-delete"
                        title={ t('set-to-null') }
                    >
                        <IconButton
                            //disabled={ props.disabled }
                            icon={ 'delete-outlined' }
                            //onClick={ emptyValue }
                        />
                    </Tooltip>
                </div>
        </Flex>
    )
}
/*
<Form.Item
    label="Latitude"
    name="latitude"
>
    <InputNumber/>
</Form.Item>
<Form.Item
    label="Longitude"
    name="longitude"
>
    <InputNumber/>
</Form.Item>*/
