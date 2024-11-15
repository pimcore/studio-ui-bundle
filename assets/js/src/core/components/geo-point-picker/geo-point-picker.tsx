import React from "react";
import {GeoMap} from "@Pimcore/components/geo-map/geo-map";
import {GeoPoint} from "@Pimcore/components/geo-map/toolbar/add-geo-point-toolbar";
import {Card} from "@Pimcore/components/card/card";
import {GeoPointPickerFooter} from "@Pimcore/components/geo-point-picker/footer";

export interface GeoPointPickerProps {
    onChange?: (value: GeoPoint) => void
}

export const GeoPointPicker = ({ ...props }: GeoPointPickerProps): React.JSX.Element => {
    return (
        <Card footer={<GeoPointPickerFooter/>}>
            <GeoMap
                mode="geoPoint"
                onChange={props.onChange}
            />
        </Card>
    )
}